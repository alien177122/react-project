---
name: react-frontend-implementer
description: Implement and refactor frontend features in this Vite + React + TypeScript repository. Use when tasks involve UI components, styling, client-side state, accessibility, routing, or frontend bug fixes in `App.tsx`, `index.tsx`, or `src/` files.
---

# React Frontend Implementer

## Objective

Deliver requested UI changes safely and quickly while preserving existing behavior outside the task scope.

## Workflow

1. Read the request and identify all frontend files affected.
2. Inspect current component, style, and state patterns before editing.
3. Implement minimal, focused changes in React/TypeScript.
4. Keep styling consistent with existing CSS patterns in `src/App.css` and `src/index.css`.
5. Run relevant checks (`npm run lint`, `npm run build`) and fix regressions.
6. Summarize changed files, user-facing behavior, and follow-up suggestions.

## Implementation Rules

- Prefer small composable components over large monolithic changes.
- Preserve TypeScript strictness; avoid `any` unless unavoidable.
- Keep text and labels clear, concise, and consistent.
- Add lightweight comments only when logic is non-obvious.
- Do not introduce new dependencies unless explicitly requested.

## Output Checklist

- Confirm the feature or fix matches the request.
- Confirm no unrelated files were modified.
- Confirm lint/build checks pass before finalizing.
