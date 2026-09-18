# Uncle Bob Quality Gates — Training Calculator adaptation

Adapted from [unclebob/swarm-forge](https://github.com/unclebob/swarm-forge) constitution +
[Acceptance-Pipeline-Specification](https://github.com/unclebob/Acceptance-Pipeline-Specification).
Not a full SwarmForge install (tmux multi-agent). Physical gates for this Vite+React+node:test monorepo.

## Principle

Agents may write implementation and unit tests. Humans (or specifier role) review **behavior specs**
(Gherkin / acceptance) and QA checklists. Confidence comes from gates that agents cannot skip —
not from line-by-line code review of every diff.

## Physical gates (must pass before task done)

| Gate                   | Command                   | Scope                                      |
| ---------------------- | ------------------------- | ------------------------------------------ |
| Typecheck              | `npm run typecheck`       | whole TS project                           |
| Unit tests             | `npm test`                | `tests/**/*.test.ts`                       |
| Acceptance             | `npm run test:acceptance` | `features/**/*.feature`                    |
| Mutation (shared pure) | `npm run test:mutate`     | pilot: `packages/shared/src/utils/calc.ts` |
| Complexity / CRAP-lite | `npm run test:crap`       | shared utils + program pure modules        |
| Lint (calc subset)     | eslint on calc/plates/…   | pilot; full `npm run lint` has UI debt     |
| Bundle gate            | `npm run quality`         | all of the above                           |

## Numeric thresholds (pilot → tighten later)

| Metric                                       | Pilot           | Target (Uncle Bob) |
| -------------------------------------------- | --------------- | ------------------ |
| Cyclomatic complexity per function           | ≤ 12 (eslint)   | ≤ 4                |
| CRAP-lite (complexity when coverage unknown) | complexity ≤ 12 | CRAP ≤ 6           |
| Mutation kill rate (`calc.ts`)               | ≥ 80%           | ≥ 90%              |
| Mutation sites per file                      | warn > 100      | split required     |

## What humans review

1. Gherkin under `features/` (criticality-weighted).
2. QA procedures when added under `docs/qa/`.
3. Periodic manual / browser smoke (iPhone 390–430px for UI).

## What agents own without line review

- Unit tests
- Implementation code that passes the gauntlet
- Mutation survivors → add tests until killed

## Out of scope (do not copy wholesale)

- SwarmForge tmux six-pack on every task
- Babashka APS install for every micro-fix
- Mutation of entire UI tree
- Property tests on every PR (separate command when needed)

## Language tool mapping (JS/TS)

| Uncle Bob (Go/Clj/Java) | Our stack                                              |
| ----------------------- | ------------------------------------------------------ |
| mutate4\*               | `scripts/quality/mutate-shared.mjs` (+ later Stryker)  |
| crap4\*                 | `scripts/quality/crap-check.mjs` + eslint complexity   |
| dry4\*                  | future / eslint no-dupe                                |
| APS Gherkin             | `features/` + `scripts/quality/gherkin-acceptance.mjs` |

## Criticality tiers

| Tier | Examples                               | Required gates                   |
| ---- | -------------------------------------- | -------------------------------- |
| A    | 1RM, progression math, journal metrics | quality + mutate + acceptance    |
| B    | API validators, split limits           | quality                          |
| C    | CSS / copy / layout                    | typecheck + lint + iPhone verify |
