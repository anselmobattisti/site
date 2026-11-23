// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import paginasMarkdown from './integracoes/paginas-markdown.mjs';
import idsTitulos from './integracoes/ids-titulos.mjs';
import { readFileSync, readdirSync, existsSync } from 'node:fs';

// Endereços antigos → novos: o 301 de verdade é feito no nginx (nginx-ploi.conf, com a mesma lista). O site em 11ty
// já usava os mesmos endereços, então a lista está vazia. Grupos que começam com "_" são comentários.
const redirecionamentos = Object.assign(
  {},
  ...Object.entries(JSON.parse(readFileSync('redirecionamentos.json', 'utf8')))
    .filter(([grupo]) => !grupo.startsWith('_'))
    .map(([, regras]) => regras),
);

// Blocos de código do Markdown, como o site em 11ty gerava:
//  - ```mermaid vira <pre class="mermaid diagram"> com o texto do diagrama (desenhado no navegador, Mermaid.astro);
//  - os demais (o BibTeX de cada publicação) ganham a classe language-* também no <pre>, que é onde o CSS a procura.
// Sem coloração de sintaxe: não existe gramática de BibTeX, e o bloco é só texto bem composto.
function blocosDeCodigo() {
  const visitar = (no) => {
    for (const filho of no.children ?? []) {
      const codigo = filho.tagName === 'pre' && filho.children?.find((c) => c.tagName === 'code');
      const linguagem = codigo && (codigo.properties?.className ?? []).find((c) => String(c).startsWith('language-'));
      if (linguagem === 'language-mermaid') {
        filho.properties = { className: ['mermaid', 'diagram'] };
        filho.children = codigo.children;
      } else if (linguagem) {
        filho.properties = { ...filho.properties, className: [linguagem] };
      } else visitar(filho);
    }
  };
  return visitar;
}

// Data de cada post do blog, para o <lastmod> do sitemap: a de atualização ou, sem ela, a de publicação. Lida direto
// dos .md, porque este arquivo não tem acesso às coleções. As outras páginas ficam sem <lastmod>: o site não guarda a
// data de atualização delas, e a data do build faria o Google desconfiar do campo.
const pastaBlog = 'src/content/blog';
const datasDoBlog = Object.fromEntries(
  (existsSync(pastaBlog) ? readdirSync(pastaBlog) : [])
    .filter((arquivo) => arquivo.endsWith('.md'))
    .map((arquivo) => {
      const cabecalho = readFileSync(`${pastaBlog}/${arquivo}`, 'utf8').split(/^---\s*$/m)[1] ?? '';
      const campo = (nome) => cabecalho.match(new RegExp(`^${nome}:\\s*["']?(\\d{4}-\\d{2}-\\d{2})`, 'm'))?.[1];
      return [`/blog/${arquivo.slice(0, -3)}/`, campo('atualizado') ?? campo('data')];
    }),
);

export default defineConfig({
  site: 'https://battisti.com.br',
  trailingSlash: 'always',
  // Site 100% estático: o servidor (Ploi) não roda Node.
  integrations: [
    // id em cada título do <main> (para links diretos a uma seção), como o IdAttributePlugin do 11ty fazia.
    idsTitulos(),
    // Versão .md de cada página para agentes de IA (/work/ → /work.md), gerada no fim do build.
    paginasMarkdown(),
    // Fora do sitemap: só a 404. Regra: toda página com noindex fica fora do sitemap, e vice-versa.
    // <lastmod> só nos posts do blog (ver datasDoBlog).
    sitemap({
      filter: (pagina) => new URL(pagina).pathname !== '/404/',
      serialize(item) {
        const data = datasDoBlog[new URL(item.url).pathname];
        return data ? { ...item, lastmod: new Date(data).toISOString() } : item;
      },
    }),
  ],
  redirects: redirecionamentos,
  // smartypants desligado: o texto sai como foi escrito (o site antigo não trocava aspas nem travessões).
  markdown: { syntaxHighlight: false, smartypants: false, rehypePlugins: [blocosDeCodigo] },
  // CSS pequeno: embutir no HTML elimina a requisição que bloqueia a renderização.
  build: { inlineStylesheets: 'always' },
  // O Mermaid só é importado nas páginas com diagrama: sem isto, o Vite o descobre no meio do `npm run dev`, responde
  // 504 (Outdated Optimize Dep) e o diagrama não é desenhado. Aqui ele é preparado ao subir o servidor.
  vite: { optimizeDeps: { include: ['mermaid'] } },
});
