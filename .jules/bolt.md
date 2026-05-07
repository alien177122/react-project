## 2025-03-05 - [React List Rendering Lookup Optimization]
**Learning:** O(N^2) time complexity is common when finding/checking conditions in a child loop (e.g. `map` wrapping `find`/`some`). Even when N is small, this pattern triggers unnecessary re-computation in React renders.
**Action:** Always extract O(N^2) `find`/`some` operations over stable or prop-dependent arrays into an O(N) `Map`/`Set` populated via `useMemo` and queried in O(1) inside the loop.
