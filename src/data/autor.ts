// Dados do dono do site: a única fonte para nome, cargo, e-mail, endereço e perfis. Nenhuma página repete esses
// valores à mão. Vieram do site antigo (_data/metadata.js e contact.md).
export const autor = {
  nome: 'Anselmo Luiz Éden Battisti',
  nomeCurto: 'Anselmo Battisti',
  url: 'https://battisti.com.br',
  email: 'anselmo@battisti.com.br',
  descricao:
    'Professor at IMPA Tech and Ph.D. in Computer Science (UFF). Research on SFC placement across the edge–cloud continuum, virtual network functions, 5G and the Internet of Media Things.',
  cargo: 'Professor, IMPA Tech',
  titulacao: 'Ph.D. in Computer Science, UFF',
  cidade: 'Rio de Janeiro, Brazil',
  // Onde trabalha (página de contato e schema).
  instituicao: {
    nome: 'IMPA Tech',
    url: 'https://impatech.edu.br/',
    rua: 'Av. Prof. Pereira Reis, 76 - Santo Cristo',
    cidade: 'Rio de Janeiro',
    uf: 'RJ',
    cep: '20220-800',
  },
  perfis: {
    lattes: 'https://lattes.cnpq.br/6937214674204474',
    scholar: 'https://scholar.google.com/citations?user=vqylNDgAAAAJ&hl=pt-BR',
    github: 'https://github.com/anselmobattisti',
    youtube: 'https://www.youtube.com/@AnselmoBattisti',
    patentes: 'https://patents.google.com/?inventor=anselmo+battisti',
    webgenium: 'https://webgenium.com.br/',
  },
  tese: 'https://github.com/anselmobattisti/publications/blob/main/docs/2025/Tese/tese.pdf',
  // Google Analytics 4: carregado só com o consentimento do aviso de cookies. Vazio = sem Analytics e sem aviso.
  googleAnalytics: 'G-V2Z5QQ6Q24',
} as const;

// Menu principal, na ordem do site antigo. filhos: submenu, sempre aberto embaixo do item.
export interface ItemMenu {
  href: string;
  nome: string;
  filhos?: { href: string; nome: string }[];
}

export const menu: ItemMenu[] = [
  { href: '/', nome: 'About' },
  { href: '/work/', nome: 'Work' },
  {
    href: '/research/',
    nome: 'Research',
    filhos: [
      { href: '/publication/', nome: 'Publications' },
      { href: '/projects/', nome: 'Projects' },
      { href: '/patents/', nome: 'Patents' },
      { href: '/awards/', nome: 'Awards' },
    ],
  },
  { href: '/teaching/', nome: 'Teaching' },
  { href: '/talks/', nome: 'Talks' },
  { href: '/background/', nome: 'Background' },
  { href: '/extra/', nome: 'Extra' },
  { href: '/contact/', nome: 'Contact' },
];
