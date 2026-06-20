#!/usr/bin/env bash
# Scan local Cursor agent skills with NVIDIA SkillSpector (static analysis, no LLM).
# Install: clone https://github.com/NVIDIA/SkillSpector → ~/.local/tools/skillspector, make install (Python 3.12 venv).

set -euo pipefail

SKILLSPECTOR_BIN="${SKILLSPECTOR_BIN:-$HOME/.local/tools/skillspector/.venv/bin/skillspector}"
REPORT_DIR="${SKILLSPECTOR_REPORT_DIR:-$(cd "$(dirname "$0")/.." && pwd)/.skillspector-reports}"
FORMAT="${SKILLSPECTOR_FORMAT:-terminal}"
USE_LLM="${SKILLSPECTOR_LLM:-0}"

if [[ ! -x "$SKILLSPECTOR_BIN" ]]; then
  echo "SkillSpector not found at: $SKILLSPECTOR_BIN" >&2
  echo "Install: git clone https://github.com/NVIDIA/SkillSpector.git ~/.local/tools/skillspector" >&2
  echo "         cd ~/.local/tools/skillspector && uv venv .venv --python 3.12 && source .venv/bin/activate && make install" >&2
  exit 1
fi

mkdir -p "$REPORT_DIR"

scan() {
  local name="$1"
  local path="$2"
  if [[ ! -d "$path" ]]; then
    echo "Skip (missing): $path"
    return 0
  fi
  echo ""
  echo "=== $name ==="
  local args=(scan "$path")
  if [[ "$USE_LLM" != "1" ]]; then
    args+=(--no-llm)
  fi
  if [[ "$FORMAT" == "json" ]]; then
    args+=(--format json --output "$REPORT_DIR/${name}.json")
  fi
  "$SKILLSPECTOR_BIN" "${args[@]}"
}

scan "project-cursor-skills" "$(cd "$(dirname "$0")/.." && pwd)/.cursor/skills"
scan "user-cursor-skills" "$HOME/.cursor/skills"
scan "user-skills-cursor" "$HOME/.cursor/skills-cursor"

if [[ "$FORMAT" == "json" ]]; then
  echo ""
  echo "JSON reports: $REPORT_DIR"
fi
