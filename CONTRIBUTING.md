# Contributing

Thank you for contributing to **Training Calculator / Periodizatsiya**. This project is open source under the [MIT License](LICENSE).

## Prerequisites

- [Bun](https://bun.sh) 1.3+ (see `packageManager` in `package.json`)
- Node.js 20+ (for `node --test` server tests)

## Local setup

```bash
git clone https://github.com/alien177122/react-project.git
cd react-project
bun install
bun run dev
```

- Web UI: http://localhost:5173
- API: http://localhost:3002 (default when using `bun run dev`)

Register a new account in the app, or seed demo journal data:

```bash
# optional demo journal entries (development)
bun run seed:journal-demo
```

**Database:** SQLite file `gym.db` is created locally on first API start. It is listed in `.gitignore` — **never commit** `gym.db` or any file with real user data.

## Before you open a PR

```bash
bun run typecheck
bun run lint
bun test
bun run build
# Optional locally: brew install gitleaks && gitleaks detect --source . --verbose
```

All checks must pass.

## Pull request guidelines

1. One logical change per PR when possible.
2. Update `CHANGELOG.md` under `[Unreleased]` for user-visible changes.
3. For UI work, read matching docs in [`docs/design-standards/`](docs/design-standards/README.md).
4. No secrets, no `gym.db`, no personal `.env` files.
5. Follow existing code style (TypeScript strict, functional React, co-located CSS).

## UI design standards

Canonical UI references live in **`docs/design-standards/`** (calculator, charts, journal, exercise picker).

Use semantic tokens (`--color-*`, `--ta-*`), 4px spacing, keyboard focus, and `prefers-reduced-motion` support.

## Project layout

See [`STRUCTURE.md`](STRUCTURE.md) and [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

## Code of Conduct

This project follows the [Contributor Covenant](CODE_OF_CONDUCT.md). Be respectful and constructive.

## Questions

Open a [GitHub Discussion](https://github.com/alien177122/react-project/discussions) or an issue for bugs and feature requests. Security issues: see [SECURITY.md](SECURITY.md).
