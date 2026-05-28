export const JOURNAL_LIMITS = {
  MAX_SESSIONS: 500,
  MAX_SETS_PER_SESSION: 20,
  MAX_NOTE_LENGTH: 200,
  MAX_SET_NOTE_LENGTH: 120,
} as const

export function pruneJournal<T extends { createdAt: string; date: string }>(sessions: T[]): T[] {
  return [...sessions]
    .sort((a, b) => {
      const byDate = b.date.localeCompare(a.date)
      if (byDate !== 0) return byDate
      return String(b.createdAt ?? '').localeCompare(String(a.createdAt ?? ''))
    })
    .slice(0, JOURNAL_LIMITS.MAX_SESSIONS)
}

export function todayLocalDate(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
