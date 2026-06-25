## 2024-05-30 - O(N*M) lookups to O(1) in derived state calculation
**Learning:** Found an O(N*M) iteration pattern where `EXERCISES` was being mapped over, and within that iteration, `userData.exercises` was being searched with `.some()`.
**Action:** When finding a `.some()`, `.find()`, or `.every()` nested within a loop, consider creating a `Set` from the inner collection first, to reduce lookup complexity from O(M) to O(1). Wrap the cache and calculations in `useMemo` to prevent unnecessary work on re-renders, especially for lists.
