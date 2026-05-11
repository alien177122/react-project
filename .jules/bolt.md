## 2024-05-11 - Optimize O(N x M) Lookups
**Learning:** React component renders with inline `.find()` and `.some()` inside `.map()` or `.every()` arrays cause O(N x M) loops during render, degrading frontend performance as the `userData.exercises` list grows.
**Action:** Use `useMemo` to build a `Set` (for existence checks) or `Map` (for object retrieval) keyed by the lookup value, reducing render-time lookup complexity to O(1).
