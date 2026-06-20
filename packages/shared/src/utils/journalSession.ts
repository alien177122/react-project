import type {JournalSession} from '../types/index.ts';

export interface JournalSessionIdentity {
  id: string;
  createdAt: string | undefined;
}

/**
 * Picks session id/createdAt for save: edit keeps id; today updates today's row;
 * other dates always create a new session (never steal today's id).
 */
export function resolveJournalSessionIdentity(
  editingSession: JournalSession | null | undefined,
  todaySession: JournalSession | null | undefined,
  sessionDate: string,
  today: string,
  newId: () => string = () => crypto.randomUUID(),
): JournalSessionIdentity {
  if (editingSession) {
    return {id: editingSession.id, createdAt: editingSession.createdAt};
  }
  if (sessionDate === today && todaySession) {
    return {id: todaySession.id, createdAt: todaySession.createdAt};
  }
  return {id: newId(), createdAt: undefined};
}
