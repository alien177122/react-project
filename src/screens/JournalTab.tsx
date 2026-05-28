import ExerciseWheel from '../components/ExerciseWheel.tsx';
import {JournalProgressChart} from '../components/journal/JournalProgressChart.tsx';
import {JournalSessionEditor} from '../components/journal/JournalSessionEditor.tsx';
import {JournalSessionList} from '../components/journal/JournalSessionList.tsx';
import {useJournal} from '../hooks/useJournal.ts';
import {useURLState} from '../hooks/useURLState.ts';
import {saveUser} from '../utils/api.ts';
import type {UserData} from '../types';
import {EXERCISES} from '../data/exercises.ts';

interface JournalTabProps {
  userData: UserData;
  setUserData: (value: UserData) => void;
  token: string;
  onSaveError: (message: string) => void;
}

export function JournalTab({userData, setUserData, token, onSaveError}: JournalTabProps) {
  const exerciseState = useURLState('exercise');
  const exerciseKey =
    exerciseState.value && EXERCISES[exerciseState.value] ? exerciseState.value : 'bench';

  const journal = useJournal({
    userData,
    exerciseKey,
    setUserData,
    saveUser,
    token,
    onSaveError,
  });

  const activeExercise = EXERCISES[exerciseKey];
  const historyWithoutToday = journal.history.filter(session => session.date !== journal.today);

  return (
    <main className="app-tab-shell app-tab-shell--journal" aria-labelledby="journal-page-title">
      <header className="app-tab-header">
        <div className="app-tab-header__copy">
          <h1 id="journal-page-title" className="app-tab-title">
            Журнал
          </h1>
          <p className="app-tab-header__hint">
            Справочник фактических подходов. График — только из ваших записей, без плана
            калькулятора.
          </p>
        </div>
        <div className="app-tab-header__actions">
          <label className="app-tab-picker-label" id="journal-exercise-label">
            Упражнение
          </label>
          <ExerciseWheel
            value={exerciseKey}
            onChange={key => exerciseState.setValue(key)}
            savedExercises={userData.exercises}
          />
        </div>
      </header>

      <section className="app-tab-section" aria-labelledby="journal-trend-title">
        <div className="app-tab-section__head">
          <h2 id="journal-trend-title" className="app-tab-section__title">
            Тренд 1ПМ
          </h2>
          {activeExercise ? (
            <span className="app-tab-section__meta">{activeExercise.name}</span>
          ) : null}
        </div>
        <JournalProgressChart points={journal.chartPoints} />
      </section>

      <JournalSessionEditor
        draftSets={journal.draftSets}
        sessionNote={journal.sessionNote}
        saving={journal.saving}
        isEditing={journal.editingSessionId != null}
        editingDate={journal.editingSession?.date}
        onSessionNoteChange={journal.setSessionNote}
        onAddSet={journal.addDraftRow}
        onUpdateSet={journal.updateDraftSet}
        onRemoveSet={journal.removeDraftSet}
        onSave={() => void journal.saveSession()}
        onCopyLast={journal.copyLastSession}
        onCancelEdit={journal.cancelEdit}
        hasHistory={journal.history.length > 0}
      />

      <section className="app-tab-section" aria-labelledby="journal-history-title">
        <div className="app-tab-section__head">
          <h2 id="journal-history-title" className="app-tab-section__title">
            История
          </h2>
          {historyWithoutToday.length > 0 ? (
            <span className="app-tab-section__meta">{historyWithoutToday.length} записей</span>
          ) : null}
        </div>
        <JournalSessionList
          sessions={historyWithoutToday}
          onEdit={journal.loadSessionIntoDraft}
          onDelete={id => void journal.deleteSession(id)}
        />
      </section>
    </main>
  );
}
