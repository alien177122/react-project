import type {ActiveProgram, ProgressionPreset, ProgramSettings} from '../../types/index.ts';
import {DEFAULT_PROGRAM_SETTINGS, PROGRAM_DAYS_PER_WEEK} from '../../types/index.ts';

export type {ProgressionPreset};

export interface ProgressionPresetMeta {
  label: string;
  description: string;
  programLabel: string;
}

export const PROGRESSION_PRESET_ORDER: ProgressionPreset[] = ['general'];

export const PROGRESSION_PRESET_META: Record<ProgressionPreset, ProgressionPresetMeta> = {
  general: {
    label: 'Оптимальная',
    description: '8-недельная волна % по упражнениям',
    programLabel: 'Оптимальная',
  },
};

const LEGACY_PRESET_VALUES = new Set(['average', 'heavier', 'more_power', 'strength', 'general']);

/** Migrate stored preset ids to the single optimal track. */
export function normalizeProgressionPreset(value: unknown): ProgressionPreset {
  if (typeof value === 'string' && LEGACY_PRESET_VALUES.has(value)) {
    return 'general';
  }
  return 'general';
}

export function getActiveProgramForPreset(_preset: ProgressionPreset = 'general'): ActiveProgram {
  void _preset;
  return '2.0';
}

export function getPresetForActiveProgram(_program: ActiveProgram = '2.0'): ProgressionPreset {
  void _program;
  return 'general';
}

export function getDefaultDaysForPreset(
  _preset: ProgressionPreset = 'general',
): typeof PROGRAM_DAYS_PER_WEEK {
  void _preset;
  return PROGRAM_DAYS_PER_WEEK;
}

export interface ProgramSettingsChangeResult {
  programSettings: ProgramSettings;
  activeProgram: ActiveProgram;
}

function canonicalProgramSettings(): ProgramSettings {
  return {
    progressionPreset: 'general',
    daysPerWeek: PROGRAM_DAYS_PER_WEEK,
  };
}

/** Always resolves to optimal track · 2 days · Program 2.0. */
export function applyProgramSettingsPatch(
  _current: ProgramSettings,
  _patch: Partial<ProgramSettings>,
): ProgramSettingsChangeResult {
  void _current;
  void _patch;
  return {
    programSettings: canonicalProgramSettings(),
    activeProgram: '2.0',
  };
}

/** Resolve settings from stored user data, migrating legacy strength / 3–4 day configs. */
export function resolveProgramSettingsFromUser(
  userData: {programSettings?: ProgramSettings; activeProgram?: ActiveProgram} | null | undefined,
): ProgramSettingsChangeResult {
  void userData;
  return {
    programSettings: canonicalProgramSettings(),
    activeProgram: '2.0',
  };
}

/** Program 2.0: base exercise % is unchanged (no heuristic offsets). */
export function applyProgressionPresetToPercent(
  basePercent: number,
  _preset: ProgressionPreset = 'general',
): number {
  void _preset;
  return basePercent;
}

/** Program 2.0: base sets×reps unchanged. */
export function applyProgressionPresetToScheme(
  sets: number,
  reps: number,
  _preset: ProgressionPreset = 'general',
): {sets: number; reps: number} {
  void _preset;
  return {sets, reps};
}

export {DEFAULT_PROGRAM_SETTINGS};
