// Dá um id a cada título (h2 a h4) do <main> que ainda não tem, para dar para apontar um link direto para a seção
// (/patents/#…). O site em 11ty fazia o mesmo com o IdAttributePlugin, e o componente <heading-anchors> (Base.astro)
// só mostra o "#" ao lado dos títulos que têm id. Os títulos do Markdown já chegam com id (o Astro põe).
// Roda no fim do build, antes da integração das páginas em Markdown.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const slug = (texto) =>
  texto
    .replace(/<[^>]+>/g, '')
    .replace(/&[a-z#0-9]+;/gi, ' ')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

async function* paginas(pasta) {
  for (const item of await readdir(pasta, { withFileTypes: true })) {
    const caminho = join(pasta, item.name);
    if (item.isDirectory()) yield* paginas(caminho);
    else if (item.name.endsWith('.html')) yield caminho;
  }
}

export default function idsTitulos() {
  return {
    name: 'ids-titulos',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        for await (const arquivo of paginas(fileURLToPath(dir))) {
          const html = await readFile(arquivo, 'utf8');
          const partes = html.match(/^([\s\S]*<main\b[^>]*>)([\s\S]*)(<\/main>[\s\S]*)$/);
          if (!partes) continue;
          const usados = new Set([...partes[2].matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
          const main = partes[2].replace(/<(h[2-4])((?:\s[^>]*)?)>([\s\S]*?)<\/\1>/g, (tudo, tag, atributos, conteudo) => {
            if (/\sid=/.test(atributos)) return tudo;
            const base = slug(conteudo);
            if (!base) return tudo;
            // Título repetido na página (ex.: dois anos iguais): -2, -3…
            let id = base;
            for (let n = 2; usados.has(id); n++) id = `${base}-${n}`;
            usados.add(id);
            return `<${tag} id="${id}"${atributos}>${conteudo}</${tag}>`;
          });
          if (main !== partes[2]) await writeFile(arquivo, partes[1] + main + partes[3]);
        }
      },
    },
  };
}
