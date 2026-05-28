import {AnimatePresence, motion, useReducedMotion} from 'framer-motion';
import type {
  ActiveProgram,
  ProgramSettings,
  SavedExercise,
  TrainingDayDef,
  TrainingPreferences,
  UserData,
} from '../../types';
import CalculatorTabV3 from '../../screens/CalculatorTabV3';
import type {TrainingExerciseRow} from '../../utils/training';
import CalculatorTab from '../../screens/CalculatorTab';
import {JournalTab} from '../../screens/JournalTab';
import {SplitConstructorTab} from '../../screens/SplitConstructorTab';
import TrainingTab from '../../screens/TrainingTab';
import TheoryTab from '../TheoryTab';
import ProgressionPresetPicker from '../calculator/ProgressionPresetPicker';
import type {AppTab} from './tabs';

interface TabPanelProps {
  activeTab: AppTab;
  activeProgram: ActiveProgram;
  userData: UserData;
  programSettings: ProgramSettings;
  onProgramSettingsChange: (patch: Partial<ProgramSettings>) => void;
  journal: {
    setUserData: (value: UserData) => void;
    token: string;
    onSaveError: (message: string) => void;
  };
  split: {
    setUserData: (value: UserData) => void;
    token: string;
    onSaveError: (message: string) => void;
  };
  calculator: {
    selectedExercise: string;
    selectExercise: (key: string) => void;
    testWeight: string;
    setTestWeight: (value: string) => void;
    testBodyWeight: string;
    setTestBodyWeight: (value: string) => void;
    testExtraWeight: string;
    setTestExtraWeight: (value: string) => void;
    testReps: string;
    setTestReps: (value: string) => void;
    activeResult: SavedExercise | null;
    handleCalculate: () => void;
    handleDelete: (key: string) => void;
    handleSelectSaved: (saved: SavedExercise) => void;
  };
  training: {
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
  };
}

export function TabPanel({
  activeTab,
  activeProgram,
  userData,
  programSettings,
  onProgramSettingsChange,
  calculator,
  training,
  journal,
  split,
}: TabPanelProps) {
  const reduceMotion = useReducedMotion();
  const calculatorBodyKey = `calculator-body-${activeProgram}`;
  const panelKey = activeTab;

  return (
    <>
      {activeTab === 'calculator' ? (
        <div className="ta-shell ta-shell--calc-settings">
          <ProgressionPresetPicker settings={programSettings} onChange={onProgramSettingsChange} />
        </div>
      ) : null}
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={activeTab === 'calculator' ? calculatorBodyKey : panelKey}
          initial={reduceMotion ? false : {opacity: 0, y: 8}}
          animate={{opacity: 1, y: 0}}
          exit={reduceMotion ? undefined : {opacity: 0, y: -4}}
          transition={reduceMotion ? {duration: 0} : {duration: 0.2, ease: [0.4, 0, 0.2, 1]}}>
          {activeTab === 'calculator' &&
            (activeProgram === '3.0' ? (
              <CalculatorTabV3 userData={userData} programSettings={programSettings} />
            ) : (
              <CalculatorTab
                userData={userData}
                programSettings={programSettings}
                {...calculator}
              />
            ))}
          {activeTab === 'theory' && <TheoryTab />}
          {activeTab === 'training' && (
            <TrainingTab
              userData={userData}
              {...training}
              totalSessions={training.totalSessions ?? 24}
              trainingDays={training.trainingDays}
              programSubtitle={training.programSubtitle}
            />
          )}
          {activeTab === 'split' && (
            <SplitConstructorTab
              userData={userData}
              setUserData={split.setUserData}
              token={split.token}
              onSaveError={split.onSaveError}
            />
          )}
          {activeTab === 'journal' && (
            <JournalTab
              userData={userData}
              setUserData={journal.setUserData}
              token={journal.token}
              onSaveError={journal.onSaveError}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
