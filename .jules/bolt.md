## 2024-06-25 - React Component Array Search Optimization
**Learning:** Found an O(N*M) performance bottleneck in the `ExerciseWheel` component where `Array.prototype.find()` was called inside a `.map()` loop during SVG rendering to lookup saved exercises.
**Action:** Replaced the array search with an O(1) Map lookup by indexing the `savedExercises` array into a `Map` using `useMemo`. This pattern (indexing arrays into Maps for lookups in render loops) is a significant performance gain.
