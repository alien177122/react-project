import type {TrainingDayDef, TrainingPreferences, UserData} from '../types';
import {HeroSection} from '../components/ui/HeroSection';
import type {TrainingExerciseRow} from '../utils/training';
import TrainingStateRouter from '../components/training/TrainingStateRouter';
import {deriveTrainingState} from '../components/training/trainingState';

export interface TrainingTabProps {
  userData: UserData;
  allSaved: boolean;
  missingExercises: string[];
  completedSessions: number;
  currentDayIdx: number;
  currentWeekIdx: number;
  programDone: boolean;
  nextSessions: number;
  nextDayIdx: number;
  nextWeekIdx: number;
  isMicrocycleBreak: boolean;
  completedMicrocycle: number;
  currentTrainingExercises: TrainingExerciseRow[];
  nextTrainingExercises: TrainingExerciseRow[];
  handleComplete: () => void;
  handleReset: () => void;
  setRestDismissed: (value: boolean) => void;
  onGoCalculator: () => void;
  trainingPreferences: TrainingPreferences;
  updateTrainingPreferences: (patch: Partial<TrainingPreferences>) => void;
  totalSessions?: number;
  trainingDays?: TrainingDayDef[];
  programSubtitle?: string;
}

export default function TrainingTab(props: TrainingTabProps) {
  const state = deriveTrainingState({
    allSaved: props.allSaved,
    missingExercises: props.missingExercises,
    programDone: props.programDone,
    isMicrocycleBreak: props.isMicrocycleBreak,
    completedSessions: props.completedSessions,
    completedMicrocycle: props.completedMicrocycle,
    currentDayIdx: props.currentDayIdx,
    currentWeekIdx: props.currentWeekIdx,
    currentTrainingExercises: props.currentTrainingExercises,
    nextSessions: props.nextSessions,
    nextDayIdx: props.nextDayIdx,
    nextWeekIdx: props.nextWeekIdx,
    nextTrainingExercises: props.nextTrainingExercises,
  });

  return (
    <div className="theory-shell">
      <HeroSection
        label="Training"
        title="Программа тренировок"
        subtitle={props.programSubtitle ?? '8 недель · 3 дня в неделю · волновая прогрессия'}
      />
      <div className="theory-stack">
        <TrainingStateRouter
          state={state}
          totalSessions={props.totalSessions}
          trainingDays={props.trainingDays}
          trainingPreferences={props.trainingPreferences}
          handlers={{
            onGoCalculator: props.onGoCalculator,
            onComplete: props.handleComplete,
            onDismissBreak: () => props.setRestDismissed(true),
            onReset: props.handleReset,
            onPreferencesChange: props.updateTrainingPreferences,
          }}
        />
      </div>
    </div>
  );
}
