# Projects Registry — agentmemory slugs

Стабильные идентификаторы для `memory_smart_search`, `memory_save`, `memory_profile`.  
**Не использовать пути на диске** как project ID.  
**Обновлено:** 2026-07-28

| Slug | Путь на Desktop | Описание | Стек | Роль | Статус |
|------|-----------------|----------|------|------|--------|
| `health-gordienko` | `ДелоНавигатор/` | Личная медкарта: МРТ, травматолог, физио, чеки | Static HTML + Markdown | Health journal | 🟢 только здоровье |
| `delo-navigator` | `_archive/ДелоНавигатор_юридика_2026-08-08/` | *(архив)* Защита потерпевшего, пакеты в полицию | HTML + evidence legal | Legal archive | 📦 08.08.2026 |
| `react-training-journal-split` | `01_React_Продукт/React_Project_Журнал_Сплит/` | Training Calculator — силовая периодизация, журнал, сплит, теория | React 19, Vite 7, TS 5.9, Express 5, SQLite, Capacitor 7, Electron 41, Expo 54 | **Основной проект**, Design reference · Store=Expo+EAS | 🟢 Активен |
| `geron-redesign-shell` | `geron-redesign-shell/` | Редизайн geron.kz — gold standard exemplar | React 19, Vite 6.3, TS 5.8, vanilla CSS, port 5181 | **Exemplar** · `apple-shell-original-colors` | ✅ v1.0.0 Завершён |
| `kit-redesign-shell` | `kit-redesign-shell/` | Редизайн kit.edu.kz — КИТ Колледж | React 19, Vite 6.3, TS 5.8, vanilla CSS, port 5182 | **Sub-project** (geron pattern) | ✅ v1.0.0 Завершён |
| `massage-html-project` | `MassageHTML_PROJECT/` | Массажная терапия — лекции, клиенты, Janda UCS анализ | React 19, Vite 6, TS 5.8, Puppeteer | Контент-платформа | 🟡 v0.2.0 Активен |
| `tunnel-control` | `Tunnel-Control/` | macOS menubar Electron app — Docker + cloudflared tunnel | Electron 41, React 19, Vite 7, TS 5.9, Tailwind 3 | Утилита (для Training Calculator) | 🟢 v0.3.0 Функционален |
| `open-seo` | `open-seo/` | **SEO MCP server** + Agent Skills (`seo-coach`, keyword-research, …); web-app — оболочка | MCP `@modelcontextprotocol/sdk`, CF Workers OAuth, DataForSEO; hosted `https://app.openseo.so/mcp` | **MCP для Cursor/Claude** · SEO coach | 📦 v0.0.21 · MCP подключён |
| `diagnostoz` | `Диагнозноз/` | Диагноз + лечение: OBD2/Launch, кейсы, методология ремонта | Markdown + wiki-links | Wiki / Knowledge base | 🟢 миграция с DiagnostAuto |
| `diagnost-auto` | `03_Автодиагностика/DiagnostAuto/` | *(архив)* Автодиагностика — см. `Диагнозноз/` | Markdown | Wiki | 📦 архив |
| `government-grants-education` | `government_grants_education/` | Гос. программы обучения (РФ, КЗ) | Markdown + PDF | Справочник | ✅ Завершён |
| `awesome-osint-arsenal` | `awesome-osint-arsenal/` | OSINT/security toolkit, 751+ инструментов | Bash, HTML dashboard, JSON (398KB) | Клонирован | 📦 v2.1 |
| `md-watcher` | `AI_Shared_Memory/` | File → Markdown конвертер (markitdown) | Python 3, Bash | Утилита | 🟢 Работает |
| `mac-shared-knowledge` | `~/.cursor/shared-knowledge/` | Mac-wide design canon + toolchain | Markdown, Bash scripts | **Cross-project** SOT | 🟢 Актуален |
---

## geron-redesign-shell — полные metadata (эталон)

| Поле | Значение |
|------|----------|
| `slug` | `geron-redesign-shell` |
| `path` | `~/Desktop/geron-redesign-shell/` |
| `source_url` | `https://geron.kz` |
| `brand_accent` | `#8248a2` → `--color-accent` |
| `dev_url` | `http://localhost:5181` |
| `design_source` | `react-training-journal-split` (read-only) |
| `pattern` | `apple-shell-original-colors` |
| `pipeline` | `A+B+C+D+E` |
| `media_optimized` | `n/a` (нет крупных видео в public) |
| `presentation_video` | `geron-redesign-presentation.mp4` (корень проекта) |
| `presentation_script` | `scripts/generate-presentation-video.mjs` |
| `compress_script` | `~/.cursor/shared-knowledge/scripts/compress-videos.sh` |
| `sync_script` | `~/.cursor/shared-knowledge/scripts/sync-memory-bank.sh` |
| `exemplar_docs` | `~/.cursor/shared-knowledge/exemplars/geron-redesign.md` |
| `checklist` | `~/.cursor/shared-knowledge/exemplars/geron-redesign-CHECKLIST.md` |
| `work_lines` | `~/.cursor/shared-knowledge/exemplars/WORK-LINES.md` |
| `user_approval` | 2026-06-21 — канон для всех будущих редизайнов |
| `handoff_zip` | `geron-redesign-shell-handoff.zip` (см. `docs/HANDOFF.md`) |

**Ключевые скрипты проекта:**

```bash
npm run dev          # preview :5181
npm run build        # dist/
npm run test         # Vitest smoke
node scripts/generate-presentation-video.mjs  # Pipeline E, dev на :5181
```

---

## kit-redesign-shell — metadata

| Поле | Значение |
|------|----------|
| `slug` | `kit-redesign-shell` |
| `path` | `~/Desktop/kit-redesign-shell/` |
| `source_url` | `https://kit.edu.kz/ru/main` |
| `brand_accent` | `#eaa360` → `--color-accent` |
| `dev_url` | `http://localhost:5182` |
| `design_source` | `geron-redesign-shell` (pattern clone) |
| `pattern` | `apple-shell-original-colors` |
| `handoff_docs` | `docs/HANDOFF.md`, `docs/ПИСЬМО-КЛИЕНТУ/`, `docs/TOOLS-GITHUB.md` |

---

## react-training-journal-split — metadata

| Поле | Значение |
|------|----------|
| `slug` | `react-training-journal-split` |
| `path` | `~/Desktop/01_React_Продукт/React_Project_Журнал_Сплит/` |
| `app_id` | `com.stevegordiyenko.trainingcalculator` |
| `dev_url` | `http://localhost:5173` (Vite) + `http://localhost:3002` (API proxy) |
| `api_port` | 3001 (Express server) |
| `docker_port` | 51330 |
| `db` | SQLite `gym.db` (1 table: `users` with JSON data blob) |
| `platforms` | Web, iOS (Capacitor), Android (Capacitor), macOS (Electron), RN (Expo) |
| `deploy` | Vercel (static), Docker (full stack), Cloudflare Tunnels (public) |
| `ci` | GitHub Actions (android-apk.yml) |
| `design_philosophy` | Apple/Linear/Stripe inspired, Anti-AI-slop, 4px grid |
| `performance` | FCP < 1.5s, CLS < 0.05, main chunk < 200kb gzip |
| `memory_bank` | v0.8, 9 файлов + reference/ каталог |
| `tabs` | Calculator (2.0), Calculator V3 (3.0), Training, Journal, Split Constructor, Theory |

---

## Template fields (новый сайт)

| Поле | Пример | Обязательно |
|------|--------|-------------|
| `slug` | `client-redesign-shell` | kebab-case, уникальный |
| `path` | `~/Desktop/client-redesign-shell/` | на Desktop |
| `source_url` | `https://example.com` | Pipeline A |
| `brand_accent` | `#8248a2` | с оригинала → `--color-accent` |
| `dev_url` | `http://localhost:5173` | Vite preview |
| `design_source` | `react-training-journal-split` | design-list canon |
| `pattern` | `apple-shell-original-colors` | как geron |
| `pipeline` | `A+B+C+D+E` | см. `TOOLCHAIN.md` |
| `media_optimized` | `yes` / `no` / `n/a` | Pipeline D |
| `presentation_video` | `client-presentation.mp4` | Pipeline E (опционально) |
| `exemplar_ref` | `geron-redesign-shell` | structural template |

---

## Добавление нового проекта

1. Создать репозиторий на `~/Desktop/<name>/`
2. Slug kebab-case → строка в таблице выше
3. Прочитать `exemplars/geron-redesign-CHECKLIST.md`
4. Пройти `templates/project-bootstrap.md` (фазы 0–6)
5. ```bash
   ~/.cursor/shared-knowledge/scripts/sync-memory-bank.sh ~/Desktop/<name>
   ```
6. `memory_save` type `architecture`: slug, stack, brand_accent, pattern
7. Опционально: `.cursor/rules/<slug>-memory.mdc`

---

## Cross-project recall

| Задача | Где искать |
|--------|------------|
| Design canon | `design-list.md`, `TOOLCHAIN.md`, concepts `design-canon` |
| Design scan source | slug `react-training-journal-split` |
| Site redesign gold standard | [`exemplars/geron-redesign.md`](exemplars/geron-redesign.md), slug `geron-redesign-shell` |
| Work lines checklist | [`exemplars/WORK-LINES.md`](exemplars/WORK-LINES.md) |
| Training Calculator доступ | slug `tunnel-control` (Docker + cloudflared) |
| Массажная терапия | slug `massage-html-project` (Janda UCS модель) |
| Авто-диагностика | slug `diagnost-auto` (6 case studies, OBD2/Launch) |
| SEO MCP + coach | slug `open-seo` — MCP `https://app.openseo.so/mcp`, skills `/seo-coach`, DataForSEO BYO key |
| OSINT утилиты | slug `awesome-osint-arsenal` (751+ tools) |
| Файл → Markdown | slug `md-watcher` (Python markitdown) |
| Гос. гранты обучения | slug `government-grants-education` (РФ, КЗ) |
| `memory_mesh_sync` | sync между peer agentmemory |
| `memory_team_share` | расшарить memory команде |

---

## Данные и медиа (не проекты)

| Каталог | Описание |
|---------|----------|
| `~/Desktop/data/` | agentmemory persistent storage (state_store.db/) |
| `~/Desktop/DCIM/` | Дамп фотографий с камеры (~47 фото + 1 видео, ~110MB) |
| `~/Desktop/Muscle/` | Медиа для массажного/фитнес-контента (GUIA_DOS.pdf 30MB, фото, видео) |
| `~/Desktop/S05/` | Медиа — Rick and Morty S05 (10 эпизодов .mkv) |
| `~/Desktop/Serial/` | Пустая директория |
