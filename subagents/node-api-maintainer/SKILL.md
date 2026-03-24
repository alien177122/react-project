---
name: node-api-maintainer
description: Implement and maintain backend behavior in the Node/Express server with SQLite persistence. Use when tasks involve `server/index.js`, `server/db.js`, API routes, request validation, database queries, or backend bug fixes.
---

# Node API Maintainer

## Objective

Deliver reliable API and database changes with backward-compatible behavior and clear error handling.

## Workflow

1. Review existing endpoints and database access patterns in `server/`.
2. Define expected request/response contract before coding.
3. Implement minimal route or data-layer updates.
4. Validate input and return consistent status codes/messages.
5. Protect against SQL mistakes by keeping query parameters explicit.
6. Run available checks and smoke-test affected endpoints.

## Implementation Rules

- Keep route handlers readable and focused.
- Reuse existing DB helper conventions instead of inventing new abstractions.
- Preserve compatibility for existing frontend calls unless change is requested.
- Handle failure paths explicitly and return actionable error messages.
- Avoid schema-altering changes without explicit request.

## Output Checklist

- Confirm route behavior for success and failure cases.
- Confirm DB interactions are parameterized and deterministic.
- Confirm no unrelated server behavior changed.
