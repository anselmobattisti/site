// /llms.txt: resumo do site em Markdown para ferramentas de inteligência artificial (padrão llmstxt.org).
// Montado com os mesmos dados das páginas (autor.ts e as coleções), nunca à mão. Coleção nova? Ganha uma seção aqui.
import type { APIRoute } from 'astro';
import { autor } from '../data/autor';
import { recentes, url as caminho, tiposPublicacao, dataPorExtenso, resumir } from '../data/colecoes';

const url = (endereco: string) => `${autor.url}${endereco}`;

export const GET: APIRoute = async () => {
  const [publicacoes, projetos, palestras, disciplinas, extras, posts] = await Promise.all([
    recentes('publication'), recentes('projects'), recentes('talks'), recentes('teaching'), recentes('extra'), recentes('blog'),
  ]);
  // A seção do blog só existe quando há post publicado.
  const blog = posts.length === 0 ? '' : `## Blog

${posts.map((p) => `- [${p.data.titulo}](${url(caminho('blog', p.id))}): ${resumir(p.data.resumo, 140)} (${dataPorExtenso(p.data.data)})`).join('\n')}
- [All posts](${url('/blog/')})

`;
  const { instituicao, perfis } = autor;
  const texto = `# ${autor.nome}

> ${autor.descricao} Co-founder of Webgenium (2007). This is his personal and academic website: publications, patents, projects, talks and every course taught since 2012.

- Name: ${autor.nome}
- Position: ${autor.cargo}
- Degree: ${autor.titulacao}
- Location: ${autor.cidade}
- Work address: ${instituicao.nome}, ${instituicao.rua}, ${instituicao.cidade} - ${instituicao.uf}, ${instituicao.cep}, Brazil
- Email: ${autor.email}
- Curriculum Lattes: ${perfis.lattes}
- Google Scholar: ${perfis.scholar}
- GitHub: ${perfis.github}
- YouTube: ${perfis.youtube}
- Google Patents: ${perfis.patentes}
- PhD thesis (PDF): ${autor.tese}

Every page of the site has a Markdown version with the content only: replace the trailing slash of the address with \`.md\`
(${url('/publication/')} → ${url('/publication.md')}; the home page is ${url('/index.md')}).

## Publications

${publicacoes.map((p) => `- [${p.data.titulo}](${url(caminho('publication', p.id))}): ${tiposPublicacao[p.data.tipo]}, ${p.data.veiculo}, ${p.data.ano}. ${p.data.autores}.${p.data.doi ? ` DOI ${p.data.doi}.` : ''}`).join('\n')}
- [All publications](${url('/publication/')})

## Research

- [Research](${url('/research/')}): overview of the research on placing, migrating and scaling virtualized network functions between the edge and the cloud.
${projetos.map((p) => `- [${p.data.titulo}](${url(caminho('projects', p.id))}): ${p.data.chamada ?? resumir(p.data.resumo ?? '', 140)}${p.data.periodo ? ` (${p.data.periodo})` : ''}`).join('\n')}
- [Projects](${url('/projects/')}): research projects, newest first.
- [Patents](${url('/patents/')}): US patent filings, with numbers, dates, assignees and inventors.
- [Awards & Honors](${url('/awards/')}): academic and professional recognition.

## Talks

${palestras.map((p) => `- [${p.data.titulo}](${url(caminho('talks', p.id))}): ${[p.data.local, dataPorExtenso(p.data.data)].filter(Boolean).join(', ')}.`).join('\n')}
- [All talks](${url('/talks/')})

${blog}## Teaching

${disciplinas.map((d) => `- [${d.data.titulo} (${d.data.semestre})](${url(caminho('teaching', d.id))}): ${d.data.instituicao}, ${d.data.curso}, ${d.data.horas} h.`).join('\n')}
- [All courses, by semester](${url('/teaching/')})

## About

- [About](${url('/')}): who he is, research summary, selected publications and current positions.
- [Work experience](${url('/work/')}): professional history since 2007.
- [Academic background](${url('/background/')}): degrees, theses and advisors, with the PDFs.
- [Contact](${url('/contact/')}): email, address and profiles.

## Optional

${extras.map((p) => `- [${p.data.titulo}](${url(caminho('extra', p.id))}): ${p.data.chamada ?? resumir(p.data.resumo ?? '', 140)}`).join('\n')}
- [Extra](${url('/extra/')}): side projects outside research and teaching.
- [Privacy Policy](${url('/privacy-policy/')}): data processed by the site, purposes, sharing and rights under the LGPD.
- [Cookie Policy](${url('/cookie-policy/')}): cookies used by the site and how to accept or decline them.
`;

  return new Response(texto.replace(/\n{3,}/g, '\n\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
