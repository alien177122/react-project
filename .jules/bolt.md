## 2025-06-06 - Optimizing O(N*M) lookups in React renders
**Learning:** Using array `.some()` or `.find()` inside `.filter()`, `.map()`, or `.every()` during React component rendering creates hidden $O(N \times M)$ bottlenecks that block the main thread as data scales.
**Action:** When deriving state that requires cross-referencing collections, use `useMemo` to cache the lookup keys into a `Set` or `Map` first, reducing the complexity to $O(N)$ and lookups to $O(1)$.
