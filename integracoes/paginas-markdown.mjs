// Mesma integração dos sites da Webgenium e da Guaçu Tur (com a .erro-numero e o .visually-hidden deste site).
// Versão em Markdown de cada página, para agentes e ferramentas de inteligência artificial lerem o conteúdo sem o
// HTML em volta (menu, rodapé, scripts). Roda no fim do build: para cada dist/<caminho>/index.html, grava
// dist/<caminho>.md (a home vira /index.md) com o conteúdo do <main>, e acrescenta na página o
// <link rel="alternate" type="text/markdown"> apontando para ele. O /llms.txt avisa que essas versões existem.
// Ficam de fora as páginas com noindex (404, obrigado) e as que não têm <main> (redirecionamentos em HTML).
// No nginx, o .md é servido como text/markdown (nginx-ploi.conf).
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import TurndownService from 'turndown';
import { tables } from 'turndown-plugin-gfm';

const turndown = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced', bulletListMarker: '-' });
turndown.use(tables);
// Listas compactas ("- item" e "1. item"), em vez do recuo de 4 colunas padrão do Turndown.
turndown.addRule('itemDeLista', {
  filter: 'li',
  replacement: (conteudo, no, opcoes) => {
    const pai = no.parentNode;
    let posicao = 0;
    for (let irmao = no.previousSibling; irmao; irmao = irmao.previousSibling) if (irmao.nodeName === 'LI') posicao++;
    const marcador = pai.nodeName === 'OL' ? `${Number(pai.getAttribute('start') ?? 1) + posicao}. ` : `${opcoes.bulletListMarker} `;
    const texto = conteudo.replace(/^\n+/, '').replace(/\n+$/, '\n').replace(/\n/gm, `\n${' '.repeat(marcador.length)}`);
    return marcador + texto + (no.nextSibling && !/\n$/.test(texto) ? '\n' : '');
  },
});
// Nada de interação ou decoração: scripts, ícones, formulários e o que está escondido de leitores de tela.
// dialog: visores de fotos (vazios no HTML; as fotos já estão nas miniaturas).
turndown.remove(['script', 'style', 'noscript', 'svg', 'form', 'button', 'template', 'iframe', 'dialog']);
turndown.remove(
  (no) =>
    // data-fora-do-md: blocos que só fazem sentido na tela (ex.: botões de compartilhar, que são links só com ícone).
    no.hasAttribute?.('data-fora-do-md') ||
    no.hasAttribute?.('hidden') ||
    no.getAttribute?.('aria-hidden') === 'true' ||
    // "(abre em nova aba)": aviso só para leitores de tela.
    (no.classList?.contains('visually-hidden')) ||
    // Versão curta de um texto que só aparece no celular: a longa já está no Markdown.
    /__curto\b/.test(no.getAttribute?.('class') ?? ''),
);
// Imagens decorativas (alt vazio). Precisa ser uma regra: a regra padrão de
// imagens tem prioridade sobre o remove().
turndown.addRule('imagemDecorativa', { filter: (no) => no.nodeName === 'IMG' && !no.getAttribute('alt'), replacement: () => '' });

const decodificar = (texto) =>
  texto
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');

async function* paginas(pasta) {
  for (const item of await readdir(pasta, { withFileTypes: true })) {
    const caminho = join(pasta, item.name);
    if (item.isDirectory()) yield* paginas(caminho);
    else if (item.name === 'index.html') yield caminho;
  }
}

export default function paginasMarkdown() {
  let site;
  return {
    name: 'paginas-markdown',
    hooks: {
      'astro:config:done': ({ config }) => { site = config.site.replace(/\/$/, ''); },
      'astro:build:done': async ({ dir, logger }) => {
        const raiz = fileURLToPath(dir);
        let total = 0;
        for await (const arquivo of paginas(raiz)) {
          const html = await readFile(arquivo, 'utf8');
          const main = html.match(/<main\b[^>]*>([\s\S]*)<\/main>/)?.[1];
          if (!main || /<meta name="robots" content="[^"]*noindex/.test(html)) continue;

          // dist/servicos/index.html → /servicos/ (página) e /servicos.md; dist/index.html → / e /index.md.
          const pasta = relative(raiz, arquivo).split(sep).slice(0, -1).join('/');
          const pagina = pasta ? `/${pasta}/` : '/';
          const md = pasta ? `/${pasta}.md` : '/index.md';

          const titulo = decodificar(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '');
          const descricao = decodificar(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '');
          // Links e imagens com o endereço completo: o arquivo .md costuma ser lido fora do site.
          const corpo = turndown
            // Elementos lado a lado sem espaço no HTML (ex.: "<strong>30 anos</strong><span>de estrada</span>" e dois botões seguidos).
            .turndown(main.replace(/(<\/(?:strong|b|em|span|small|time|a)>)(?=<(?:strong|b|em|span|small|time|a)\b)/g, '$1 '))
            .replace(/(\S) +\*\*( |$)/gm, '$1**$2')
            .replace(/\]\((\/[^)\s]*)/g, `](${site}$1`)
            .replace(/[ \t]+$/gm, '')
            .replace(/\n{3,}/g, '\n\n')
            .trim();
          const cabecalho = [
            '---',
            `titulo: ${JSON.stringify(titulo)}`,
            `descricao: ${JSON.stringify(descricao)}`,
            `url: ${site}${pagina}`,
            '---',
          ].join('\n');
          await writeFile(join(raiz, `${md.slice(1)}`), `${cabecalho}\n\n${corpo}\n`);

          const link = `<link rel="alternate" type="text/markdown" href="${md}">`;
          await writeFile(arquivo, html.replace('</head>', `${link}</head>`));
          total++;
        }
        logger.info(`${total} páginas em Markdown`);
      },
    },
  };
}
