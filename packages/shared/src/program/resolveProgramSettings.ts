import type {ActiveProgram, ProgramSettings} from '../../types/index.ts';
import {resolveProgramSettingsFromUser} from './progressionPresets.ts';

export function resolveProgramSettings(
  userData: {programSettings?: ProgramSettings; activeProgram?: ActiveProgram} | null | undefined,
  activeProgram: ActiveProgram = '2.0',
): ProgramSettings {
  const resolved = resolveProgramSettingsFromUser(
    userData ? {...userData, activeProgram: userData.activeProgram ?? activeProgram} : null,
  );
  return resolved.programSettings;
}
