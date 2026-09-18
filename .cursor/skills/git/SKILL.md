---
name: git
description: >-
  Safe git commit, push, branch, and pull-request workflows for Training
  Calculator / Журнал Сплит monorepo. Extends ~/.cursor/skills/git. Use when
  the user asks to commit, push, open a PR, merge, rebase, split branches,
  review staged changes, or any git operation in this repository.
---

# Git — React Training Journal Split

## Layer order (required)

1. **Read and follow** personal skill: `~/.cursor/skills/git/SKILL.md` (commit/PR safety, amend policy, `gh`, HEREDOC messages).
2. **Then apply** repo rules below — they override defaults only where explicitly stated.

## Repository

| Item       | Value                                                                    |
| ---------- | ------------------------------------------------------------------------ |
| Remote     | `https://github.com/alien177122/react-project.git`                       |
| Layout     | See `STRUCTURE.md` — web core at root; workspaces `packages/*`, `apps/*` |
| CODEOWNERS | `@alien177122` — `server/`, `src/`, `packages/shared/`                   |

### Monorepo touch points

| Path                           | Note                                                              |
| ------------------------------ | ----------------------------------------------------------------- |
| `src/`                         | Vite + React web UI                                               |
| `server/`                      | Express + SQLite API                                              |
| `packages/shared/`             | `@training/shared` — shared hooks/utils                           |
| `apps/mobile/`, `apps/macos/`  | Expo native tracks                                                |
| `desktop/`, `ios/`, `android/` | Electron + Capacitor shells                                       |
| `tests/`                       | Node test runner (also run on pre-commit)                         |
| `memory-bank/`                 | Agent context — commit only when task workflow requires           |
| `.planning/`                   | GSD artifacts — **exclude from code PRs** (use **gsd-pr-branch**) |

## Never commit

- `.env`, `.env.*` (local secrets)
- `gym.db`, `gym.db.*`, `*.sqlite`
- `.sofa/credentials.json`
- `docker-data/`, `workspace-files/`, `logs/`
- Real user data, API keys, tunnel tokens

If the user asks to commit these — refuse and warn.

## Pre-commit hook (Husky)

`.husky/pre-commit` runs:

```bash
npm test
```

- Hook failure → fix tests → **new** commit (never amend after rejected hook).
- Do **not** use `--no-verify` unless the user explicitly requests it.
- `lint-staged` is installed but **not** wired in the active hook — run lint/typecheck manually before PR.

## Checks before push / PR

Run locally (agent MUST run when preparing a PR):

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

Optional: `gitleaks detect --source . --verbose` (see `CONTRIBUTING.md`).

## Commit message style (this repo)

Follow recent history — Conventional Commits in **English**:

```
feat(journal): quiet chart empty state
fix(calc): progression preset sync
chore(cursor): enforce Memory Bank workflow
```

- Scope: tab or area (`journal`, `split`, `calc`, `theory`, `mobile`, `server`, `cursor`).
- Body: 1–2 sentences on **why**, not a file list.
- User speaks Russian; **commit messages stay English** unless the user asks otherwise.

## Branch naming

| Prefix   | Use                               |
| -------- | --------------------------------- |
| `feat/`  | New feature or UI redesign        |
| `fix/`   | Bug fix                           |
| `chore/` | Tooling, deps, docs, cursor rules |

Avoid auto-generated `bolt-*` branch names for manual work.

## Pull request (repo extras)

On top of personal skill PR workflow:

1. Update `CHANGELOG.md` under `[Unreleased]` for user-visible changes.
2. UI PRs: matching doc in `docs/design-standards/` or `memory-bank/reference/`.
3. One logical change per PR when possible.
4. Large WIP spanning journal + split + infra → **split-to-prs**, respect CODEOWNERS boundaries.
5. After verify in GSD flow → **gsd-ship**.

PR body template (Russian test plan OK):

```markdown
## Summary

- ...

## Test plan

- [ ] npm run typecheck && npm test && npm run lint
- [ ] Manual: affected tab at 390px (journal / split / calc / theory)
```

## Memory Bank + git

- Commits only when the **user explicitly asks** (also in `react-training-memory-bank.mdc`).
- Phase artifacts (`tasks.md`, `progress.md`, archive) — commit with the related code change if user requested a commit for that work.
- Do not commit unrelated Memory Bank churn.

## Related skills

| Skill                  | When                                |
| ---------------------- | ----------------------------------- |
| `~/.cursor/skills/git` | Base safety and workflows           |
| **split-to-prs**       | Split large WIP into reviewable PRs |
| **gsd-pr-branch**      | Filter `.planning/` before PR       |
| **gsd-ship**           | Push → PR → review after verify     |

## Quick checklist (this repo)

- [ ] Personal git skill rules followed?
- [ ] No secrets / `gym.db` staged?
- [ ] `npm test` will pass (pre-commit)?
- [ ] typecheck + lint + build for PR?
- [ ] CHANGELOG if user-visible?
- [ ] English conventional subject line?
