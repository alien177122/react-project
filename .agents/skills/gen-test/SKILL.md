---
name: gen-test
description: Generate Node test runner tests for a specified function or file in packages/shared, server, or training utilities, using this repo's test patterns.
---

# Generate Tests

Given a function name or file path, prepare a complete `.test.ts` using Node's built-in test runner.

Workflow:

1. Inspect the target implementation and the closest existing tests in `tests/`.
2. Import using the same style already used for that subsystem.
3. Generate 5-8 focused cases covering normal input, edge input, invalid input, and at least one regression-style scenario.
4. Compute expected values from stable domain rules, not from calling the target under test inside the assertion.
5. For server endpoints, use the temporary DB/server pattern from `tests/server.test.ts`.
6. Print the proposed test file first. Do not write it unless the user confirms or explicitly asked you to implement it.

Constraints:

- Use `import test from 'node:test'` and `import assert from 'node:assert/strict'`.
- Do not use Jest, Mocha, Vitest, snapshots, or third-party test helpers.
- Do not touch real `gym.db`.
