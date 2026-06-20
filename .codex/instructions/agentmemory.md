# Persistent memory — agentmemory (primary)

**Project id:** `react-training-journal-split` (always use for `memory_save` / `memory_smart_search`)

**Model:** agentmemory = shared live memory (Cursor + Codex) · `memory-bank/` = git backup + UI reference standards

## Before every task

1. MCP `memory_smart_search` — keywords for the task, `project: react-training-journal-split`
2. If context is empty at session start — `memory_profile` with the same project id
3. `memory-bank/` — only if agentmemory did not cover the topic, or for phase artifacts

## After significant decisions

1. MCP `memory_save` — architecture, bugfixes, UI standards, preferences (`project` required)
2. Selective backup to `memory-bank/activeContext.md`, `tasks.md`, `progress.md` when closing a work phase

## UI / design work

Before new UI structures: `memory_smart_search` for the screen type; fallback `memory-bank/reference/README.md` + matching `*-standard.md`.

## Server

- REST/MCP: `http://127.0.0.1:3111` · Viewer: `http://localhost:3113`
- If down: `agentmemory` or `npx @agentmemory/agentmemory`
- Docker alt stack: `docker/agentmemory/README.md` (port `3120`)

## Codex native memories

Codex `memories` feature is enabled for cross-session Codex preferences. **Project facts and architecture** belong in agentmemory, not only in Codex memories.
