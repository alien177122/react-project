## 2024-05-22 - Optimize O(N*M) lookups in App.tsx using useMemo and Set

**Learning:** In React components with frequent renders, doing `userData.exercises.some()` inside a `.filter()` or `.every()` over a static list creates an O(N*M) lookup pattern that runs on every render.
**Action:** When extracting derived arrays like `allSaved` and `missingExercises`, use `useMemo` to construct a `Set` from the active user's saved exercises. This changes the O(N*M) lookup to O(N) by providing O(1) existence checks. Remember to include exact array dependencies like `[userData?.exercises]`.
