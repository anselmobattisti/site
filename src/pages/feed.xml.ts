// /feed.xml (Atom): as 20 novidades mais recentes do site (publicações, palestras, disciplinas e projetos), no
// mesmo endereço do feed do site antigo, para quem já assina. Escrito à mão: é só título, link, data e resumo.
import type { APIRoute } from 'astro';
import { autor } from '../data/autor';
import { itens, url as caminho } from '../data/colecoes';

const escapar = (texto: string) => texto.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const GET: APIRoute = async () => {
  const [publicacoes, palestras, disciplinas, projetos] = await Promise.all([
    itens('publication'), itens('talks'), itens('teaching'), itens('projects'),
  ]);
  const novidades = [
    ...publicacoes.map((p) => ({ colecao: 'publication' as const, id: p.id, titulo: p.data.titulo, data: p.data.data, resumo: p.data.resumo })),
    ...palestras.map((p) => ({ colecao: 'talks' as const, id: p.id, titulo: p.data.titulo, data: p.data.data, resumo: p.data.resumo ?? '' })),
    ...disciplinas.map((d) => ({ colecao: 'teaching' as const, id: d.id, titulo: `${d.data.titulo} (${d.data.semestre})`, data: d.data.data, resumo: d.body?.trim() ?? '' })),
    ...projetos.map((p) => ({ colecao: 'projects' as const, id: p.id, titulo: p.data.titulo, data: p.data.data, resumo: p.data.resumo ?? p.data.chamada ?? '' })),
  ]
    .sort((a, b) => b.data.getTime() - a.data.getTime() || a.id.localeCompare(b.id))
    .slice(0, 20);

  const base = `${autor.url}/`;
  const xml = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="en">
  <title>${escapar(autor.nome)}</title>
  <subtitle>Publications, talks and research projects.</subtitle>
  <link href="${base}feed.xml" rel="self" />
  <link href="${base}" />
  <updated>${novidades[0].data.toISOString()}</updated>
  <id>${base}</id>
  <author>
    <name>${escapar(autor.nome)}</name>
    <email>${autor.email}</email>
  </author>
${novidades.map((n) => {
    const link = `${autor.url}${caminho(n.colecao, n.id)}`;
    return `  <entry>
    <title>${escapar(n.titulo)}</title>
    <link href="${link}" />
    <updated>${n.data.toISOString()}</updated>
    <id>${link}</id>
    <summary>${escapar(n.resumo.replace(/\s+/g, ' '))}</summary>
  </entry>`;
  }).join('\n')}
</feed>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/atom+xml; charset=utf-8' } });
};
