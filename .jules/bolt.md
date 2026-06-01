## 2024-05-23 - Optimizing O(N*M) lookups in React renders
**Learning:** Checking for element existence inside a loop during a React render cycle (like calling `.some()` inside `.filter()` or `.every()`) creates O(N*M) complexity that recalculates on every render, even when the data hasn't changed.
**Action:** Extract these calculations into a `useMemo` hook and pre-compute a `Set` for the lookup collection, reducing complexity to O(N+M) and restricting calculation only to when dependencies change.
