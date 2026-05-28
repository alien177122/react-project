#!/bin/bash
# Extract CSS sections from app-components.css into modular files
# Usage: bash scripts/extract-css-modules.sh
set -euo pipefail

SRC="src/styles/components/app-components.css"
OUT_DIR="src/styles/components"
OUT="$OUT_DIR/_extracted"

mkdir -p "$OUT_DIR/auth" "$OUT_DIR/calculator" "$OUT_DIR/theory" "$OUT_DIR/training" "$OUT_DIR/shared"

# Map: start_line:end_line > output_file
# Lines come from section analysis:
#   HERO:        1-27     → shared/hero.css
#   INPUTS:      28-81    → shared/inputs.css
#   BUTTONS:     82-185   → shared/buttons.css
#   COMPLETE:    186-220  → training/complete-button.css
#   FILES:       221-308  → shared/files.css
#   INSIGHT:     309-330  → shared/insight.css
#   PROG TABLE:  331-361  → calculator/progression-table.css
#   VOLUME CLR:  362-371  → calculator/volume-colors.css
#   DELOAD:      372-374  → calculator/deload-row.css
#   NOTE BOX:    375-389  → shared/note-box.css
#   TRAIN DAY:   390-805  → training/training-day-card.css
#   PREMIUM IN:  806-934  → shared/premium-input.css
#   STEPPER:     935-1009 → shared/stepper.css
#   AUTH:        1010-1260→ auth/auth.css
#   EXERCISE SEL:1261-1538→ calculator/exercise-select.css
#   VOL BREAKDN: 1539-1982→ calculator/volume-breakdown.css
#   THEORY WEB:  1983-2522→ theory/theory-web.css
#   REST CARD:   2523-2612→ training/rest-card.css
#   MOTION:      2613-2687→ shared/motion-focus.css

declare -A MODULES
MODULES=(
  ["shared/hero.css"]="1,27"
  ["shared/inputs.css"]="28,81"
  ["shared/buttons.css"]="82,185"
  ["training/complete-button.css"]="186,220"
  ["shared/files.css"]="221,308"
  ["shared/insight.css"]="309,330"
  ["calculator/progression-table.css"]="331,361"
  ["calculator/volume-colors.css"]="362,374"
  ["shared/note-box.css"]="375,389"
  ["training/training-day-card.css"]="390,805"
  ["shared/premium-input.css"]="806,934"
  ["shared/stepper.css"]="935,1009"
  ["auth/auth.css"]="1010,1260"
  ["calculator/exercise-select.css"]="1261,1538"
  ["calculator/volume-breakdown.css"]="1539,1982"
  ["theory/theory-web.css"]="1983,2522"
  ["training/rest-card.css"]="2523,2612"
  ["shared/motion-focus.css"]="2613,2687"
)

for file in "${!MODULES[@]}"; do
  range="${MODULES[$file]}"
  start="${range%,*}"
  end="${range#*,}"
  target="$OUT_DIR/$file"
  mkdir -p "$(dirname "$target")"
  sed -n "${start},${end}p" "$SRC" > "$target"
  lines=$(wc -l < "$target")
  echo "  $file → $lines lines"
done

echo "Done: $(ls -la $OUT_DIR/shared/ $OUT_DIR/auth/ $OUT_DIR/calculator/ $OUT_DIR/theory/ $OUT_DIR/training/ 2>/dev/null | grep -c '\.css')"
