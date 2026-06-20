import type {
  SavedExercise,
  TestResult,
  TrainingPreferences,
  ProgramSettings,
} from '../../types/index.ts';
import type {TrainingExerciseRow} from '../../utils/training.ts';
import {DEFAULT_TRAINING_PREFERENCES} from '../../utils/training.ts';
import {buildLinearWorkingSets} from '../../utils/pyramid.ts';
import {resolveProgramSettings} from '../resolveProgramSettings.ts';
import {EXERCISES_V3, TRAINING_DAYS_V3} from './exercises.ts';
import {getPrescription} from './prescription.ts';

export function getTrainingDaysV3(daysPerWeek: number = 4) {
  return TRAINING_DAYS_V3.slice(0, Math.min(daysPerWeek, TRAINING_DAYS_V3.length));
}

export function getTrainingExercisesV3(
  dayIdx: number,
  weekIdx: number,
  _savedExercises: SavedExercise[],
  testResults: TestResult[] | undefined,
  preferences: TrainingPreferences = DEFAULT_TRAINING_PREFERENCES,
  programSettings?: ProgramSettings,
): TrainingExerciseRow[] {
  const settings = programSettings ?? resolveProgramSettings(null, '3.0');
  const days = getTrainingDaysV3(settings.daysPerWeek);
  const day = days[dayIdx];
  if (!day) return [];

  const programWeek = weekIdx + 1;
  const savedByKey = new Map(_savedExercises.map(saved => [saved.exerciseKey, saved]));

  return day.exerciseKeys.flatMap(key => {
    const config = EXERCISES_V3[key];
    if (!config) return [];

    const saved = savedByKey.get(key);
    const prescription = getPrescription(key, programWeek, {
      testResults,
      bodyWeight: saved?.bodyWeight,
      progressionPreset: settings.progressionPreset,
    });

    const scheme = {sets: prescription.sets, reps: prescription.reps};
    const totalWeight = prescription.weight ?? 0;
    const isPullup = !!config.isPullup;
    const extraWeight =
      isPullup && saved?.bodyWeight != null && prescription.weight != null
        ? prescription.weight - saved.bodyWeight
        : undefined;

    const workingSets = buildLinearWorkingSets(
      totalWeight > 0 ? totalWeight : 0,
      scheme.sets,
      scheme.reps,
    );

    const totalReps = workingSets.reduce((sum, set) => sum + set.reps, 0);

    return [
      {
        key,
        name: config.name,
        weight: totalWeight,
        scheme,
        totalReps,
        exerciseType: config.step >= 2.5 ? 'A' : 'C',
        warmupStep: config.step > 0 ? config.step : 2.5,
        isPullup,
        extraWeight,
        progressionMode: preferences.progressionMode,
        workingSets,
        warmupTopWeight: totalWeight,
        loadHint: prescription.loadLabel ?? prescription.message,
        prescriptionStatus: prescription.status,
      },
    ];
  });
}
