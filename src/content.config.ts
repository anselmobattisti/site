import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Uma pasta por seção do site, um arquivo .md por item. O nome do arquivo é o endereço (/publication/<arquivo>/).
// O build falha se faltar um campo obrigatório. Depois de mudar um esquema: rm -f .astro/data-store.json.
// Os textos ficam no idioma em que foram escritos (o site é em inglês; títulos e ementas em português levam o
// idioma num campo próprio, que vira o atributo lang na página).
const pasta = (nome: string) => glob({ pattern: '*.md', base: `src/content/${nome}` });

// Publicações: artigos de periódico e de conferência e livros.
const publication = defineCollection({
  loader: pasta('publication'),
  schema: ({ image }) =>
    z.object({
      titulo: z.string(),
      idiomaTitulo: z.string().optional(),
      // Lista separada por vírgulas, como aparece no artigo.
      autores: z.string(),
      ano: z.number(),
      // Ordena as listas (mais recente primeiro).
      data: z.coerce.date(),
      // Aparece em "Selected publications" na home.
      destaque: z.boolean().default(false),
      tipo: z.enum(['periodico', 'conferencia', 'livro']),
      // Periódico, conferência ou editora.
      veiculo: z.string(),
      doi: z.string().optional(),
      linkPdf: z.string().url().optional(),
      linkSlides: z.string().url().optional(),
      linkVideo: z.string().url().optional(),
      resumo: z.string(),
      idiomaResumo: z.string().optional(),
      // Só nos livros.
      edicao: z.string().optional(),
      paginas: z.number().optional(),
      isbn: z.string().optional(),
      capa: image().optional(),
      capaAlt: z.string().optional(),
    }),
});

// Disciplinas: uma por oferta, com a ementa (o texto) e a bibliografia daquele semestre.
const teaching = defineCollection({
  loader: pasta('teaching'),
  schema: z.object({
    titulo: z.string(),
    idiomaTitulo: z.string().optional(),
    // "2026" ou "2026.2".
    semestre: z.string(),
    data: z.coerce.date(),
    instituicao: z.string(),
    curso: z.string(),
    nivel: z.string(),
    horas: z.number(),
    idioma: z.string().optional(),
    chamada: z.string().optional(),
    bibliografia: z.array(z.string()).default([]),
    bibliografiaComplementar: z.array(z.string()).default([]),
    // Pasta dos slides, dentro de public/ (ex.: "teaching/2026-02/desenvolvimento-de-software").
    pastaAulas: z.string().optional(),
    // Uma linha por aula da tabela "Lectures". "arquivo" é o PDF dentro de pastaAulas; sem ele, a linha sai sem botão.
    aulas: z
      .array(
        z.object({
          numero: z.number(),
          data: z.coerce.date(),
          titulo: z.string(),
          descricao: z.string(),
          arquivo: z.string().optional(),
        }),
      )
      .default([]),
  }),
});

// Palestras. Os documentos de cada uma ficam em public/talks/<arquivo>/ (ver src/data/colecoes.ts).
const talks = defineCollection({
  loader: pasta('talks'),
  schema: z.object({
    titulo: z.string(),
    data: z.coerce.date(),
    local: z.string().optional(),
    idioma: z.string().optional(),
    linkSlides: z.string().url().optional(),
    linkVideo: z.string().url().optional(),
    // Título de cada documento, pelo nome do arquivo. Sem título, aparece o nome do arquivo.
    documentos: z.record(z.string(), z.string()).default({}),
    resumo: z.string().optional(),
  }),
});

// Campos comuns aos projetos de pesquisa e aos projetos paralelos (Extra).
const projeto = {
  titulo: z.string(),
  data: z.coerce.date(),
  periodo: z.string().optional(),
  situacao: z.string().optional(),
  chamada: z.string().optional(),
  linkSite: z.string().url().optional(),
  linkCodigo: z.string().url().optional(),
  resumo: z.string().optional(),
};

const projects = defineCollection({
  loader: pasta('projects'),
  schema: z.object({
    ...projeto,
    // A página tem um diagrama em Mermaid: carrega a biblioteca (só nessas páginas).
    mermaid: z.boolean().default(false),
    papel: z.string().optional(),
    instituicao: z.string().optional(),
    financiamento: z.string().optional(),
    // Aparece em "Source" enquanto o repositório não é público.
    notaCodigo: z.string().optional(),
    alunos: z.array(z.string()).default([]),
    notaAlunos: z.string().optional(),
  }),
});

const extra = defineCollection({
  loader: pasta('extra'),
  schema: z.object({
    ...projeto,
    mermaid: z.boolean().default(false),
    plataforma: z.string().optional(),
    feitoCom: z.string().optional(),
    feitoJunto: z.string().optional(),
  }),
});

// Blog: um .md por post. O texto fica no idioma em que foi escrito ("idioma" vira o atributo lang da página).
const blog = defineCollection({
  loader: pasta('blog'),
  schema: z.object({
    titulo: z.string(),
    // Uma ou duas frases: aparece na lista, embaixo do título do post, na descrição da página e no feed.
    resumo: z.string(),
    data: z.coerce.date(),
    // Só quando o post for revisado de verdade: aparece na página e vira o lastmod do sitemap.
    atualizado: z.coerce.date().optional(),
    idioma: z.string().optional(),
    tags: z.array(z.string()).default([]),
    mermaid: z.boolean().default(false),
    // Rascunho: aparece no npm run dev, mas não vira página no build (nem entra no feed, no sitemap e no llms.txt).
    rascunho: z.boolean().default(false),
  }),
});

export const collections = { publication, teaching, talks, projects, extra, blog };
