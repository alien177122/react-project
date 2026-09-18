# System Patterns — общий канон (Mac-wide)

Архитектурные и workflow-паттерны для **всех** проектов. Специфика стека — в `<project>/memory-bank/systemPatterns.md`.

## Слои памяти (порядок чтения)

```
1. agentmemory (MCP)     — primary, живой контекст, search/graph/sessions
2. ~/.cursor/shared-knowledge/  — Mac-wide канон (style, patterns, registry)
3. <project>/memory-bank/       — проектный backup + phase artifacts + reference standards
4. ~/.cursor/rules/             — статичные инварианты (alwaysApply gates)
```

| Слой | Путь | Роль |
|------|------|------|
| **agentmemory** | MCP `user-agentmemory`, `http://localhost:3111` | Primary recall; `memory_smart_search` перед задачей |
| **shared-knowledge** | `~/.cursor/shared-knowledge/` | Общий design + workflow канон |
| **memory-bank/** | В корне проекта | Backup, `/van`…`/archive`, project-specific standards |
| **.cursor/rules/** | User + project rules | Lint, a11y, gates — не замена agentmemory |

## agentmemory — cross-project

- **Project slug** — стабильный ID (см. `projects-registry.md`), не путь на диске
- Перед задачей: `memory_smart_search` с slug **текущего** проекта
- Cross-project recall: `memory_recall`, `memory_graph_query`, `memory_mesh_sync` (push/pull peers)
- Общие решения (design canon, Mac-wide arch): `memory_save` + `memory_team_share` (itemType: `memory`)
- Handoff: `memory_profile` / session skills `/handoff` при пустом контексте

## Design standards workflow (универсальный)

```
Новая UI-задача
  → ~/.cursor/shared-knowledge/style-guide.md (tokens, iPhone-first)
  → <project>/memory-bank/reference/README.md (если есть)
  → matching *-standard.md или project rule
  → /build с наследованием паттерна
  → превью cursor-ide-browser (390–430px)
```

| Шаг | Обязательство |
|-----|---------------|
| До новой секции UI | Прочитать shared + project reference; не layout «с нуля» |
| Implementation | Hook + parts + co-located CSS; tokens/spacing/a11y из канона |
| Новый gold standard | `<project>/memory-bank/reference/<feature>-standard.md` + README index |
| Точечный багфикс | Reference как контекст, без смены паттерна |

## Архитектура (рекомендуемые паттерны)

- **Thin UI** — бизнес-логика в shared package / hooks / pure utils
- **Discriminated unions** для async/UI state
- **URL as state** — табы, модалки via query params (где уместно)
- **Component size** — ≤150 lines
- **Security** — no secrets in logs; server-side auth; normalized API errors

## Browser preview (agent workflow)

- **Только embedded Cursor browser** — MCP `cursor-ide-browser`
- Flow: `browser_tabs` → `browser_navigate` → `browser_lock` → interact → `browser_unlock`
- Default dev URL: `http://localhost:5173` (Vite) — уточнять в project README
- **Запрещено для UI preview:** shell `open`, `xdg-open`, `start` с http/localhost

## Memory Bank phase workflow

- Complexity L1–L4 → глубина `/van` … `/archive` (см. project isolation rules)
- **Always** read shared-knowledge + project `memory-bank/` перед задачей
- Update `tasks.md` + `progress.md` в build/reflect/archive (project-local)
- `cursor-memory-bank-main/` — upstream reference only, не канон

## Sync shared → project

```bash
~/.cursor/shared-knowledge/scripts/sync-memory-bank.sh /path/to/project
```

Создаёт `memory-bank/shared/` с symlink на Mac-wide canon; не перезаписывает project-specific файлы.
