## 2024-05-24 - Unmemoized O(N*M) Array Lookups in React Renders
**Learning:** Checking for existence using `.some()` or `.find()` inside mapping functions or standard checks (like `.every()`) without memoization causes redundant CPU work in this codebase.
**Action:** When extracting components or calculations that require frequent array element existence checks based on dynamic state variables like `userData`, use `useMemo` to convert the target array into a `Set` or `Map` to reduce complexity from $O(N \times M)$ to $O(1)$.
