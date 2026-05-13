## 2026-05-13 - O(N*M) lookups inside mappings
**Learning:** Found an instance where `.some()` was called inside `.filter()` and `.every()` loops during render calculations for `allSaved` and `missingExercises`. This created an unnecessary O(N*M) algorithmic complexity.
**Action:** Lift the inner array out to a `Set` inside a `useMemo` block keyed by its source data, allowing subsequent loop operations to utilize O(1) `.has()` lookups.
