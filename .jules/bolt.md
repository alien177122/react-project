
## 2024-05-18 - Optimize O(N*M) React Array iterations
**Learning:** In React components containing arrays of length N with array.map elements iterating to search an array of length M using `some()` or `find()` leads to $O(N \times M)$ performance. Because React compiler infers dependencies, manual memoization requires explicit matching or a wider object for array properties to preserve `useMemo`.
**Action:** Always pre-compute a `Map` structure to store N or M indexed by their unique key to optimize nested list rendering, effectively converting $O(N \times M)$ component re-renders into $O(N)$ lookup. Always verify `useMemo` manual dependencies with React compiler when relying on optional chaining properties (like `userData?.exercises`).
