## 2024-04-26 - [Avoid Yarn Lockfile Downgrades]
**Learning:** Running an older global yarn (e.g., v1.x) in a Yarn Berry workspace will silently downgrade and corrupt `yarn.lock`. This causes severe regressions in CI and package management.
**Action:** Always check the workspace yarn version. If `yarn install` modifies `yarn.lock` to v1 format, revert it immediately using `git restore yarn.lock`.

## 2024-04-26 - [Consolidating Nested Loops in React Memos]
**Learning:** Complex static SVG charts (like the donut chart in `App.tsx`) might use chained array methods (`.filter`, `.map`, `.reduce`) to calculate sectors and arcs. These are O(N*M) and run on every re-render (e.g. hover state changes).
**Action:** Consolidate these calculations into a single loop inside `useMemo` to convert them to O(1) on re-renders, significantly improving interactive performance.
