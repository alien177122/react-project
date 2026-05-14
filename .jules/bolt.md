## 2024-05-18 - Optimized ExerciseWheel Lookups
**Learning:** The `ExerciseWheel` component contained an O(N * M) performance bottleneck where `savedExercises.find()` was executed inside a `WHEEL_ORDER.map()` loop. Converting the array to a `Map` using `useMemo` reduces the lookup to O(1).
**Action:** When identifying O(N*M) nested array iterations inside React render loops, utilize `useMemo` to construct a lookup `Map` or `Set` cache to reduce the inner lookup time to O(1).
