export const JOURNAL_LIMITS = {
  MAX_SESSIONS: 500,
  MAX_SETS_PER_SESSION: 20,
  MAX_NOTE_LENGTH: 200,
}

export function pruneJournal(sessions) {
  return [...sessions]
    .sort((a, b) => {
      const byDate = b.date.localeCompare(a.date)
      if (byDate !== 0) return byDate
      return String(b.createdAt ?? '').localeCompare(String(a.createdAt ?? ''))
    })
    .slice(0, JOURNAL_LIMITS.MAX_SESSIONS)
}
