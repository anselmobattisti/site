# Guia do site Anselmo Battisti (modelo da Webgenium)

Site criado pelo `criar-site.sh` (`/mnt/windows/versionado/modelo_site/`), a partir do modelo que junta o que
funcionou nos sites da Webgenium (`github.com/webgenium/site`) e da Guaçu Tur (`github.com/webgenium/site_guacutur`).
O Claude Code lê este arquivo sozinho no início de cada conversa.

## Como usar este guia

1. **Preencha a seção "Sobre o projeto novo"** logo abaixo: cliente, domínio, hospedagem, site antigo, serviços e
   marca. Quanto mais completa, menos perguntas o Claude faz.
2. **Procure os `PENDENTE`** (`grep -rn PENDENTE src public nginx-ploi.conf`): são os dados do cliente que o modelo
   deixou em branco (empresa, setores, serviços, cores, textos da home, logo, imagem de compartilhamento).
3. **Peça uma etapa por vez**, na ordem que fizer sentido: dados e marca → home e páginas de serviço → conteúdo
   próprio do cliente (coleções, painel) → redirecionamentos 301 do site antigo → nginx → performance e PageSpeed.
   O "Checklist do site" logo abaixo junta tudo; cada seção do guia detalha a etapa correspondente. O que o modelo
   já traz pronto está marcado com "(modelo)".
4. **Mantenha o guia vivo:** quando aparecer uma regra nova (uma preferência, um erro que não deve se repetir), peça ao
   Claude para acrescentá-la aqui. Se ela servir para todo site, leve também para `modelo_site/modelo/CLAUDE.md`.

Os caminhos e nomes citados como exemplo (frota, pacotes, banners) vêm dos sites da Webgenium e da Guaçu Tur: o
Claude deve seguir a ideia, trocando pelos dados do cliente.

## Checklist do site (do começo à entrega)

Marque conforme for fazendo. Nada de entregar com item aberto sem combinar com o usuário. Os detalhes de cada item
estão na seção indicada entre parênteses.

**Começo**
- [ ] "Sobre o projeto novo" preenchido; levantamento do site antigo (sitemap, Internet Archive, Search Console).
- [ ] `src/data/empresa.ts` completo: razão social, CNPJ, endereço, coordenadas, telefone, WhatsApp por setor, e-mail,
      horário, redes, ID do Analytics, encarregado de dados (LGPD). O que faltar fica marcado como PENDENTE.
- [ ] Repositório privado no GitHub; `.env.example` no git e `.env` fora dele.

**Estrutura e design** (Estrutura, Design)
- [ ] Tokens de cor (com variantes AA), fonte auto-hospedada com fonte de reserva medida, escala tipográfica.
- [ ] `Base.astro`, Header (menu do computador e do celular), Footer (com `data-nosnippet`), WhatsApp flutuante.
- [ ] Home e páginas internas, com as URLs do site antigo sempre que possível.

**Conteúdo** (Conteúdo)
- [ ] Textos confirmados pelo cliente (nada de fato inventado); pendências listadas.
- [ ] Páginas institucionais: sobre, serviços, contato, localização, equipe (o que se aplicar).
- [ ] Painel de edição (Sveltia) com campos iguais aos esquemas, se o cliente for editar conteúdo.

**Formulários** (Stack)
- [ ] PHP em `public/api/` com SMTP, honeypot e Turnstile; testados com SMTP falso (sucesso, erro, robô, GET).
- [ ] Página `/obrigado/` e mensagem de erro com WhatsApp; nginx bloqueando `/api/inc/`.
- [ ] Aviso de privacidade em cada formulário, com link para a Política de Privacidade.
- [ ] Foco no primeiro campo dos formulários (menos na home), com as exceções do celular (Stack).

**Privacidade e LGPD** (Privacidade e LGPD) — obrigatório
- [ ] Aviso de cookies (popup) com Aceitar/Recusar e botão "Preferências de cookies" no rodapé.
- [ ] Analytics só depois do "Aceitar"; recusar apaga os cookies `_ga`.
- [ ] `/politica-de-privacidade/` e `/politica-de-cookies/` com o que o site realmente coleta, linkadas no rodapé.
- [ ] Mapas, vídeos e outros iframes de terceiros só com clique (ou com consentimento).

**SEO** (SEO)
- [ ] Título e descrição únicos, canonical, Open Graph, schemas (empresa, BreadcrumbList e os da página).
- [ ] Sitemap sem as páginas `noindex`; `robots.txt`; página de obrigado customizada.
- [ ] **Página 404 customizada para o cliente (obrigatório):** nada de entregar a do modelo sem adaptar (SEO).
- [ ] Redirecionamentos 301 de todos os endereços antigos, testados um a um; `scripts/comparar-urls.py` sem nada
      quebrando (com a exportação de páginas do Search Console em `--extra`). Só para a publicação no domínio
      definitivo: no staging não precisa (ver nginx).

**Leitura por agentes de IA** (Leitura por agentes de IA) — obrigatório
- [ ] `/llms.txt` gerado no build, com as políticas em `## Optional`.
- [ ] Versão `.md` de cada página; número de `.md` igual ao de endereços do sitemap.

**Servidor e publicação** (nginx, Stack)
- [ ] `nginx-ploi.conf` com cache, gzip, `.md`, 404, 301, `www`/`http` e cabeçalhos de segurança, testado em Docker.
- [ ] Certificado com o `www`; CSP conferida com o "Aceitar" clicado (sem violações no console).
- [ ] GitHub Actions: build, branch `publicado`, webhook da Ploi e build diário (se houver conteúdo com data).
- [ ] `.env` do servidor com SMTP, Turnstile e e-mails; chaves públicas nos secrets/variáveis do GitHub.

**Antes de entregar** (Performance, Testes)
- [ ] `npm run build` sem erros; links internos conferidos; `php -l` nos PHP.
- [ ] Ao publicar no domínio definitivo: tirar a senha do staging e o `X-Robots-Tag: noindex` do `nginx-ploi.conf`.
- [ ] Capturas no computador e no celular; PageSpeed 100 no celular (FCP, LCP, CLS medidos).
- [ ] Depois do deploy: cabeçalhos de cache, 301, `.md` e `llms.txt` iguais aos do `dist/`, formulários enviando de
      verdade, Search Console com o sitemap.

## Sobre o projeto novo

- **Dono do site:** Anselmo Luiz Éden Battisti, professor do IMPA Tech e cofundador da Webgenium. É um **site pessoal e
  acadêmico**, não de empresa: não tem serviços, WhatsApp, formulário, depoimentos, notícias nem painel. O que o guia
  diz sobre essas partes (PHP, Turnstile, Sveltia, setores) **não se aplica aqui**; elas foram tiradas do modelo.
- **Origem:** recriação em Astro (21/11/2026) do site feito em 11ty (`/mnt/windows/versionado/site`, mesmo repositório
  `anselmobattisti/site`). **Mesmo conteúdo, mesmo visual e mesmos endereços.** O `PRODUCT.md` e o `DESIGN.md` de lá
  continuam valendo como referência de produto e de design.
- **Idioma:** o site é em **inglês** (decisão registrada no `PRODUCT.md`); títulos e ementas em português levam
  `lang="pt-BR"`. Código, comentários, nomes de arquivos e campos do conteúdo em português, como no resto do guia.
- Domínio: https://battisti.com.br · Staging: PENDENTE · Hospedagem: **Ploi** (nginx, sem Node e sem PHP), deploy pelo
  GitHub Actions (branch `publicado`).
- **Dados do dono:** `src/data/autor.ts` (nome, cargo, e-mail, endereço de trabalho, perfis, ID do Analytics e o menu).
- **Conteúdo:** um `.md` por item em `src/content/` (`publication`, `teaching`, `talks`, `projects`, `extra`), com os
  esquemas em `src/content.config.ts` e as funções de leitura em `src/data/colecoes.ts`. O nome do arquivo é o
  endereço. As páginas fixas (home, work, research, patents, awards, background, contact) são `.astro` em `src/pages/`.
  - Documentos de uma palestra: soltar o arquivo em `public/talks/<arquivo da palestra>/`; ele aparece na página.
  - Diagrama em Mermaid: bloco ```mermaid no `.md` e `mermaid: true` no cabeçalho (a biblioteca só entra nessas páginas).
  - Publicação em destaque na home: `destaque: true`.
- **Visual:** `src/styles/global.css` é o CSS do site antigo (tokens `--ground`, `--surface`, `--accent`…, Roboto, texto
  justificado, tema claro e escuro), com um bloco no fim para o que a versão em Astro acrescentou. Preferências do
  dono que não mudam: Roboto em tudo, paleta quente (`#decc96`) e texto justificado.
- **Fonte com preload** (exceção à regra do modelo): sem ele, a home tinha CLS 0,03 na troca da fonte, mesmo com a
  fonte de reserva medida; com ele, 0. A Roboto fica em `public/fonts/`.
- **Analytics:** `G-V2Z5QQ6Q24`, só depois do "Accept" do aviso de cookies (o site antigo carregava sem perguntar).
- **Políticas:** `/privacy-policy/` e `/cookie-policy/` (em inglês).
- **Conferir a migração:** `python3 -I scripts/comparar-com-11ty.py` compara o texto do `<main>` de cada página do `_site` antigo
  com o `dist/` (em 21/11/2026: 50 páginas idênticas; só a 404 mudou, de propósito).

## Lições da Megamix (valem para todo site)

**Migração de um site antigo**
- **`scripts/comparar-urls.py`** (modelo): junta Internet Archive, sitemaps do site antigo e a exportação do Search Console
  e compara um a um com o nginx em Docker. "Nada quebra" tem de vir dele, não de uma amostra. A API do Archive corta em
  300 linhas se houver `limit` e às vezes cai: conferir se a resposta veio.
- **WordPress responde a mais endereços do que o sitemap mostra:** `/?p=123` e `/?page_id=123` (fazer um `map` de id para
  endereço com os ids da exportação), slugs antigos que ele redireciona sozinho, post em duas categorias nos dois
  caminhos (`/categoria-b/post/`), `/home/`, `/feed/`, `/embed/`, `/comments/feed/` e os sitemaps do Yoast.
- **Categoria indexada vira página real** no mesmo endereço, em vez de 301 para a home: é conteúdo que o Google já conhece.
- **Pasta sem `index.html` dá 403, não 404** (`/categoria/`, quando só existem `/categoria/item/`): pôr um 301.
- **Título antigo:** comparar com o do site no ar. Trocar "Marca - Empresa de X em Cidade" por "Marca | Empresa" perde
  palavras que rendiam busca.
- **Export do WordPress:** as páginas do WPBakery vêm em shortcode, com HTML em base64 + URL-encode dentro de
  `vc_raw_html`. Boa parte do conteúdo (home, slider, listas, rodapé) só existe no site no ar: ler os dois.
- **Dados em caixa alta cortados** (nomes de cidade vindos de ERP, com 20 letras): corrigir pela lista oficial do IBGE
  (`servicodados.ibge.gov.br/api/v1/localidades/estados/<uf>/municipios`), conferindo o que não bater.
- **Mapa:** usar o link com `?cid=`, nunca o encurtador `goo.gl`. O cid é o segundo número hexadecimal do link do Maps.

**Formulários e privacidade**
- **Turnstile sob demanda** (modelo, `Campos.astro`): o script só é baixado quando a pessoa usa o formulário. Testar de
  ponta a ponta com as chaves de teste da Cloudflare: `PUBLIC_TURNSTILE_SITEKEY=1x00000000000000000000AA npm run build` e
  `TURNSTILE_SECRET=1x0000000000000000000000000000000AA` no `.env`. Fazer um build sem elas depois.
- **Largura do Turnstile no celular** (modelo, pedido do usuário, 05/11/2026): até 639 px, `width: max(90%, 300px)` com `zoom: 0.9` no `global.css`. Assim ele fica com 90% da largura do formulário e não passa dos campos. Sem o `zoom` não dá: a Cloudflare não desenha o widget com menos de 300 px, e o `width` sozinho o cortaria. Testar com a chave de teste e, no Chrome headless, com `Emulation.setFocusEmulationEnabled`: sem ele, o `focusin` não dispara e o widget não carrega.
- **Canal de denúncias:** `enviarEConcluir(..., ['sigiloso' => true])` e `exigirTurnstile($config, true)` (modelo): sem IP
  no e-mail, sem o texto no log e sem mandar a pessoa para o WhatsApp. Sem nome nem contato nos campos. Evento do
  Analytics com nome genérico, junto com o de sugestões, porque ele fica ligado ao visitante.
- **Currículo ou anexo:** `anexoEnviado()` + `['anexo' => $anexo]` (modelo), com `enctype="multipart/form-data"`, nginx
  com `client_max_body_size` e `upload_max_filesize`/`post_max_size` no PHP. Testar com um arquivo falso renomeado.
- **Obrigado:** com formulários diferentes, texto diferente por `?enviado=` (currículo não "responde pelo WhatsApp").
- **Eventos do Analytics** (modelo, `AvisoCookies.astro`): `clique_whatsapp` em todo link do WhatsApp e `envio_*` na página
  de obrigado, que só abre depois do envio. Testar lendo o `window.dataLayer`, com o Google bloqueado
  (`Network.setBlockedURLs`): clicar em "Aceitar" sem bloquear manda dados de teste para o Analytics do cliente.
- **`curl -F` em testes:** valor que começa com `(` é lido como multipart aninhado e o campo seguinte some. Telefone:
  `--data-urlencode`.

**Servidor**
- **`www` e `http`** (modelo): bloco da porta 80 e regra do `www` no `nginx-ploi.conf`. Testar em Docker com certificado
  próprio (`openssl req -x509`) e `curl -H "Host: …"`.
- **Cabeçalhos** (modelo): HSTS sem `includeSubDomains` (subdomínio em http quebraria), `Referrer-Policy`,
  `Permissions-Policy` e CSP. O Analytics precisa de mais domínios do que parece; ver o `map` no nginx.

**Layout**
- **`columns` com `max-height` na mesma lista:** o que não cabe vira colunas extras escondidas à direita. A altura e a
  rolagem ficam numa caixa em volta da lista.
- **Fonte de reserva dos títulos** (modelo): a do corpo foi medida no peso normal; no peso dos títulos, o H1 ganhava uma
  linha quando a fonte chegava (CLS 0,03). Trocou a fonte ou o peso? Medir de novo com `measureText` no navegador.
- **`<details name="…">`** deixa um só aberto. Numa busca que precisa abrir vários, tirar o `name` e devolver ao limpar,
  fechando todos antes (senão o navegador mantém o primeiro aberto, qualquer que seja).
- **Busca em lista com JS:** normalizar com `normalize('NFD')` para ignorar acentos, contar com `Set` (item repetido em
  dois grupos) e deixar o campo `hidden` até o script rodar.
- **Na captura de tela, imagem `lazy` pode faltar:** antes de achar que quebrou, rolar até ela e conferir `naturalWidth`.

**Preferências visuais do usuário** (padrão, salvo pedido do cliente)
- Palavras-chave em negrito em todos os textos: `**assim**` nos dados e no Markdown (`Destaque.astro`).
- Botões de WhatsApp com o ícone (`IconeWhats.astro`). Nas páginas internas, no computador, numa linha só; links
  secundários abaixo, centralizados, com ícone (externo, voltar).
- No celular: botões um por linha, com 90% da tela e centralizados. Abas com largura igual. Sem faixa de telefones no topo
  (os WhatsApps ficam no menu e no botão flutuante).
- Setas de banner sobre a imagem, uma de cada lado, sumindo no primeiro e no último.
- **Cabeçalho (menu) com fundo diferente da primeira faixa da página** (pedido do usuário, 19/11/2026): o hero da home
  e a faixa do topo das páginas internas não podem ter a mesma cor do cabeçalho, senão os dois viram um bloco só e o
  menu some. Se o topo é escuro, o cabeçalho é claro (branco, com o logo nas cores originais), ou o contrário; uma
  borda fina não basta. Conferir na home, numa página interna e na 404, e de novo depois de trocar as cores da marca
  O modelo já vem com o cabeçalho claro (`--fundo`) e o topo escuro (`--fundo-escuro`): ao mudar um, olhar o outro.
- Submenu com fundo diferente do cabeçalho e da faixa do topo das páginas internas (conferir nas duas), abrindo na base
  do cabeçalho.
- Legenda sobre foto em caixa escura semitransparente (70%), não em degradê.
- Cartões com borda e sombra.
- **Texto justificado em todo o site** (modelo, pedido do usuário, 13/11/2026): `main :where(p, dd, .texto li, .texto-legal li)
  { text-align: justify; hyphens: auto; }` (não em todo `li`: cartões são listas, e o nome dentro deles esticaria) no `global.css` (precisa do `lang="pt-BR"`). O `:where()` deixa a regra fraca: texto
  centralizado por classe continua centralizado; container centralizado (`.secao__topo--centro`) precisa da exceção.
  Colunas estreitas abrem buracos entre as palavras: ícone acima do texto nos cartões. Títulos, botões e rodapé ficam
  alinhados à esquerda.
- **Rodapé com ícones** (modelo, pedido do usuário, 13/11/2026): `Icone.astro` (pino, telefone, e-mail, WhatsApp,
  relógio, exames, redes e a seta dos links). Endereço e contatos com o ícone à esquerda, redes como botões redondos
  só com o ícone (com `aria-label`), seta antes de cada link das colunas.
- Lista de arquivos: linha com o título e "Download" com ícone de PDF, com o atributo `download`, em vez de `<select>`.

## Lições da Guaçu Tur (valem para todo site)

- **Staging com senha** (modelo): HTTP Basic Auth no nginx, com o arquivo de senhas no servidor
  (`~/.htpasswd-staging`, fora do git e da pasta pública), mais `X-Robots-Tag: noindex, nofollow`. O
  `/.well-known/acme-challenge/` fica aberto por um `map` (`auth_basic $senha_staging`, com `off` só nele), para o
  certificado renovar sem colidir com um `location` da Ploi. Senha em JavaScript não serve: os arquivos ficariam
  abertos. Testar em Docker (401 sem senha, 200 com senha, ACME sem senha). Remover tudo ao publicar.
  **Nunca escrever a senha em arquivo do repositório, em log ou na tela.**
- **Fotos: `formats={formatosFoto}`** (modelo, `src/data/imagens.ts`), nunca `formats={['avif']}` direto: no
  `npm run dev` o AVIF é gerado a cada pedido, sem cache (10–14 s para 1920 px, e a foto não aparecia); a constante
  usa só WebP no dev e AVIF + WebP no build.
- **Imagem trocada que não muda no `npm run dev`:** é cache (do Vite e do navegador) por causa do nome igual.
  Renomear o arquivo e o import.
- **`<picture>` com `display: contents` dentro de um grid:** o `<source>` vira célula da grade. Envolver o `<Picture>`
  num `<div>`.
- **Astro com versão fixa** no `package.json` (7.4.1 no modelo): a 7.4.2 exige Node ≥ 22.23.4. Atualizar só depois
  de conferir o Node da máquina e do Actions.
- **Actions sem artefato** (modelo): build e publicação no mesmo job. O plano da organização tem 0,5 GB de
  armazenamento do Actions, e os artefatos do `dist/` estouraram a cota. O cache (`node_modules/.astro`) não conta.
- **Nada de credencial no log do SMTP** (modelo): o login aparece como "AUTH (dados ocultos)". Testar com um SMTP
  falso que responde 535.
- **Painel (Sveltia)** (modelo, com os depoimentos):
  - só no modo online (login pelo GitHub), nunca o "Work with Local Repository"; por isso o painel pode ser uma
    página do Astro (`src/pages/admin/index.astro`), que abre no `npm run dev`;
  - JavaScript servido pelo próprio site (`scripts/copiar-sveltia.mjs`), com versão exata no `package.json` e a
    mesma versão no `$schema` do `config.yml`; a tela de login do `/admin/` lista os erros do config;
  - campos do `config.yml` e esquemas do `content.config.ts` andam juntos;
  - listas num arquivo só (depoimentos, banners) como coleção de arquivo (`file:`), com `id` do tipo `uuid` e o
    caminho das fotos relativo ao JSON (`../assets/…`); o `getCollection` ordena pelo id: se a ordem importa,
    reordenar pela ordem do JSON;
  - filtros do `summary` com aspas simples dentro de aspas duplas; texto com vírgula dentro de `{ … }` entre aspas;
    nas dicas, `**` vira negrito (escrever entre crases);
  - `media_folder` nunca `''` no nível de cima (a raiz do repositório): a tela "All Assets" ficava em branco. Nas
    coleções de pasta, `media_folder: ''` guarda as fotos ao lado do `index.md` do item.
- **Conteúdo com data** (pacotes, eventos): o vencido sai das listagens e do sitemap no build, a página fica no ar com
  aviso e `noindex`, e o Actions refaz o build todo dia de madrugada (o `schedule` já está no workflow).
- **Depoimentos:** só avaliações reais do Google, com o texto como a pessoa escreveu; negativos ficam de fora. Nota e
  total do Google em `empresa.avaliacoesGoogle`. "Avaliações positivas" não é um dado que o Google informa.
- **Mapa do Google:** a regra é carregar só com clique; se o cliente pedir que carregue sempre, usar
  `loading="lazy"`, altura fixa (sem CLS) e citar os cookies do Google Maps na Política de Cookies.
- **Material do cliente em `docs/`** (exportação do WordPress, áudios, artes): pode ter nomes e e-mails. O XML e os
  áudios ficam fora do git (`.gitignore` do modelo).

## Como trabalhar comigo (preferências do usuário)

- **Tudo em português**: textos, comentários no código, nomes de variáveis, componentes e arquivos (`empresa.ts`, `Servicos.astro`, `urlPost`).
- **Perguntar antes de commitar.** O usuário costuma commitar por conta própria.
- **Credenciais só no `.env`**, fora do git (com `.env.example` no repositório). Nunca mostrar senhas na tela.
- **Nunca rodar `npm ci`** (nem com `--dry-run`): apaga o `node_modules`. Usar `npm install`.
- **Não usar `pkill`**: achar o PID com `ps`/`grep` e usar `kill <PID>`.
- **Não inventar fatos.** Afirmações sobre o que a empresa faz, prazos, preços e promessas precisam ser confirmadas pelo
  usuário; listar no fim da resposta o que ficou pendente de confirmação.
- **Posts do blog terminam com `## Fontes`**, só com as fontes realmente lidas (com a data de consulta).
- Ao terminar, testar de verdade (build, abrir as páginas, medir) e relatar o resultado com números.

## Stack

- **Astro** (site 100% estático, `trailingSlash: 'always'`), `@astrojs/sitemap` e a fonte via `@fontsource-variable/*`
  (auto-hospedada, sem Google Fonts). Nenhum framework de JS no cliente.
- **Formulários em PHP** (`public/api/*.php`), porque a hospedagem (Ploi: nginx + PHP-FPM) não roda Node:
  - envio por **SMTP autenticado** escrito à mão, sem bibliotecas, com o código comum em `public/api/inc/envio.php`;
  - o PHP lê o `.env` **um nível acima da pasta pública**;
  - proteção com **honeypot + Cloudflare Turnstile** (verificado no servidor);
  - integração opcional com o ERP (POST); se falhar, o e-mail sai do mesmo jeito e o erro vai para o log;
  - **no modelo:** sem ERP. `contato.php` (setor `atendimento`); formulário novo segue o mesmo padrão, com o setor
    em `SETORES` do `envio.php`. E-mail por setor no `.env` (`EMAIL_COMERCIAL`…, com `EMAIL_DESTINATARIOS` de
    reserva); o honeypot é o campo `site`; o nginx bloqueia `/api/inc/`; a página `/obrigado/?enviado=…&setor=…`
    mostra o WhatsApp do setor. Testar com um SMTP falso local (Python na porta 2525 e `SMTP_SEGURANCA=nenhuma`) e
    `php -S` no `dist/`;
  - em caso de erro, a pessoa vê uma mensagem com o WhatsApp como alternativa.
  - **nada de credencial no log:** as mensagens de erro do SMTP vão para o log do servidor, e o login (usuário e
    senha em base64) aparece como "AUTH (dados ocultos)". Corrigido em 29/10/2026 (antes, a senha em base64 ia
    para o log quando o servidor recusava o login); testar com um SMTP falso que responde 535.
- **Formulários com campos nomeados** (rótulos reais), para leitores de tela e agentes de IA entenderem a página.
- **Foco no primeiro campo, por padrão** (pedido do usuário, 28/10/2026): em toda página com formulário, menos a
  home, o foco vai sozinho para o primeiro campo (ou para o "Nome", quando o primeiro já vem preenchido pelo endereço,
  como `/reservar/?tipo=compras`). Como fazer:
  - script pequeno, sem `import`, com `focus({ preventScroll: true })`, para a página não pular;
  - **ao abrir a página, focar só no computador** (`matchMedia('(min-width: 960px)')`, a largura em que o formulário
    aparece na primeira tela): no celular, o teclado abriria e cobriria o topo da página e o que vem antes do
    formulário (texto de abertura, lista de WhatsApp). Assim está o `/fale-conosco/` do modelo;
  - formulário que fica no meio de uma página longa (ex.: "Tenho interesse" do pacote) só ganha o foco quando a
    pessoa vai até ele: pelo botão (`click`) ou abrindo o endereço com a âncora (`#interesse`). Com âncora, focar
    depois do `load`, porque o navegador trata a âncora depois do script e tira o foco;
  - o mesmo componente de formulário usado em outras páginas não puxa o foco lá (o script fica na página, não no
    componente).
- **Deploy:** GitHub Actions faz o build, grava o `dist/` num branch `publicado` e chama o webhook de deploy da Ploi.
  O cache das imagens otimizadas (`node_modules/.astro/`) fica salvo entre as execuções: o primeiro build leva ~12 min
  (AVIF é lento), os seguintes menos de 1 min.
- **Build e publicação no mesmo job, sem artefato** (`upload-artifact`): o plano da organização webgenium inclui só
  0,5 GB de armazenamento do Actions por mês, e os artefatos do `dist/` (~60 MB, a cada push e no build diário)
  estouraram a cota em 29/10/2026; o upload passou a falhar com "Artifact storage quota has been hit". O cache
  (`actions/cache`) não entra nessa conta.

## Estrutura que deu certo

```
src/
  pages/              uma pasta por endereço (mesmas URLs do site antigo sempre que possível)
  layouts/            Base.astro (<head>, SEO, Open Graph, schema da empresa) e Legal.astro (políticas)
  components/         seções reaproveitadas (Header, Footer, CabecalhoPagina, Numeros, Chamada, Faq, Depoimentos…)
  content/noticias/   uma pasta por notícia (index.md + fotos ao lado); o mesmo vale para um blog (content/blog/)
  content.config.ts   esquemas com zod: o build falha se faltar um campo
  data/               conteúdo editável: empresa.ts, servicos.ts, cidades.ts, orcamento.ts, faq.json, depoimentos.json, projetos.json
  styles/global.css   tokens de cor, fonte e espaçamento
public/               robots.txt, favicon, api/ (PHP)
nginx-ploi.conf       configuração completa do nginx, versionada
```

- **Uma fonte de verdade para os dados da empresa** (`src/data/empresa.ts`): nome, razão social, CNPJ, endereço, coordenadas,
  telefone, WhatsApp por setor (com a mensagem pronta), horário, redes, número de clientes/sites, ID do Analytics.
  Nenhuma página repete esses valores à mão.
- **Serviços num arquivo só** (`servicos.ts`): o mesmo dado alimenta os cards da home, a página de serviços, o orçamento e o `llms.txt`.
- **Orçamento com o serviço já marcado:** `linkOrcamento('registro-de-dominio')` → `/orcamento/?servico=registro-de-dominio`.
  A lista de serviços fica em `orcamento.ts` e precisa bater com a do PHP e com o enum do FAQ.
- **Comentários no código explicando o porquê** (decisões de SEO, performance, acessibilidade), em português.

## Design

- **Tokens no `global.css`**: cores base da marca + **papéis** (`--texto`, `--texto-suave`, `--fundo`, `--fundo-alt`, `--borda`,
  `--sombra`…). Nos componentes, só os papéis; nada de hex solto.
- **Escala tipográfica fixa** (`--fs-h1` … `--fs-xs`, com `clamp()` nos títulos) e um único `--espaco-secao`.
- **Contraste AA**: criar variantes escuras da cor da marca para texto (ex.: `--turquesa-texto`, `--verde-whats`).
- Seções com fundos alternados automaticamente pelo CSS, sem classe manual.
- **Armadilha do negrito em `.astro`:** não começar nem terminar um `<strong>` numa quebra de linha, senão o espaço some.
  Conferir com `grep -oE "[[:alnum:]À-ú]<strong[^>]*>|</strong>[[:alnum:]À-ú]"`. Nos dados, usar `**texto**` e um
  componente `Destaque.astro` que converte.
- **Carrosséis em CSS** (`scroll-snap`), visíveis sem JavaScript. As setas ficam num componente (`CarrosselSetas.astro`) com
  script **sem imports**, para o Astro embutir no HTML.
- **Animações de entrada** com IntersectionObserver (classes `revelar` / `revelar--visivel`), números com contagem, ilustração
  do topo montada com animação. Sempre respeitar `prefers-reduced-motion`.
- Cartões de depoimento: aspas, autor com foto ou avatar com a inicial, e letra maior nos depoimentos curtos.
- **Depoimentos** (modelo, pedido do usuário no DeROSE, 13/11/2026):
  - home com `CarrosselDepoimentos.astro`: infinito para os dois lados (a lista sai três vezes, cópias com
    `aria-hidden` e `inert`; ao parar numa cópia, pula um grupo sem animação), passagem automática a cada 5 s (pausa com
    mouse, foco, toque, aba escondida e `prefers-reduced-motion`), degradê nas laterais com `mask-image`, sem barra de
    rolagem e com folga embaixo para a sombra dos cartões (antes, o cartão encostava na barra);
  - medir só depois de mostrar as cópias: com elas em `display: none`, o passo dava 0 e o carrossel não andava;
  - `/depoimentos/` em colunas (alvenaria), botão "Ver no Google" branco com o G colorido (`IconeGoogle.astro`);
  - texto com `white-space: pre-line` (as quebras da pessoa) e alinhado à esquerda; sem detalhe, "Avaliação no
    Google · ano". Data aproximada pelo "há X anos" do Google. Sem schema Review (avaliação da própria empresa no
    próprio site o Google ignora) e sem a avaliação dos donos/funcionários.

## Performance (PageSpeed 100 no celular)

- **Sem preload da fonte.** Em vez disso, uma **fonte de reserva com as medidas da fonte real**
  (`@font-face` local Arial com `size-adjust`, `ascent-override`, `descent-override`), para o texto aparecer na hora (FCP) e a troca
  não mover a página (CLS ~0). Para a Montserrat: size-adjust 111.5%, ascent 86.8%, descent 22.5%.
- **Imagens:** `<Picture formats={['avif']} fallbackFormat="webp">` para fotos e capturas; `<Image>` para as pequenas; sempre com
  `width`/`height`. Imagem do topo com `loading="eager"` e `fetchpriority="high"`.
- **Nada de reflow forçado:** medir com ResizeObserver/IntersectionObserver e `requestAnimationFrame`, lendo tudo antes de escrever.
- **Evitar cadeia de downloads de JS:** scripts pequenos sem `import`, para irem embutidos no HTML.
- **CLS:** elementos que aparecem depois (aviso de cookies, botão flutuante) usam `transform` em vez de `top`/`bottom` e só
  entram depois de `document.fonts.ready`.
- **Analytics só com consentimento** (aviso de cookies LGPD; o `gtag` é carregado depois do "Aceitar").
- Medir com Chrome headless via CDP (throttle "slow 4G" e CPU 4×), FCP, LCP, CLS e reflows, antes e depois de cada mudança.

## SEO

- **Manter as URLs do site antigo** sempre que possível; o resto com **301 no nginx**. Levantar os endereços antigos no
  Internet Archive (CDX API) e no Search Console, e testar todos depois de aplicar.
- `Base.astro`:
  - `title` até ~60 caracteres; se passar disso, tira o sufixo " | Marca";
  - `description` única por página;
  - `canonical`, mas não na 404;
  - Open Graph com o tamanho real da imagem e `og:image:alt`; `og:type article` + datas nos posts;
  - schema `ProfessionalService` (ou `LocalBusiness`) com endereço, `geo`, `hasMap`, horário, `areaServed` e `sameAs`.
- Schemas por página: `BreadcrumbList` (trilha de navegação), `FAQPage`, `BlogPosting`, `AboutPage`, `Service`.
- Um H1 real por página e hierarquia de títulos correta.
- **Páginas por cidade** com textos próprios (economia, perfil das empresas, clientes de lá), nunca cópias trocando o nome.
  Confirmar os fatos de cada cidade com o usuário.
- **Portfólio** com uma página por categoria e por projeto (capturas do computador e do celular).
- **FAQ por serviço**, num JSON só, com as perguntas marcadas para a home.
- **Sitemap** (`@astrojs/sitemap`, no `astro.config.mjs`): o índice é `/sitemap-index.xml`, que aponta para o
  `/sitemap-0.xml`.
  - **Fica de fora:** obrigado, 404, `/admin/` e os pacotes vencidos. A data de saída dos pacotes é lida direto dos
    `.md` (o `astro.config.mjs` não tem acesso às coleções). Rascunhos nem viram página, então também não entram.
  - **Regra que tem de bater:** toda página com `noindex` fica fora do sitemap, e toda página fora do sitemap (menos
    os redirecionamentos) tem `noindex`. O pacote vencido, por exemplo, tem as duas coisas.
  - **`lastmod`** só em posts de blog, com a data real de atualização (o campo `atualizado`); nas outras páginas,
    nada (uma data inventada ou a data do build faz o Google desconfiar do campo). No modelo, o `lastmod` sai nas notícias, com a data de cada uma
    (lida do `index.md` no `astro.config.mjs`).
- **Personalizar a página 404 é obrigatório em todo site** (pedido do usuário, 05/11/2026): o `404.astro` do modelo é só
  o ponto de partida, e o site não está pronto enquanto ela não for adaptada ao cliente. Ela precisa ter a marca e o
  visual do site (com o número 404 como elemento visual) e atalhos para as páginas reais dele, com WhatsApp. Conferir
  com um endereço com a barra final (`/nao-existe/`) no `npm run dev`: sem a barra, a tela genérica é do Astro.
- **Páginas 404 e obrigado customizadas**, no visual do site (cabeçalho, rodapé e WhatsApp flutuante), nunca as
  padrão do servidor:
  - **404** (`src/pages/404.astro` → `/404.html`, ligada no nginx por `error_page 404 /404.html`): diz que a página
    não existe ou mudou de endereço e leva para onde a pessoa provavelmente queria ir (pacotes, frota, viagens de
    compras, fale conosco) e para o WhatsApp. Sem `canonical`, com `noindex`.
  - **Obrigado** (`/obrigado/`, para onde os formulários levam depois do envio): confirma que a mensagem chegou,
    diz quem vai responder e oferece o WhatsApp para quem tem pressa, além de links para continuar navegando
    (pacotes em destaque). Com `noindex`. É também o ponto para medir conversões no Analytics.
- `robots.txt` estático em `public/`, liberando tudo menos `/api/`, com a linha `Sitemap:` apontando para o
  `sitemap-index.xml`. **Não bloquear o `/admin/`**: a página do painel tem `noindex`, e o robô precisa abri-la para
  ler isso. Bloqueada no robots, o Google pode listar o endereço sem conteúdo, só porque algum link aponta para ela.
- O `config.yml` do painel (`/admin/config.yml`) fica aberto de propósito: o painel roda no navegador e precisa dele.
  Não guarda segredo nenhum (só o repositório, as pastas e os campos). A proteção é a permissão de escrita no GitHub,
  com o repositório privado e a conta do cliente restrita a ele, com verificação em duas etapas.
- **Crédito da Webgenium no rodapé** (modelo, `Footer.astro`): logo branca (`src/assets/logo-webgenium-branca.png`, 446×80, tirada do `logo.png` do site da Webgenium, não da imagem de 85×20) com link para `https://webgenium.com.br/?ref=<domínio>`. O `ref` sai do `empresa.url`: não escrever à mão.
- **Rodapé com `data-nosnippet`**, para o Google não usar endereço, telefones e links do rodapé como trecho do
  resultado. O atributo vai nas `div` de dentro (o Google só o lê em `span`, `div` e `section`, não em `<footer>`).
  Não impede a indexação da página nem dos links.

## Leitura por agentes de IA (obrigatório em todo site)

Todo site **precisa** ter as duas coisas abaixo, geradas automaticamente no build: ChatGPT, Gemini, Claude e outros
agentes leem o site por elas, e é assim que a empresa aparece nas respostas das IAs. O site não está pronto sem elas.
Neste site (modelo): `src/pages/llms.txt.ts` e `integracoes/paginas-markdown.mjs`.

### 1. `/llms.txt` (padrão llmstxt.org)

- Endpoint do Astro (`src/pages/llms.txt.ts`), servido como `text/plain; charset=utf-8`.
- Montado **com os mesmos dados das páginas** (`empresa.ts`, `setores.ts`, `servicos.ts` e as coleções), nunca à
  mão. Com conteúdo com data, o build diário também o atualiza.
- Ordem: `# Nome`; um parágrafo `>` com o resumo (o que faz, onde, desde quando, números); contatos (nome, endereço,
  telefone, e-mail, WhatsApp de cada setor, link de reserva); o aviso das versões `.md`; seções com links e descrição
  curta (pacotes por categoria com saída, duração e preço; viagens de compras; serviços; frota; ônibus à venda; empresa;
  e, quando existirem, `## Optional` com políticas e páginas secundárias).

### 2. Versão `.md` de cada página

- Integração do Astro no `astro:build:done` (`turndown` + `turndown-plugin-gfm`, versões iguais às da Webgenium).
- Endereço: a barra final vira `.md`. `/frota/` → `/frota.md`, `/` → `/index.md`, `/pacotes/<slug>/` → `/pacotes/<slug>.md`.
  Nunca `/frota/index.html.md` (colide com regras de redirecionamento por regex no nginx).
- Cada arquivo: cabeçalho com `titulo`, `descricao` e `url` (entre `---`) e só o conteúdo do `<main>`, com links e
  imagens em endereço completo (`https://…`).
- Fica de fora: scripts, SVG, formulários, botões, `<dialog>` (visor da galeria), elementos `hidden` ou `aria-hidden`,
  imagens com `alt` vazio e textos duplicados só para celular (classe `__curto`).
- Pula as páginas com `noindex` (pacotes vencidos, 404, obrigado) e as sem `<main>` (painel `/admin/`, redirecionamentos).
- Cada página HTML ganha `<link rel="alternate" type="text/markdown" href="/caminho.md">`.
- **nginx** (`nginx-ploi.conf`): o `mime.types` não conhece o `.md`, que sem isto sai como download. Bloco
  `location ~* \.md$ { types { } default_type text/markdown; charset_types text/markdown; try_files $uri =404; }`.
  Também pôr `md` no cache de 1 hora e `text/markdown` no `gzip_types`.

### Como conferir (antes e depois do deploy)

- O build informa "N páginas em Markdown", e **N tem de bater com o número de páginas do `sitemap-0.xml`** (cada
  endereço do sitemap tem o seu `.md`, e nenhum `.md` fica fora do sitemap).
- O `.md` sai com `Content-Type: text/markdown; charset=utf-8`; o `.md` inexistente dá 404.
- Em produção, os `.md` e o `llms.txt` são idênticos aos do `dist/` local.

## Privacidade e LGPD (obrigatório em todo site)

Todo site **precisa** ter as três coisas abaixo, prontas antes de publicar: o aviso de cookies, a Política de
Privacidade e a Política de Cookies. Os formulários já apontam para a política, e o Analytics depende do aviso.
Neste site (modelo): `src/components/AvisoCookies.astro`, `src/layouts/Legal.astro`, `src/pages/politica-de-privacidade.astro`
e `src/pages/politica-de-cookies.astro` (revisar com o que o site do cliente realmente coleta).

### 1. Aviso de cookies (popup)

- Caixa fixa no canto de baixo, com **Aceitar** e **Recusar** do mesmo tamanho e peso (recusar tem de ser tão fácil
  quanto aceitar) e link para a Política de Cookies.
- **Nada de Analytics, Pixel ou similar antes do "Aceitar".** O `gtag` só é carregado depois do clique; ao recusar,
  apaga os cookies `_ga` e `_ga_*`. A escolha fica no `localStorage` (não em cookie).
- Botão **"Preferências de cookies"** (`data-preferencias-cookies`) no rodapé e na Política de Cookies, que reabre o
  aviso para a pessoa mudar de ideia.
- Sem ID do Analytics no `empresa.ts`, o aviso não aparece sozinho (não há o que consentir), mas o botão de
  preferências continua abrindo. Com o ID, aparece na primeira visita.
- Performance: só aparece depois de `document.fonts.ready` e com `transform`, para não causar CLS; o WhatsApp
  flutuante sobe enquanto ele está aberto.

### 2. Política de Privacidade (`/politica-de-privacidade/`)

Escrita com base na LGPD (Lei 13.709/2018) e **no que o site realmente faz** (ler os formulários e o PHP antes de
escrever). Seções:

- **Controlador:** razão social, CNPJ, endereço (de `empresa.ts`). **Encarregado de dados (DPO)** com nome e e-mail;
  sem encarregado indicado, um canal de contato para assuntos de dados (e-mail).
- **Dados coletados:** os campos de cada formulário, o atendimento (WhatsApp, telefone, e-mail), os registros do
  servidor (IP, data e hora) e o Analytics só com consentimento. Dizer que não se pedem dados sensíveis.
- **Finalidade e base legal** de cada uso (art. 7º): responder o pedido e prestar o serviço (V), segurança contra
  robôs (IX, legítimo interesse), estatísticas (I, consentimento), registros de acesso (II, obrigação legal).
- **Compartilhamento:** hospedagem e envio de e-mail, Cloudflare (Turnstile), Google (Analytics), WhatsApp,
  fornecedores necessários ao serviço e autoridades; transferência internacional (art. 33). Não vender dados.
- **Prazo de guarda:** pedidos até a resposta, clientes pelo prazo legal, registros de acesso por 6 meses (Marco
  Civil da Internet).
- **Direitos do titular** (art. 18) e a ANPD; segurança (HTTPS, acesso restrito); crianças e adolescentes;
  mudanças na política (data de atualização no topo).
- Revisar a política sempre que entrar um formulário, uma ferramenta ou um serviço novo.

### 3. Política de Cookies (`/politica-de-cookies/`)

- O que são cookies; **quais o site usa**, separados em necessários (Turnstile) e de análise (Google Analytics, só
  com consentimento, `_ga` e `_ga_*`, até 2 anos), mais os de terceiros que só carregam com clique (mapa do Google).
- Como aceitar, recusar e mudar a escolha (botão de preferências), e como controlar pelo navegador.
- Links para outros sites (WhatsApp, redes sociais, Google Maps) seguem as políticas deles.

### Como conferir

- As duas políticas no rodapé, no sitemap, com `.md` e na seção `## Optional` do `llms.txt`.
- No navegador: sem aceitar, nenhum pedido para `googletagmanager.com` nem cookie `_ga`; depois do "Aceitar", o
  Analytics carrega; depois do "Recusar", os cookies somem.
- Os dados de `empresa.ts` usados pela política (razão social, CNPJ, encarregado) confirmados pelo cliente.

## nginx (Ploi)

Arquivo `nginx-ploi.conf` versionado na raiz, colado em **Manage > NGINX configuration**:

- **Sempre escrito para o domínio principal, nunca para o staging** (pedido do usuário, 16/11/2026): é a configuração
  que vai para o ar (`server_name`, `www`, bloco da porta 80, certificado, includes da Ploi e log). Para colar no site
  de staging da Ploi, trocar o domínio só na cópia colada, sem gravar no git.

- **Staging com senha** (pedido do usuário, 29/10/2026): HTTP Basic Auth no nginx em todo o site, com o arquivo de
  senhas no servidor (`~/.htpasswd-staging`, fora do git e da pasta pública), mais `X-Robots-Tag: noindex, nofollow`.
  O `/.well-known/acme-challenge/` fica aberto por um `map` (`auth_basic $senha_staging`, com `off` só nele), para o
  certificado renovar sem colidir com um `location` da Ploi. Senha em JavaScript não serve: os arquivos ficariam
  abertos. Testar em Docker com um `.htpasswd` de teste (401 sem senha, 200 com senha, ACME sem senha). Remover tudo
  ao publicar no domínio definitivo.
- `try_files $uri $uri/ =404;` + `error_page 404 /404.html;` (o modelo da Ploi manda tudo para `/index.php`).
- Cache com `map $uri $variavel` e um `add_header` só no `server`:
  HTML `no-cache`; `/_astro/` 1 ano `immutable`; imagens 7 dias; fontes 30 dias; js/css 1 dia; xml/txt 1 hora; PHP sem cabeçalho.
- `gzip` com `gzip_types` e `charset utf-8`.
- Redirecionamentos 301 com comentários explicando cada grupo. Cuidado com loops (regra antiga ao contrário) e com o
  redirecionamento interno para `index.html` em regras com regex (usar `(?!index\.html$)`).
- **301 do site antigo só quando o site for para o ar** (pedido do usuário, 16/11/2026): no staging não precisa (o
  domínio é outro, ninguém chega lá por link antigo e o Google não indexa). Montar e testar as regras (Docker e
  `scripts/comparar-urls.py`) antes de publicar no domínio definitivo, junto com a retirada da senha do staging.
- Testar localmente com Docker (`nginx:alpine` + a mesma configuração) antes de aplicar.

## Conteúdo

- Textos diretos, frases curtas, palavras-chave em negrito, sem promessas não confirmadas.
- **Números centralizados** (anos de mercado, sites criados, contas de e-mail), usados em todas as páginas.
- Depoimentos reais do Google num JSON (`data` para ordenar, `home: true` para destacar), com uma página só para eles (`/depoimentos/` no modelo) e link para avaliar.
- **Notícias** (modelo, vindas do site da ACIPP, 19/11/2026): coleção `noticias`, uma pasta por notícia
  (`src/content/noticias/<slug>/index.md` + fotos ao lado), editada no painel. O que o modelo traz:
  - `/noticias/` com `CartaoNoticia.astro` (capa, data, título, começo do texto e a faixa "Ler mais" no pé do cartão)
    e as três últimas na home (a seção some sem notícia publicada);
  - `/noticias/<slug>/`: galeria no topo (a capa e as fotos viram miniaturas) que abre num visor por cima da página
    (`<dialog>`, setas na tela e no teclado, contador, fecha com Esc, botão ou clique fora; sem JavaScript, cada foto
    é um link para a imagem grande); links de compartilhamento (WhatsApp, Facebook, LinkedIn, X, e-mail e copiar o
    link), que são só links, sem script de rede social nem cookie de terceiros; botões "Anterior" (à esquerda, a mais
    antiga) e "Próxima" (à direita); schema `NewsArticle` e imagem de compartilhamento feita da capa;
  - data sempre no fuso de São Paulo (`dataIso`, `dataPorExtenso` em `src/data/noticias.ts`): pelo UTC, notícia
    publicada à noite saía com o dia seguinte;
  - `data-fora-do-md` em blocos que só servem na tela (os botões de compartilhar): ficam fora da versão `.md`;
  - `seoTitulo` e `descricao` opcionais no painel; sem eles, valem o título e o começo do texto;
  - `src/content/noticias/exemplo-de-noticia/` é só um exemplo com PENDENTE: trocar pelo conteúdo real ou apagar a
    pasta. Cliente sem notícias: apagar a coleção, as páginas `src/pages/noticias/`, o item do menu e do rodapé, a
    seção da home, a do `llms.txt` e a coleção do `config.yml`.
- Blog em Markdown, um diretório por post: frontmatter com `titulo`, `seoTitulo`, `descricao` (até 160), `data`, `atualizado`,
  `categorias`, `imagem` (capa de pelo menos 1200 px de largura), `leitura`. Quadros de destaque com
  `<aside class="destaque">` (linhas em branco em volta) e botões com `<p class="acoes">`.
- Páginas institucionais que valem a pena: Sobre (com linha do tempo), Serviços, uma página por serviço, Portfólio,
  Avaliações, Região de atuação, Projetos sociais, Orçamento. As políticas de privacidade e de cookies são obrigatórias (ver "Privacidade e LGPD").
- WhatsApp por setor (comercial, suporte, financeiro) com mensagem pronta, e botão flutuante.

## Testes que fizemos em todo o processo

- `python3 -I scripts/comparar-urls.py` contra o nginx em Docker, quando houver site antigo.
- `npm run build` sem erros (depois de mudar esquemas: `rm -f .astro/data-store.json`).
- Servir o `dist/` localmente (`php -S 127.0.0.1:PORTA -t dist`, que também roda os formulários) ou com nginx em Docker.
- Chrome headless via CDP: capturas de tela no computador e no celular, FCP/LCP/CLS com throttle, reflows forçados (tracing),
  carrosséis, animações e a árvore de acessibilidade.
- Conferir que todos os links internos apontam para páginas que existem no `dist/`.
- `php -l` nos arquivos PHP.
- Depois do deploy: conferir cabeçalhos de cache, redirecionamentos e o PageSpeed em produção.
