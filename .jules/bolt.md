## 2024-06-03 - Optimize O(N*M) existence checks in React
**Learning:** When using `.every()` or `.filter()` in combination with `.some()` (or `.find()`) inside a React component render loop, it creates an O(N*M) time complexity. For large arrays or frequent re-renders, this can cause significant performance bottlenecks.
**Action:** Extract the inner lookup into a `useMemo`-backed `Set` (or `Map`) cache. This reduces the time complexity from O(N*M) to O(N + M) by allowing O(1) existence checks.
