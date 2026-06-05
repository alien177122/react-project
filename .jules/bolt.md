## 2024-06-05 - O(N*M) lookups in React loops
**Learning:** Found multiple instances where the application iterates over an array of keys (like EXERCISES keys or TRAINING_DAYS keys or WHEEL_ORDER) and performs an $O(M)$ lookup (`.find()` or `.some()`) on `userData.exercises` or `savedExercises` for each element. This results in $O(N \times M)$ complexity during renders.
**Action:** Always use `useMemo` to cache arrays into a `Set` or `Map` before iterating, bringing lookups down to $O(1)$ and overall complexity to $O(N)$.
