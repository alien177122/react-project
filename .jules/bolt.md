## 2024-05-17 - O(N*M) Lookup Optimization in React State

**Learning:** In React components like `App.tsx`, derived state that filters global constants (`EXERCISES`) against an array in the user state (`userData.exercises`) using `.every()` or `.filter()` containing `.some()` creates an $O(N \times M)$ operation on *every render*. This is a performance anti-pattern, especially as the list of global constants and user data grows.

**Action:** Use `useMemo` to construct a `Set` from the user state array (`userData.exercises`). Then use `.has()` inside `.filter()` or `.every()` to reduce the complexity to $O(N)$ with an $O(M)$ upfront initialization step. Always mock `!userData` correctly to ensure no UI regressions during the loading phase. Always use a dependency array tracking the user data reference, not its serialized string representation.
