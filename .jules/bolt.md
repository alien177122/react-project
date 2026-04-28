## 2024-05-18 - [Memoizing User Data Avoids Reactivity Bug]
**Learning:** `EXERCISES` is static module level data so calculations purely off it are static, therefore passing `[]` to `useMemo` dependency array is valid.
**Action:** Document that this optimization is valid.
