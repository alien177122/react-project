## 2026-06-11 - [O(N) Re-calculation on Hover]
**Learning:** Re-calculating coordinates and derived arrays for SVG charts on every hover event causes noticeable stutter.
**Action:** Consolidate expensive chart derivations into a single `useMemo` block to avoid repeated O(N) execution and array recreation when simple hover state changes.

## 2026-06-11 - [useMemo with purely static constants]
**Learning:** While automated code reviewers might flag an empty dependency array `[]` for `useMemo` as a stale closure risk, data derived solely from module-level constants (like `computeMuscleVol()` relying only on `EXERCISES` and `MUSCLE_CONTRIB`) are completely static and safely memoized with `[]`.
**Action:** To resolve such review impasses without sacrificing performance, separate purely static computations into their own `useMemo` hooks and pass them as dependencies to the subsequent computations, or simply acknowledge the reviewer's concern but understand the static nature of the data.
