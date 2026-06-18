## 2024-06-18 - Convert O(N*M) lookups to O(1) in React components
**Learning:** Found multiple instances of O(N*M) lookups in App.tsx using `.find()`, `.filter()`, or `.every()` where `userData.exercises` is searched repeatedly for elements.
**Action:** Always optimize such O(N*M) lookups using O(1) Maps or Sets with `useMemo` in React components.
