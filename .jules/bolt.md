## 2024-05-18 - Caching existence checks for O(N*M) lookups inside React Renders
**Learning:** Checking for existence using `.every()` and `.some()` directly on Arrays inside React component renders leads to O(N*M) computational complexity that is redundantly executed on every single re-render.
**Action:** When evaluating derivations based on multiple dynamic arrays, convert the reference arrays into a `Set` to reduce the lookup to O(1) and wrap the calculation in `useMemo` so it's only executed when dependencies actually change.
