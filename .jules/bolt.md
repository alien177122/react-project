## 2024-05-29 - O(N*M) existence checks on render
**Learning:** Checking for the existence of saved exercises inside `Object.keys().every()` and `Object.entries().filter()` using `.some()` on `userData.exercises` causes O(N*M) lookups on every single render cycle of `App`.
**Action:** Use `useMemo` to convert `userData.exercises` into a `Set` of `exerciseKey`s for O(1) lookups, and memoize the resulting `allSaved` and `missingExercises` derived state.
