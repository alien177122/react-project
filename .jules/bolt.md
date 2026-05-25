## 2024-05-30 - [Optimize React existence checks]
**Learning:** Found a pattern of $O(N \times M)$ existence check in React render for \`allSaved\` and \`missingExercises\` checks using \`.every\`/\`.filter\` combined with \`.some\`.
**Action:** Extract the existence check keys into a \`Set\` and wrap it in a \`useMemo\` to reduce the lookup time to $O(1)$. Make sure the cache falls back identically to empty state logic.
