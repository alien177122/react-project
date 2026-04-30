
## 2024-05-18 - Safe O(N*M) Optimizations
**Learning:** Using an empty dependency array `[]` with `useMemo` for static-looking data derived from global state/functions can cause stale closure bugs. The first approach to optimize O(N*M) computations (`computeMuscleVol()` logic inside `VolumeDonut`) broke React's reactivity.
**Action:** Focus optimizations on strictly pure React re-renders. Converting `Array.some` to an O(1) `Set.has` check wrapped in `useMemo` is a perfect and safe win, while extracting computations with external dependencies needs a robust dependency array to prevent regressions.
