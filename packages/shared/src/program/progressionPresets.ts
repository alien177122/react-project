import type {ActiveProgram, ProgressionPreset, ProgramSettings} from '../../types/index.ts';
import {DEFAULT_PROGRAM_SETTINGS} from '../../types/index.ts';
import type {WeekScheduleRow} from './v3/weekSchedule.ts';
import {WEEK_SCHEDULE_V3} from './v3/weekSchedule.ts';
import {DAYS_PER_WEEK_V3} from './v3/constants.ts';

export type {ProgressionPreset};

export interface ProgressionPresetMeta {
  label: string;
  description: string;
  programLabel: string;
}

export const PROGRESSION_PRESET_ORDER: ProgressionPreset[] = ['general', 'strength'];

export const PROGRESSION_PRESET_META: Record<ProgressionPreset, ProgressionPresetMeta> = {
  general: {
    label: 'Оптимальная',
    description: '8-недельная волна % по упражнениям',
    programLabel: 'Оптимальная',
  },
  strength: {
    label: 'На силу',
    description: '16 недель, Brzycki и тестовые недели',
    programLabel: 'На силу',
  },
};

const LEGACY_PRESET_MAP: Record<string, ProgressionPreset> = {
  average: 'general',
  heavier: 'strength',
  more_power: 'strength',
};

/** Migrate stored preset ids from legacy heuristics to the two Excel tracks. */
export function normalizeProgressionPreset(value: unknown): ProgressionPreset {
  if (value === 'general' || value === 'strength') return value;
  if (typeof value === 'string' && value in LEGACY_PRESET_MAP) {
    return LEGACY_PRESET_MAP[value];
  }
  return 'general';
}

/** Excel track: general → Program 2.0, strength → Program 3.0. */
export function getActiveProgramForPreset(preset: ProgressionPreset): ActiveProgram {
  return preset === 'strength' ? '3.0' : '2.0';
}

export function getPresetForActiveProgram(program: ActiveProgram): ProgressionPreset {
  return program === '3.0' ? 'strength' : 'general';
}

export function getDefaultDaysForPreset(preset: ProgressionPreset): 3 | 4 {
  return preset === 'strength' ? DAYS_PER_WEEK_V3 : 3;
}

export interface ProgramSettingsChangeResult {
  programSettings: ProgramSettings;
  activeProgram: ActiveProgram;
}

/** Keeps preset, daysPerWeek and activeProgram aligned (Оптимальная·3 ↔ 2.0, На силу·4 ↔ 3.0). */
export function applyProgramSettingsPatch(
  current: ProgramSettings,
  patch: Partial<ProgramSettings>,
): ProgramSettingsChangeResult {
  if (patch.progressionPreset !== undefined) {
    const preset = normalizeProgressionPreset(patch.progressionPreset);
    return {
      programSettings: {
        progressionPreset: preset,
        daysPerWeek: getDefaultDaysForPreset(preset),
      },
      activeProgram: getActiveProgramForPreset(preset),
    };
  }

  if (patch.daysPerWeek !== undefined) {
    const days = patch.daysPerWeek;
    const preset: ProgressionPreset = days === 4 ? 'strength' : 'general';
    return {
      programSettings: {progressionPreset: preset, daysPerWeek: days},
      activeProgram: getActiveProgramForPreset(preset),
    };
  }

  return {
    programSettings: current,
    activeProgram: getActiveProgramForPreset(current.progressionPreset),
  };
}

/** Resolve settings from stored user data, syncing with activeProgram when needed. */
export function resolveProgramSettingsFromUser(
  userData: {programSettings?: ProgramSettings; activeProgram?: ActiveProgram} | null | undefined,
): ProgramSettingsChangeResult {
  const activeProgram = userData?.activeProgram ?? '2.0';
  const stored = userData?.programSettings;

  if (stored) {
    const normalized = applyProgramSettingsPatch(DEFAULT_PROGRAM_SETTINGS, stored);
    const expectedProgram = getActiveProgramForPreset(normalized.programSettings.progressionPreset);
    if (expectedProgram === activeProgram) {
      return normalized;
    }
    return applyProgramSettingsPatch(DEFAULT_PROGRAM_SETTINGS, {
      progressionPreset: getPresetForActiveProgram(activeProgram),
    });
  }

  const preset = getPresetForActiveProgram(activeProgram);
  return {
    programSettings: {
      progressionPreset: preset,
      daysPerWeek: getDefaultDaysForPreset(preset),
    },
    activeProgram,
  };
}

/** Program 3.0 week schedule (single Brzycki wave from Excel v3). */
export function getWeekScheduleV3(_preset: ProgressionPreset = 'strength'): WeekScheduleRow[] {
  return WEEK_SCHEDULE_V3;
}

/** Program 2.0: base exercise % is unchanged (no heuristic offsets). */
export function applyProgressionPresetToPercent(
  basePercent: number,
  _preset: ProgressionPreset,
): number {
  return basePercent;
}

/** Program 2.0: base sets×reps unchanged. */
export function applyProgressionPresetToScheme(
  sets: number,
  reps: number,
  _preset: ProgressionPreset,
): {sets: number; reps: number} {
  return {sets, reps};
}
