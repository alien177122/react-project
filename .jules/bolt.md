## 2025-02-24 - Avoid O(N*M) array lookups during React render loops
**Learning:** Checking the existence of items using `.some()` or `.find()` inside a map/filter/every loop in a React component creates an O(N*M) calculation that runs synchronously on every render.
**Action:** Use `useMemo` to extract the items into a `Set` (or `Map`) so that existence checks inside the loop become O(1), improving the time complexity to O(N) and preserving fast render cycles.
