# Site Anselmo Battisti

Site em Astro (100% estático), publicado na Ploi pelo GitHub Actions. As regras do projeto, as decisões e o checklist
ficam no [CLAUDE.md](CLAUDE.md).

## No computador

```bash
npm install          # nunca npm ci (apaga o node_modules)
npm run dev          # http://localhost:4321
npm run build        # gera o dist/ e informa "N páginas em Markdown"
```

Conteúdo novo: um arquivo `.md` em `src/content/<seção>/` (publication, teaching, talks, projects, extra). Os campos
de cada seção estão em `src/content.config.ts`. Documentos de uma palestra vão em `public/talks/<arquivo da palestra>/`.

## Publicando (Ploi)

1. Na Ploi, crie o site com o diretório web `public` e o repositório `anselmobattisti/site`, branch `publicado`.
2. Cole o `nginx-ploi.conf` em **Manage > NGINX configuration**, trocando `__USUARIO_PLOI__`. O arquivo do git é
   sempre do domínio principal: no staging, troque o domínio só na cópia colada na Ploi.
3. Staging: crie a senha por SSH (a senha é digitada, não aparece na tela nem no histórico):
   `printf 'cliente:%s\n' "$(openssl passwd -apr1)" > ~/.htpasswd-staging && chmod 640 ~/.htpasswd-staging`
4. No GitHub, crie o ambiente `producao` com o secret `PLOI_WEBHOOK_URL` (webhook de deploy da Ploi). A cada push na
   `main`, o Actions faz o build, grava o branch `publicado` e chama o webhook.
5. Ao publicar no domínio definitivo: tirar a senha e o `X-Robots-Tag` do `nginx-ploi.conf`.

O branch `publicado` só é gravado pelo Actions: nunca editar nem commitar nele à mão.
