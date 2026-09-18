# 02 — Module boundaries

## Layers

| Layer            | Path                                    | May depend on                    |
| ---------------- | --------------------------------------- | -------------------------------- |
| Domain pure      | `packages/shared/src/utils`, `program/` | nothing from UI/server           |
| API client types | `packages/shared` api helpers           | domain                           |
| Server           | `server/`                               | shared domain contracts / schema |
| Web UI           | `src/`                                  | shared only — no direct SQLite   |
| Mobile           | `apps/mobile`                           | shared — no duplicate 1RM math   |

## Rules

1. Business formulas (1RM, progression, journal aggregates) live in **shared**, not in React components.
2. UI is thin: hooks orchestrate; pure functions stay testable without DOM.
3. Server validates again (`schema.js`) — client checks are UX, not trust boundary.
4. New cross-cutting feature → decide layer first; architect-sensitive changes need user OK if reshaping folders.
