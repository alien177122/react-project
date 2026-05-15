## 2025-02-21 - Optimize missing exercises check
**Learning:** Checking for missing exercises nested within `.map()` or inside React's render phase using nested arrays `.every(k => ... .some(e => ...))` is an $O(N \times M)$ operation that runs unnecessarily. Utilizing a `Set` alongside `useMemo` optimizes this pattern down to $O(N)$.
**Action:** When finding existence checks within nested lists, convert the lookup array into a `Set` for $O(1)$ complexity, and wrap with `useMemo` when rendering static data based on dependencies.
