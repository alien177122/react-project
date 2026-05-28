import type {ActiveProgram, UserData} from '../types';

export function isProgramV3Enabled(): boolean {
  return import.meta.env.VITE_ENABLE_PROGRAM_V3 === 'true';
}

export function getActiveProgram(userData: UserData | null | undefined): ActiveProgram {
  return userData?.activeProgram ?? '2.0';
}

export function shouldPromptProgramSelector(userData: UserData | null | undefined): boolean {
  if (!userData || !isProgramV3Enabled()) return false;
  return userData.activeProgram === undefined;
}
