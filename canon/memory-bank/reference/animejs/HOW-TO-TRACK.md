# Anime.js — как отслеживать структуру банка

> **Primary (живая память):** agentmemory MCP, project `react-training-journal-split`  
> **Backup (git, diff, офлайн):** `memory-bank/reference/animejs/`

---

## 1. Три слоя (приоритет для агента)

| Слой                     | Путь / инструмент                                                               | Что внутри                                             | Когда открывать                            |
| ------------------------ | ------------------------------------------------------------------------------- | ------------------------------------------------------ | ------------------------------------------ |
| **A. agentmemory**       | `memory_smart_search` → concepts: `animejs`, `createTimer`, `useAnimeScope`     | Реализации, алгоритмы, решения «что не переносим»      | **Первым** перед любой задачей с анимацией |
| **B. usage + алгоритмы** | `USAGE-INDEX.md` → `usage/<module>.md` + `ALGORITHMS.md` + `IMPLEMENTATIONS.md` | Factory → settings → callbacks → methods → React steps | Кодинг: точные сниппеты и шаблон           |
| **C. offline mirror**    | `offline/pages/<section>/` (410 стр.)                                           | Дословный текст docs animejs.com                       | Уточнение одного параметра API             |

**Не путать:** `SITEMAP.md` / `timer.md` — только **дерево URL**; канон реализации — **B**, не C.

---

## 2. Карта модулей (15 секций → файлы)

```
README.md          — вход, subpath imports, constraints проекта
USAGE-INDEX.md     — дерево «нужно X → API»
usage/*.md         — как реализовать (приоритет)
ALGORITHMS.md      — engine tick, stagger, timeline, timer §8
IMPLEMENTATIONS.md — R1–R9 по экранам (Journal, Calculator…)
PROJECT-MAPPING.md — module → component
SITEMAP.md         — 410 URL (справочник)
offline/           — зеркало страниц (npm run docs:animejs:mirror)
```

**Timer (32 стр. docs):**

| Нужно                | Файл                   |
| -------------------- | ---------------------- |
| Реализация + React   | `usage/timer.md`       |
| Алгоритм engine tick | `ALGORITHMS.md` §8     |
| Список URL           | `timer.md`             |
| Полный текст страниц | `offline/pages/timer/` |

---

## 3. agentmemory — поиск и просмотр

**Поиск перед задачей:**

```
memory_smart_search query="animejs timer createTimer" limit=10
```

**Типичные concepts (теги):**

- `animejs-bank-structure` — карта слоёв A/B/C
- `animejs-createTimer` — timer API + алгоритм + React
- `animejs-useAnimeScope` — scope + revert + reduced motion
- `animejs-algorithms` — stagger, timeline, engine
- `animejs-implementations` — Journal chart, rollout R1–R9

**Viewer:** http://localhost:3113 (если agentmemory запущен)

**Экспорт на диск:** `memory_export` (опционально) — не заменяет `memory-bank/`.

---

## 4. Единый шаблон API (все модули)

См. `USAGE-INDEX.md` § «Единый шаблон»:

1. Import (`animejs/timer`, …)
2. Factory (`createTimer`, `animate`, …)
3. Playback settings
4. Callbacks
5. Methods (`revert()` обязателен в React cleanup)
6. Compose (timeline.add / sync)
7. React (`useAnimeScope`, `useReducedMotion`)
8. Cleanup

---

## 5. Обновление банка

| Событие                     | Действие                                                                     |
| --------------------------- | ---------------------------------------------------------------------------- |
| Новый API в проекте         | `usage/<module>.md` + `memory_save` + при необходимости `IMPLEMENTATIONS.md` |
| Обновление docs animejs.com | `npm run docs:animejs:mirror` → `offline/`                                   |
| Золотой рецепт на экране    | `IMPLEMENTATIONS.md` + `memory_save` type=pattern                            |

---

## 6. Код проекта (facade)

| Путь                                       | Роль                 |
| ------------------------------------------ | -------------------- |
| `src/lib/anime/index.ts`                   | Re-exports           |
| `src/lib/anime/configureAppAnimeEngine.ts` | engine defaults      |
| `src/hooks/useAnimeScope.ts`               | React scope + revert |
| `.cursor/skills/animejs/SKILL.md`          | чеклист агента       |
