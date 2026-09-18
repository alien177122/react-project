# 01 — TDD and physical gates

## Rules

1. Tier A domain changes (`packages/shared` calc / progression / journal metrics): write or update tests **before** claiming done.
2. Prefer Gherkin in `features/**/*.feature` for user-visible Tier A rules.
3. Agents cannot skip: `npm run quality` (Tier A) or `npm run quality:quick` (Tier B).
4. Mutation survivors in pilot (`calc.ts`) → add tests until killed.
5. Do not lower thresholds silently — change `uncle-bob-quality-gates.md` + rule together.

## Commands

```bash
npm run quality:quick   # typecheck + unit
npm run quality         # + acceptance + crap + mutate + eslint calc
```
