#!/usr/bin/env bash
# Captura de tela de uma página com o Chrome headless, no computador e no celular.
# Uso: scripts/captura.sh <url> [nome]   →  tmp/<nome>-computador.png e tmp/<nome>-celular.png
# Ex.: npm run build && (php -S 127.0.0.1:8099 -t dist >/dev/null 2>&1 &) && scripts/captura.sh http://127.0.0.1:8099/ home
# Depois, encerrar o PHP: ps aux | grep "php -S 127.0.0.1:8099" | grep -v grep | awk '{print $2}' | xargs -r kill
set -euo pipefail
url="${1:?informe a URL}"
nome="${2:-pagina}"
chrome="$(command -v google-chrome || command -v chromium || command -v chromium-browser)"
mkdir -p tmp
"$chrome" --headless=new --disable-gpu --hide-scrollbars --virtual-time-budget=3000 --window-size=1440,2400 \
  --screenshot="tmp/$nome-computador.png" "$url" 2>/dev/null
"$chrome" --headless=new --disable-gpu --hide-scrollbars --virtual-time-budget=3000 --window-size=390,2400 \
  --user-agent="Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148" \
  --screenshot="tmp/$nome-celular.png" "$url" 2>/dev/null
echo "tmp/$nome-computador.png e tmp/$nome-celular.png"
