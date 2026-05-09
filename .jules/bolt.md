
## 2024-05-09 - O(N x M) React Existence Check Optimization
**Learning:** Checking for existence using `.some()` inside `.every()` or `.filter()` arrays during every React render creates O(N x M) time complexity. This is especially problematic in larger loops or when recalculating derived state frequently.
**Action:** When extracting such existence checks, wrap them in a `useMemo` using a `Set`. Iterating through `M` to create the `Set` and then querying `N` with `set.has()` converts the complexity to O(N + M) for much faster performance.
