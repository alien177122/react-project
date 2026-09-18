# Hallmark + agentmemory

> **Primary:** agentmemory (`react-training-journal-split`) · **Backup:** этот файл  
> **Hallmark project log:** `.hallmark/log.json` (создаётся при первом page-run)

## Установка (глобально, 2026-06-04)

- Skill: `~/.cursor/skills/hallmark/`
- Rule: `~/.cursor/rules/hallmark-design.mdc`
- Вызов: `@hallmark` или «hallmark redesign …»

## Три слоя памяти

| Слой | Роль |
|------|------|
| agentmemory | Решения, темы, anti-slop предпочтения — `memory_smart_search` / `memory_save` |
| memory-bank/ | Git-friendly снимки, reference |
| `.hallmark/log.json` | Ротация macrostructure / theme / nav / footer внутри проекта |

Hallmark **не** заменяет agentmemory и **не** пишет в Cursor Memories автоматически.
