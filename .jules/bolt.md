## 2024-04-27 - O(N x M) Existence Checks in React Rendering
**Learning:** Found O(N * M) performance issue with `.filter().some()` and `.every().some()` during render cycle on an array of values (`userData.exercises`).
**Action:** Use `useMemo` to construct a `Set` from the inner array to enable O(1) `.has()` checks on every render without reconstructing the `Set` unnecessarily, mitigating re-render performance drops.
