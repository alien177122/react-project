#!/usr/bin/env bash
# After a session: bump micro-version + NOTES + source.tar.gz + optional Venus/LAN serve.
# Usage:
#   scripts/release-pack-lan.sh              # pack + copy to MacVenus_Bridge if mounted
#   scripts/release-pack-lan.sh --serve      # also HTTP serve releases/ on :8765
#   scripts/release-pack-lan.sh --no-venus   # skip bridge copy
set -euo pipefail

REPO="$(cd "$(dirname "$0")/.." && pwd)"
DATE="$(date +%Y-%m-%d)"
BRIDGE="${HOME}/Desktop/MacVenus_Bridge"
VER_ROOT="${BRIDGE}/React_Project_Versions"
LOCAL_MIRROR="${HOME}/Desktop/MacVenus_Bridge_local_20260803/React_Project_Versions"
DO_VENUS=1
DO_SERVE=0
PORT=8765

for arg in "$@"; do
  case "$arg" in
    --no-venus) DO_VENUS=0 ;;
    --serve) DO_SERVE=1 ;;
    --port=*) PORT="${arg#--port=}" ;;
  esac
done

# Next micro-bump from VERSIONS.md (prefer live bridge, else local mirror, else 0.001)
next_ver() {
  local src=""
  if [[ -f "${VER_ROOT}/VERSIONS.md" ]]; then src="${VER_ROOT}/VERSIONS.md"
  elif [[ -f "${LOCAL_MIRROR}/VERSIONS.md" ]]; then src="${LOCAL_MIRROR}/VERSIONS.md"
  elif [[ -f "${REPO}/releases/VERSIONS.md" ]]; then src="${REPO}/releases/VERSIONS.md"
  fi
  local last="0"
  if [[ -n "$src" ]]; then
    last="$(grep -Eo 'v0\.[0-9]{3}' "$src" | sed 's/v0\.//' | sort -n | tail -1 || echo 0)"
  fi
  last="${last:-0}"
  last=$((10#$last + 1))
  printf '0.%03d' "$last"
}

VER="$(next_ver)"
# package.json patch: 0.00N → 0.0.N (semver)
PKG_VER="0.0.$((10#${VER#0.}))"
NAME="React_Project_${DATE}_v${VER}"
OUT="${REPO}/releases/${NAME}"
mkdir -p "$OUT"

# Bump root package.json version (no commit)
if command -v node >/dev/null 2>&1; then
  node -e "
    const fs=require('fs');
    const p='${REPO}/package.json';
    const j=JSON.parse(fs.readFileSync(p,'utf8'));
    j.version='${PKG_VER}';
    fs.writeFileSync(p, JSON.stringify(j,null,2)+'\n');
  "
fi

cat > "${OUT}/NOTES.md" << EOF
# ${NAME}

| Поле | Значение |
|------|----------|
| **Версия** | v${VER} (\`package.json\` → \`${PKG_VER}\`) |
| **Дата** | ${DATE} |
| **Источник Mac** | \`${REPO}\` |
| **Архив** | \`source.tar.gz\` — без \`.git\` / node_modules / \`.env\` / \`*.db\` / тяжёлых media |

## Мини-лог

- **Web-only облегчённая сборка** (\`refactor/bundle-optimization\`): JS entry gzip ~90 kB (было ~414 kB), CSS ~37 kB, lazy tabs, без Ionic/Capacitor в root.
- Тесты: 247/247, quality:quick PASS, Playwright smoke 4/4 (см. \`BASELINE.md\`).
- Скрипты обновления с сохранением туннеля: \`apply-update-preserve-tunnel.sh\` / \`.ps1\`.

## Обновление без потери туннеля (Tailscale)

См. \`UPDATE-TAILSCALE.md\` в этой папке.

Кратко (Windows Venus):

\`\`\`powershell
# 1) С Mac скачать пакет по Tailscale (Mac IP: tailscale ip -4)
scp stevengord@100.x.x.x:~/Desktop/React/releases/${NAME}/source.tar.gz .

# 2) Применить (архивирует старую папку, сохраняет .env.public + gym.db)
powershell -ExecutionPolicy Bypass -File apply-update-preserve-tunnel.ps1 -Archive .\\source.tar.gz

# 3) Перезапустить public (тот же CLOUDFLARE_TUNNEL_TOKEN)
cd %USERPROFILE%\\Desktop\\React_Project
npm run public:stable
\`\`\`

## Установка с нуля

\`\`\`bash
tar -xzf source.tar.gz
cd React_Project_*
npm install && npm run server & npm run dev
\`\`\`
EOF

PARENT="$(dirname "$REPO")"
BASENAME="$(basename "$REPO")"
ARCHIVE="${OUT}/source.tar.gz"

(
  cd "$PARENT"
  tar -czf "$ARCHIVE" \
    --exclude='node_modules' \
    --exclude='*/node_modules' \
    --exclude='.git' \
    --exclude='dist' \
    --exclude='build' \
    --exclude='.vite' \
    --exclude='.expo' \
    --exclude='.turbo' \
    --exclude='coverage' \
    --exclude='.env' \
    --exclude='.env.local' \
    --exclude='.env.docker' \
    --exclude='.env.capacitor' \
    --exclude='*.db' \
    --exclude='gym.db' \
    --exclude='**/Pods' \
    --exclude='**/.gradle' \
    --exclude='android/app/build' \
    --exclude='*.wav' \
    --exclude='*.mp3' \
    --exclude='audit/*.png' \
    --exclude='audit/*.pdf' \
    --exclude='audit/yeti-volume-transcript' \
    --exclude='journal_*.png' \
    --exclude='data/state_store.db' \
    --exclude='releases' \
    --exclude='.DS_Store' \
    --exclude='*.log' \
    "$BASENAME"
)

# Registry
mkdir -p "${REPO}/releases"
REG="${REPO}/releases/VERSIONS.md"
if [[ ! -f "$REG" ]]; then
  cat > "$REG" << EOF
# React Project — лента версий (micro-bump)

| Версия | Дата | Кратко | Файл |
|--------|------|--------|------|
EOF
fi
printf '| v%s | %s | session pack | `%s/source.tar.gz` |\n' "$VER" "$DATE" "$NAME" >> "$REG"

# Update helpers (same folder as tarball)
cp "${REPO}/scripts/apply-update-preserve-tunnel.sh" "${OUT}/"
cp "${REPO}/scripts/apply-update-preserve-tunnel.ps1" "${OUT}/"
cp "${REPO}/docs/UPDATE-TAILSCALE.md" "${OUT}/"
chmod +x "${OUT}/apply-update-preserve-tunnel.sh"

SIZE="$(du -h "$ARCHIVE" | awk '{print $1}')"
echo "Packed: $ARCHIVE ($SIZE)"

# Venus SMB
if [[ "$DO_VENUS" -eq 1 ]]; then
  if [[ ! -d "$BRIDGE" ]] || [[ -z "$(ls -A "$BRIDGE" 2>/dev/null || true)" ]]; then
    if [[ -x "${HOME}/mnt/remount-MacVenus_Bridge.sh" ]]; then
      zsh "${HOME}/mnt/remount-MacVenus_Bridge.sh" || true
    fi
  fi
  if [[ -d "$BRIDGE" ]] && [[ -w "$BRIDGE" ]] && ls "$BRIDGE" >/dev/null 2>&1; then
    mkdir -p "${VER_ROOT}/${NAME}"
    cp "${OUT}/NOTES.md" "${VER_ROOT}/${NAME}/NOTES.md"
    rsync -ah "${ARCHIVE}" "${VER_ROOT}/${NAME}/source.tar.gz"
    if [[ -f "${VER_ROOT}/VERSIONS.md" ]]; then
      grep -q "v${VER}" "${VER_ROOT}/VERSIONS.md" || \
        printf '| v%s | %s | session pack | `%s/source.tar.gz` |\n' "$VER" "$DATE" "$NAME" >> "${VER_ROOT}/VERSIONS.md"
    else
      cp "$REG" "${VER_ROOT}/VERSIONS.md"
    fi
    mkdir -p "${BRIDGE}/inbox"
    cat > "${BRIDGE}/inbox/TASK-${DATE}-react-v${VER}.md" << EOF
# TASK: принять React_Project v${VER}
Пакет: \`F:\\\\MacVenus_Bridge\\\\React_Project_Versions\\\\${NAME}\\\\\`
Распаковать source.tar.gz → npm install → npm run dev
EOF
    echo "Venus: ${VER_ROOT}/${NAME}"
    echo "Venus path (Windows): F:\\MacVenus_Bridge\\React_Project_Versions\\${NAME}\\"
  else
    echo "WARN: MacVenus_Bridge недоступен — только локальный releases/. Remount: zsh ~/mnt/remount-MacVenus_Bridge.sh"
  fi
fi

LAN_IP="$(ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null || echo '127.0.0.1')"
echo "LAN IP: ${LAN_IP}"
echo "Local:  ${OUT}"

if [[ "$DO_SERVE" -eq 1 ]]; then
  echo "HTTP: http://${LAN_IP}:${PORT}/releases/${NAME}/source.tar.gz"
  echo "Stop: Ctrl+C (или kill по порту ${PORT})"
  cd "$REPO"
  exec python3 -m http.server "$PORT" --bind 0.0.0.0
fi
