import {useState} from 'react';
import type {JournalSession} from '../../types';
import {
  sessionPeak,
  sessionTopWeight,
  sessionVolume,
} from '../../../packages/shared/src/utils/journalMetrics.ts';

interface JournalSessionListProps {
  sessions: JournalSession[];
  onEdit: (session: JournalSession) => void;
  onDelete: (id: string) => void;
}

export function JournalSessionList({sessions, onEdit, onDelete}: JournalSessionListProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  if (sessions.length === 0) {
    return <p className="journal-history-empty">Пока нет записей по этому упражнению.</p>;
  }

  return (
    <ul className="journal-history-list">
      {sessions.map(session => {
        const expanded = openId === session.id;
        const setsLine = session.sets.map(set => `${set.weight}×${set.reps}`).join(' · ');
        const peak = sessionPeak(session.sets).toFixed(1);

        return (
          <li key={session.id} className="journal-history-item">
            <button
              type="button"
              className="journal-history-trigger"
              aria-expanded={expanded}
              onClick={() => setOpenId(expanded ? null : session.id)}
              onKeyDown={event => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  setOpenId(expanded ? null : session.id);
                }
              }}>
              <time className="journal-history-date" dateTime={session.date}>
                {session.date}
              </time>
              <span className="journal-history-summary">{setsLine || 'Нет подходов'}</span>
              {setsLine ? <span className="journal-history-peak">пик {peak} кг</span> : null}
            </button>

            {expanded ? (
              <div className="journal-history-detail">
                <ol className="journal-history-sets">
                  {session.sets.map(set => (
                    <li key={set.setIndex}>
                      #{set.setIndex}: {set.weight}×{set.reps}
                      {set.rpe !== undefined ? ` @${set.rpe}` : ''}
                      {set.note ? ` — ${set.note}` : ''}
                    </li>
                  ))}
                </ol>
                <p className="journal-history-summary">
                  {sessionTopWeight(session.sets)} кг · e1RM {Math.round(sessionPeak(session.sets))}{' '}
                  · объём {Math.round(sessionVolume(session.sets))}
                </p>
                {session.sessionNote ? (
                  <p className="journal-history-summary">{session.sessionNote}</p>
                ) : null}
                <div className="journal-history-actions">
                  <button
                    type="button"
                    className="journal-btn journal-btn--ghost"
                    onClick={() => onEdit(session)}>
                    Редактировать
                  </button>
                  {confirmDeleteId === session.id ? (
                    <div className="journal-history-delete-confirm">
                      <span>Удалить запись?</span>
                      <button
                        type="button"
                        className="journal-btn journal-btn--danger"
                        onClick={() => {
                          void onDelete(session.id);
                          setConfirmDeleteId(null);
                          setOpenId(null);
                        }}>
                        Да
                      </button>
                      <button
                        type="button"
                        className="journal-btn journal-btn--ghost"
                        onClick={() => setConfirmDeleteId(null)}>
                        Нет
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="journal-btn journal-btn--danger"
                      onClick={() => setConfirmDeleteId(session.id)}>
                      Удалить
                    </button>
                  )}
                </div>
              </div>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
