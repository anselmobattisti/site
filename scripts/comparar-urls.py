#!/usr/bin/env python3
"""Compara os endereços do site antigo com o site novo, para nenhum link indexado quebrar na migração.

Junta os endereços do Internet Archive, dos sitemaps do site antigo e, se houver, de uma lista extra (a exportação de
páginas do Search Console, uma URL por linha). Segue cada um até o destino final nos dois sites e lista o que responde
200 no antigo e não responde 200 no novo. Sai com erro (1) se algo quebrar.

Testar com o nginx de verdade (Docker, como no CLAUDE.md), porque os 301 ficam nele; `php -S` não os aplica.

Uso:
  python3 -I scripts/comparar-urls.py --antigo https://empresa.com.br --novo http://127.0.0.1:8098 \\
      [--usuario teste:senha] [--extra urls.txt] [--pausa 0.15]

Imagens e arquivos internos do WordPress ficam de fora (/wp-content/, /wp-includes/, /wp-json/, /wp-admin/).
"""
import argparse
import base64
import json
import re
import sys
import time
import urllib.error
import urllib.request
from urllib.parse import quote, urlsplit

AGENTE = {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) Chrome/120 Safari/537.36'}
IGNORADOS = ('/wp-content', '/wp-includes', '/wp-json', '/wp-admin', '/wp-login', '/xmlrpc')
REDIRECIONAMENTOS = (301, 302, 303, 307, 308)


class SemRedirecionar(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *args, **kwargs):
        return None


abridor = urllib.request.build_opener(SemRedirecionar)


def caminho(url):
    partes = urlsplit(url.strip())
    return (partes.path or '/') + (f'?{partes.query}' if partes.query else '')


def baixar(url, tempo=60):
    pedido = urllib.request.Request(url, headers=AGENTE)
    with urllib.request.urlopen(pedido, timeout=tempo) as resposta:
        return resposta.read().decode('utf-8', 'replace')


def do_archive(dominio):
    url = f'https://web.archive.org/cdx/search/cdx?url={dominio}*&output=json&fl=original&collapse=urlkey'
    for tentativa in range(3):
        try:
            return {caminho(linha[0]) for linha in json.loads(baixar(url, 90))[1:]}
        except (OSError, ValueError) as erro:
            print(f'Internet Archive indisponível ({erro}); tentativa {tentativa + 1} de 3', file=sys.stderr)
            time.sleep(15)
    print('AVISO: sem os endereços do Internet Archive. Rode de novo mais tarde.', file=sys.stderr)
    return set()


def dos_sitemaps(base):
    achados, fila, vistos = set(), [f'{base}/sitemap.xml', f'{base}/sitemap_index.xml', f'{base}/wp-sitemap.xml'], set()
    while fila:
        mapa = fila.pop()
        if mapa in vistos:
            continue
        vistos.add(mapa)
        achados.add(caminho(mapa))
        try:
            texto = baixar(mapa, 25)
        except OSError:
            continue
        for url in re.findall(r'<loc>\s*([^<\s]+)', texto):
            if url.split('?')[0].endswith('.xml'):
                fila.append(url)
            elif not re.search(r'\.(png|jpe?g|webp|gif|svg)$', url, re.I):
                achados.add(caminho(url))
    return achados


def destino(base, inicio, cabecalhos):
    """Segue os redirecionamentos e devolve (status final, caminho final, número de saltos)."""
    atual, saltos = inicio, 0
    for _ in range(8):
        pedido = urllib.request.Request(base + quote(atual, safe="/?=&%:{}+,;~"), headers=cabecalhos)
        try:
            status, local = abridor.open(pedido, timeout=25).status, ''
        except urllib.error.HTTPError as erro:
            status, local = erro.code, erro.headers.get('Location', '')
        except OSError as erro:
            return f'erro: {erro}', atual, saltos
        if status not in REDIRECIONAMENTOS:
            return status, atual, saltos
        saltos += 1
        atual = re.sub(r'^https?://[^/]*', '', local).split('#')[0] or '/'
    return 'laço de redirecionamentos', atual, saltos


def main():
    opcoes = argparse.ArgumentParser(description='Compara os endereços do site antigo com o novo.')
    opcoes.add_argument('--antigo', required=True, help='site antigo, com https://')
    opcoes.add_argument('--novo', required=True, help='site novo (ex.: nginx em Docker, http://127.0.0.1:8098)')
    opcoes.add_argument('--usuario', help='usuário:senha do staging (Basic Auth)')
    opcoes.add_argument('--extra', help='arquivo com mais URLs, uma por linha (ex.: exportação do Search Console)')
    opcoes.add_argument('--pausa', type=float, default=0.15, help='pausa entre os pedidos ao site antigo, em segundos')
    args = opcoes.parse_args()

    antigo, novo = args.antigo.rstrip('/'), args.novo.rstrip('/')
    urls = do_archive(re.sub(r'^www\.', '', urlsplit(antigo).netloc)) | dos_sitemaps(antigo) | {'/'}
    if args.extra:
        with open(args.extra, encoding='utf-8') as arquivo:
            urls |= {caminho(linha) for linha in arquivo if linha.strip()}
    urls = sorted(u for u in urls if not u.startswith(IGNORADOS))
    print(f'{len(urls)} endereços para comparar')

    cabecalhos_novo = dict(AGENTE)
    if args.usuario:
        cabecalhos_novo['Authorization'] = 'Basic ' + base64.b64encode(args.usuario.encode()).decode()

    quebram, com_destino_diferente, cadeias = [], [], []
    for url in urls:
        s_antigo, fim_antigo, _ = destino(antigo, url, AGENTE)
        s_novo, fim_novo, saltos = destino(novo, url, cabecalhos_novo)
        time.sleep(args.pausa)
        if s_antigo == 200 and s_novo != 200:
            quebram.append((url, fim_antigo, s_novo, fim_novo))
        elif s_antigo == 200 and fim_antigo.rstrip('/') != fim_novo.rstrip('/'):
            com_destino_diferente.append((url, fim_antigo, fim_novo))
        if saltos > 1:
            cadeias.append((url, saltos))

    print(f'\nQUEBRAM (200 no antigo, outro status no novo): {len(quebram)}')
    for url, fim_antigo, status, fim_novo in quebram:
        print(f'  {url}  antigo: {fim_antigo}  novo: {status} em {fim_novo}')
    print(f'\nDestino diferente do antigo (conferir se faz sentido): {len(com_destino_diferente)}')
    for url, fim_antigo, fim_novo in com_destino_diferente:
        print(f'  {url}  antigo: {fim_antigo}  novo: {fim_novo}')
    print(f'\nMais de um redirecionamento seguido: {len(cadeias)}')
    for url, saltos in cadeias:
        print(f'  {url} ({saltos} saltos)')
    return 1 if quebram else 0


if __name__ == '__main__':
    sys.exit(main())
