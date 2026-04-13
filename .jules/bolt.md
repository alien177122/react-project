## 2024-05-19 - [Performance Optimization]
**Learning:** [React hover states causing heavy recalculations] Hover states trigger full re-renders, causing expensive calculations (like mapping array elements, calculating donut arcs, reducing values) to be unnecessarily re-run unless those calculations are memoized.
**Action:** [Memoize expensive layouts with useMemo] Ensure expensive geometry, math layout logic, or array derivations in UI components that maintain frequent local state updates (e.g. `hover`) are wrapped in `useMemo`. Provide correct dependency arrays to avoid stale closures.
