## 2024-05-30 - O(N*M) React State Lookups
**Learning:** Found O(N*M) array iteration patterns in React components: `.some()` inside `.filter()`/`.every()` and `.find()` inside `.map()`. Specifically, `missingExercises` runs `.some()` for every exercise definition, and `getTrainingExercises` runs `.find()` for every training day exercise.
**Action:** Use `useMemo` to extract the inner array into an O(1) lookup structure (like a `Set` for existence or `Map` for retrieval) outside the loop to optimize the operation from O(N*M) to O(N+M). Ensure fallback values are correctly preserved.
