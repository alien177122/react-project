#!/usr/bin/env bash
# Restarts `npm run dev` when it exits (e.g. closed terminal). Run in background:
#   nohup ./scripts/dev-keepalive.sh &
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
mkdir -p .logs
LOG=".logs/dev-keepalive.log"
while true; do
  echo "$(date -u +%Y-%m-%dT%H:%M:%SZ) starting npm run dev" >> "$LOG"
  npm run dev >> .logs/dev-nohup.log 2>&1
  echo "$(date -u +%Y-%m-%dT%H:%M:%SZ) dev exited, restart in 3s" >> "$LOG"
  sleep 3
done
