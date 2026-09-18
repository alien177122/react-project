import type {CustomSplit} from '../types/index.ts';

/** Resolve which saved split to load from URL/active id; exported for unit tests. */
export function resolveSavedSplitSelection(
  savedSplits: CustomSplit[],
  preferredId: string | null | undefined,
  activeSplitId: string | null,
): CustomSplit | undefined {
  if (preferredId) {
    const matched = savedSplits.find(split => split.id === preferredId);
    if (matched) return matched;
    return undefined;
  }

  if (activeSplitId) {
    const matched = savedSplits.find(split => split.id === activeSplitId);
    if (matched) return matched;
  }

  return savedSplits[0];
}
