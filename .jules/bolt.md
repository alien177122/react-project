## 2024-05-24 - Optimize O(N*M) Existence Checks
**Learning:** React component renders frequently execute O(N*M) lookups when arrays like `userData.exercises` are checked inside `.every()` or `.filter()` against another array (like `Object.keys(EXERCISES)`).
**Action:** When extracting derivations for performance, use `useMemo` to cache lookups into a `Set` for O(1) retrieval to avoid redundant iterations over the array, especially for static keys.
