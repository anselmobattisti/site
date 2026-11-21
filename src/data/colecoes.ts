// Leitura e ordenação das coleções (publicações, disciplinas, palestras, projetos e extras), num lugar só: as listas,
// as páginas de cada item, o llms.txt e o feed usam as mesmas funções.
import { getCollection, type CollectionEntry } from 'astro:content';
import { readdirSync, statSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';

export type Colecao = 'publication' | 'teaching' | 'talks' | 'projects' | 'extra';

// Da mais antiga para a mais nova (com o nome do arquivo como desempate), que é a ordem de "Earlier" / "Later".
export async function itens<C extends Colecao>(colecao: C): Promise<CollectionEntry<C>[]> {
  const lista = await getCollection(colecao);
  return lista.sort((a, b) => a.data.data.getTime() - b.data.data.getTime() || a.id.localeCompare(b.id));
}

// Mais novas primeiro: a ordem de todas as listas do site.
export const recentes = async <C extends Colecao>(colecao: C) => (await itens(colecao)).reverse();

export const url = (colecao: Colecao, id: string) => `/${colecao}/${id}/`;

// Rótulo do tipo de publicação, como aparece ao lado do veículo.
export const tiposPublicacao = { periodico: 'Journal', conferencia: 'Conference', livro: 'Book' } as const;

// As datas do conteúdo não têm hora (viram meia-noite em UTC): formatar em UTC para o dia não voltar um.
const parte = (d: Date, opcoes: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', ...opcoes }).format(d);
// "16 September 2026"
export const dataPorExtenso = (d: Date) => `${parte(d, { day: '2-digit' })} ${parte(d, { month: 'long' })} ${parte(d, { year: 'numeric' })}`;
// "16 Sep 2026"
export const dataCurta = (d: Date) => `${parte(d, { day: '2-digit' })} ${parte(d, { month: 'short' })} ${parte(d, { year: 'numeric' })}`;
export const dataIso = (d: Date) => d.toISOString().slice(0, 10);
export const ano = (d: Date) => String(d.getUTCFullYear());

// Texto cortado numa palavra inteira, para a descrição da página (o Google mostra uns 160 caracteres).
export function resumir(texto: string, limite = 158) {
  const limpo = texto.replace(/\s+/g, ' ').trim();
  if (limpo.length <= limite) return limpo;
  return `${limpo.slice(0, limite).replace(/\s+\S*$/, '').replace(/[,;:.–—-]+$/, '')}…`;
}

// O dono do site em negrito na lista de autores, para dar para achar a posição dele em cada artigo.
export const autoresComDestaque = (autores: string) =>
  autores
    .split(',')
    .map((nome) => nome.trim())
    .map((nome) => (nome.includes('Battisti') ? `<span class="me">${nome}</span>` : nome))
    .join(', ');

// Disciplinas agrupadas por semestre, o mais recente primeiro. "2026.2" é separado em ano e período e comparado
// como número: como texto, "2026.10" viria antes de "2026.2".
export function porSemestre(disciplinas: CollectionEntry<'teaching'>[]) {
  const partes = (semestre: string) => semestre.split('.').map((n) => Number(n) || 0);
  const grupos = new Map<string, CollectionEntry<'teaching'>[]>();
  for (const d of disciplinas) grupos.set(d.data.semestre, [...(grupos.get(d.data.semestre) ?? []), d]);
  return [...grupos.entries()]
    .map(([semestre, lista]) => ({ semestre, lista: lista.sort((a, b) => a.data.titulo.localeCompare(b.data.titulo, 'pt-BR')) }))
    .sort((a, b) => {
      const [anoA, periodoA = 0] = partes(a.semestre);
      const [anoB, periodoB = 0] = partes(b.semestre);
      return anoB - anoA || periodoB - periodoA;
    });
}

const tamanho = (bytes: number) =>
  bytes < 1024 ? `${bytes} B` : bytes < 1024 * 1024 ? `${Math.round(bytes / 1024)} KB` : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

// Documentos de uma palestra: tudo o que estiver em public/talks/<arquivo da palestra>/ entra na página dela, sem
// declarar nada. O campo "documentos" do .md só dá um título melhor do que o nome do arquivo. Ordenados pelo
// título que a pessoa vê.
export function documentosDaPalestra(palestra: CollectionEntry<'talks'>) {
  const pasta = join('public/talks', palestra.id);
  if (!existsSync(pasta)) return [];
  return readdirSync(pasta, { withFileTypes: true })
    .filter((arquivo) => arquivo.isFile() && !arquivo.name.startsWith('.'))
    .map((arquivo) => ({
      nome: palestra.data.documentos[arquivo.name] ?? arquivo.name,
      href: `/talks/${palestra.id}/${arquivo.name}`,
      extensao: extname(arquivo.name).slice(1).toUpperCase(),
      tamanho: tamanho(statSync(join(pasta, arquivo.name)).size),
    }))
    .sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR', { numeric: true, sensitivity: 'base' }));
}

// Endereço como a pessoa escreveria: sem "https://" e sem a barra final.
export const urlCurta = (endereco: string) => endereco.replace(/^https?:\/\//, '').replace(/\/$/, '');
