import {useEffect, useMemo, useState} from 'react';
import {LegExercisePicker} from '../components/split/LegExercisePicker.tsx';
import {SplitPreview} from '../components/split/SplitPreview.tsx';
import {MuscleDayGrid} from '../components/split/MuscleDayGrid.tsx';
import {SplitToolbar} from '../components/split/SplitToolbar.tsx';
import {useSplitConstructor} from '../hooks/useSplitConstructor.ts';
import {useURLState} from '../hooks/useURLState.ts';
import {saveUser} from '../utils/api.ts';
import type {UserData} from '../types';

interface SplitConstructorTabProps {
  userData: UserData;
  setUserData: (value: UserData) => void;
  token: string;
  onSaveError: (message: string) => void;
}

export function SplitConstructorTab({
  userData,
  setUserData,
  token,
  onSaveError,
}: SplitConstructorTabProps) {
  const splitState = useURLState('split');
  const [debouncedDraft, setDebouncedDraft] = useState(0);

  const constructor = useSplitConstructor({
    userData,
    setUserData,
    saveUser,
    token,
    initialSplitId: splitState.value,
    onSplitIdChange: id => splitState.setValue(id),
    onSaveError,
  });

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedDraft(value => value + 1), 150);
    return () => window.clearTimeout(timer);
  }, [constructor.draft]);

  const dayPreviews = useMemo(
    () => constructor.dayPreviews,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [debouncedDraft, constructor.previewWeek, constructor.draft],
  );

  return (
    <main className="app-tab-shell app-tab-shell--split" aria-labelledby="split-page-title">
      <header className="app-tab-header app-tab-header--stacked">
        <div className="app-tab-header__copy">
          <h1 id="split-page-title" className="app-tab-title">
            Конструктор сплита
          </h1>
          <p className="app-tab-header__hint">
            Распредели группы мышц и проверь превью на 8 недель. Перетащи или нажми для назначения.
          </p>
        </div>
      </header>

      <SplitToolbar
        draft={constructor.draft}
        savedSplits={constructor.savedSplits}
        onNameChange={name => constructor.updateDraft({name})}
        onSelectSplit={constructor.selectSplit}
        onCreateNew={constructor.createNewSplit}
        onDuplicateLast={constructor.duplicateLast}
        onDaysPerWeek={constructor.setDaysPerWeek}
        onVaryIntensity={value => constructor.updateDraft({varyIntensity: value})}
        onWeightMode={mode => constructor.updateDraft({weightMode: mode})}
        onSave={() => void constructor.saveSplit()}
      />

      {constructor.validationError ? (
        <p className="split-validation" role="alert">
          {constructor.validationError}
        </p>
      ) : null}

      <MuscleDayGrid split={constructor.draft} onMoveMuscle={constructor.moveMuscle} />

      {constructor.usesLegs ? (
        <LegExercisePicker
          selected={constructor.legExercises}
          onToggle={constructor.toggleLegExercise}
        />
      ) : null}

      <SplitPreview
        split={constructor.draft}
        previewWeek={constructor.previewWeek}
        dayPreviews={dayPreviews}
        onWeekChange={constructor.setPreviewWeek}
        onFixedWeightChange={constructor.setFixedWeight}
      />
    </main>
  );
}
