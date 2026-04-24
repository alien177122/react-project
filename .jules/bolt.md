## 2025-02-18 - Optimized React rendering with useMemo and Map
**Learning:** $O(N \times M)$ search patterns in React components (`.find()` inside `.map()`) can be optimized by indexing the array into a `Map` keyed by the lookup value for $O(1)$ retrieval.
**Action:** When extracting expensive derivations from React components to optimize high-frequency state updates, use `useMemo` to maintain reactivity guarantees.
