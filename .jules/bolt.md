## 2024-05-10 - O(N*M) existence check optimization
**Learning:** Checking for the existence of exercise keys in a user's saved exercises list using `some()` within `every()` and `filter()` leads to O(N*M) time complexity.
**Action:** Extract the exercise keys from the user data into a `Set` using `useMemo` so that lookups are O(1) time complexity, reducing overall computation time to O(N + M). This avoids unnecessary array traversals on every render.
