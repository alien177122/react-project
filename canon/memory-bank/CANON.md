# Mac-wide canon pointer

**Общая база знаний (все проекты на Mac):** `~/.cursor/shared-knowledge/`

Ярлык на Desktop: `~/Desktop/_shared-knowledge/`

## Слои памяти (порядок для агентов)

1. **agentmemory** — primary (`memory_smart_search`, slug: `react-training-journal-split`)
2. **Shared canon** — `~/.cursor/shared-knowledge/style-guide.md`, `systemPatterns.md`
3. **Этот проект** — `memory-bank/style-guide.md`, `reference/*-standard.md` (project-specific, не перезаписывать)
4. **Symlink-слой** — `memory-bank/shared/` → Mac-wide файлы

## Файлы

| Путь | Роль |
|------|------|
| `~/.cursor/shared-knowledge/style-guide.md` | Общие design tokens, iPhone-first |
| `~/.cursor/shared-knowledge/systemPatterns.md` | Workflow, browser preview, memory layers |
| `memory-bank/style-guide.md` | **Project canon** (Training Journal, Calculator, Theory) |
| `memory-bank/reference/` | UI gold standards (`*-standard.md`) |
| `memory-bank/shared/` | Symlink на Mac-wide canon |

## Re-sync

```bash
~/.cursor/shared-knowledge/scripts/sync-memory-bank.sh ~/Desktop/React_Project_Журнал_Сплит
```

См. также: `SHARED-CANON.md` (авто-генерируется sync-скриптом).
