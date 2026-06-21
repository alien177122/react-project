## 2025-02-15 - Optimize O(N*M) existence checks in React
**Learning:** Checking existence in derived states using `.some()` inside `.filter()` or `.every()` is a common O(N*M) anti-pattern in React that calculates on every render.
**Action:** When finding complex nested derivations in React component state, use `useMemo` to prevent recalculations and convert the lookup target array to a `Set` for O(1) performance. Be careful to preserve exact explicit behavior (like null/undefined defaults or length mismatches) when migrating to sets.
