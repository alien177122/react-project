## 2025-02-23 - App re-renders from unmemoized search/existence checks
**Learning:** $O(N \times M)$ search and existence check patterns like `.every()` checking `.some()` or `.map()` with an inner `.find()` in React components (`App`, `TrainingTab`) run on every render. If data sets are unmemoized or large, this causes repeated linear lookups.
**Action:** Use `useMemo` to build an indexed `Set` for $O(1)$ lookups and a `Map` for $O(1)$ retrievals for existence and search checks inside arrays in React, especially during list/array mapping on each render.

## 2025-02-23 - `VolumeDonut` recalculates layout multiple times unmemoized
**Learning:** Computations dependent on constant configuration or external state (like `vol`, `total`, `segs`, etc in `VolumeDonut`) when outside of a `useMemo` block, or split into multiple iterations, run entirely sequentially on each render causing unnecessary CPU overhead.
**Action:** Consolidate derived calculations into a single `useMemo` hook with a robust dependency array. Refactor multiple iterations into a single pass when parsing complex states for visualization.
