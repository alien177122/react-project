import type {DraftSet} from '../../../packages/shared/src/hooks/useJournal.ts';
import {JournalSetForm} from './JournalSetForm.tsx';

interface JournalSessionEditorProps {
  draftSets: DraftSet[];
  sessionNote: string;
  saving: boolean;
  hasHistory: boolean;
  isEditing: boolean;
  editingDate?: string;
  onSessionNoteChange: (value: string) => void;
  onAddSet: () => void;
  onUpdateSet: (index: number, patch: Partial<DraftSet>) => void;
  onRemoveSet: (index: number) => void;
  onSave: () => void;
  onCopyLast: () => void;
  onCancelEdit: () => void;
}

export function JournalSessionEditor({
  draftSets,
  sessionNote,
  saving,
  hasHistory,
  isEditing,
  editingDate,
  onSessionNoteChange,
  onAddSet,
  onUpdateSet,
  onRemoveSet,
  onSave,
  onCopyLast,
  onCancelEdit,
}: JournalSessionEditorProps) {
  const sectionTitle = isEditing && editingDate ? `Редактирование · ${editingDate}` : 'Запись';

  return (
    <section className="app-tab-section journal-form-section" aria-labelledby="journal-entry-title">
      <div className="app-tab-section__head">
        <h2 id="journal-entry-title" className="app-tab-section__title">
          {sectionTitle}
        </h2>
        <span className="app-tab-section__meta">
          {draftSets.length > 0 ? `${draftSets.length} подх.` : 'Новая запись'}
        </span>
      </div>

      {draftSets.length === 0 ? (
        <p className="journal-sets-empty">Нажми «Добавить подход», чтобы начать сессию.</p>
      ) : (
        <div className="journal-sets">
          {draftSets.map((set, index) => (
            <JournalSetForm
              key={`draft-${index}`}
              index={index}
              set={set}
              onChange={patch => onUpdateSet(index, patch)}
              onRemove={() => onRemoveSet(index)}
            />
          ))}
        </div>
      )}

      <div className="journal-field journal-field--session-note">
        <label htmlFor="journal-session-note">Заметка к тренировке</label>
        <input
          id="journal-session-note"
          className="journal-input journal-input--note"
          type="text"
          placeholder="Самочувствие, техника, сон…"
          value={sessionNote}
          onChange={event => onSessionNoteChange(event.target.value)}
        />
      </div>

      <div className="journal-actions">
        <button type="button" className="journal-btn journal-btn--add" onClick={onAddSet}>
          + Добавить подход
        </button>
        <div className="journal-actions__row">
          <button
            type="button"
            className="journal-btn journal-btn--primary"
            disabled={saving}
            aria-busy={saving}
            onClick={onSave}>
            {saving ? 'Сохранение…' : 'Сохранить'}
          </button>
          {isEditing ? (
            <button type="button" className="journal-btn journal-btn--ghost" onClick={onCancelEdit}>
              Отмена
            </button>
          ) : (
            <button
              type="button"
              className="journal-btn journal-btn--ghost"
              onClick={onCopyLast}
              disabled={!hasHistory}>
              Как в прошлый раз
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
