export const SPLIT_LIMITS = {
  MAX_SPLITS: 50,
  MAX_NAME_LENGTH: 40,
  MAX_DAY_LABEL_LENGTH: 20,
} as const

export function pruneSplits<T extends { updatedAt: string }>(splits: T[]): T[] {
  return [...splits]
    .sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt)))
    .slice(0, SPLIT_LIMITS.MAX_SPLITS)
}
