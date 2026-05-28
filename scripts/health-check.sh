#!/bin/bash
# health-check.sh — проверяет, что Vite dev и Express API работают
VITE_URL="http://localhost:5173"
API_URL="http://localhost:3001/api/health"
PROJECT_DIR="$HOME/Desktop/React_Project"
LOG_FILE="$PROJECT_DIR/.health-check.log"
ISSUES=""

VITE_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$VITE_URL" 2>/dev/null)
if [ "$VITE_STATUS" != "200" ]; then
  ISSUES+="❌ Vite (port 5173): HTTP $VITE_STATUS\n"
else
  ISSUES+="✅ Vite (port 5173): HTTP 200 OK\n"
fi

API_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL" 2>/dev/null)
if [ "$API_STATUS" != "200" ]; then
  ISSUES+="❌ API (port 3001): HTTP $API_STATUS\n"
else
  ISSUES+="✅ API (port 3001): HTTP 200 OK\n"
fi

VITE_COUNT=$(lsof -i :5173 -sTCP:LISTEN 2>/dev/null | grep -c "node")
if [ "$VITE_COUNT" -gt 1 ]; then
  ISSUES+="⚠️ Vite: $VITE_COUNT процессов на порту 5173 (дублирование!)\n"
fi

API_COUNT=$(lsof -i :3001 -sTCP:LISTEN 2>/dev/null | grep -c "node")
if [ "$API_COUNT" -gt 1 ]; then
  ISSUES+="⚠️ API: $API_COUNT процессов на порту 3001 (дублирование!)\n"
fi

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Health check:" >> "$LOG_FILE"
echo -e "$ISSUES" >> "$LOG_FILE"
echo "---" >> "$LOG_FILE"

echo -e "$ISSUES"

if echo -e "$ISSUES" | grep -q "❌\|⚠️"; then
  exit 1
fi
exit 0
