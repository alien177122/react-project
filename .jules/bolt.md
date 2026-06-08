
## 2026-06-08 - Optimize array lookups in React Components
**Learning:** Checking for existence using `.some()` inside `.every()` or `.filter()` inside a React render function results in $O(N \times M)$ complexity. When this relies on derived state mapping static module-level objects against component state arrays, it can cause expensive unnecessary computations every render.
**Action:** When extracting expensive array search patterns into `useMemo`, convert the linear search dependency arrays into a `Set` for $O(1)$ lookups, and ensure fallbacks precisely mirror previous `null`/`undefined` fallback logic without altering dependencies in ways that break the React Compiler.
