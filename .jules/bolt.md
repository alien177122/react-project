## 2024-05-24 - Optimizing O(N*M) Array Lookup Patterns in React Render
**Learning:** Checking for element existence across two arrays within a React render cycle using `.filter().some()` or `.every().some()` causes an $O(N \times M)$ performance bottleneck on every render.
**Action:** When extracting expensive derived state calculations, use `useMemo` to construct a `Set` or `Map` of lookup keys to reduce complexity to $O(N)$, which significantly speeds up re-renders involving lists of saved/selected items.
