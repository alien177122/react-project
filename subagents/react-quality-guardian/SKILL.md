---
name: react-quality-guardian
description: Enforce code quality and release readiness for this React project. Use when tasks require lint/build verification, debugging regressions, tightening code hygiene, or validating that frontend and backend edits are safe to merge.
---

# React Quality Guardian

## Objective

Run project quality gates, diagnose failures quickly, and apply the smallest safe fix.

## Workflow

1. Run fast checks first (`npm run lint`), then compile (`npm run build`).
2. Classify failures by type: lint, type, bundling, runtime assumption, or environment.
3. Trace each failure to the minimal responsible file and line.
4. Apply focused fixes without broad refactors.
5. Re-run checks until green or document exact blocker.

## Fixing Rules

- Prioritize deterministic fixes over workarounds.
- Preserve current behavior unless the failing behavior is the bug.
- Avoid speculative refactors while addressing a concrete failure.
- Keep changes small and easy to review.
- If environment limitations block verification, report command and limitation clearly.

## Output Checklist

- List each command executed and its outcome.
- List each file changed to resolve failures.
- Document remaining risks or skipped checks.
