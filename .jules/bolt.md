## 2025-02-28 - Optimize existence check patterns in React
**Learning:** Checking for element existence in an array (`.some()` or `.find()`) inside a loop (like `Object.keys().every()`) creates an O(N*M) performance bottleneck, especially within component renders.
**Action:** When finding multiple matches against an array in React, use `useMemo` to construct a `Set` or `Map` keyed by the lookup value for O(1) retrieval. Make sure to use a robust dependency array (e.g., `[userData]`).
