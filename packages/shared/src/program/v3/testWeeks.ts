import type {TestResult, TestWeekNumber} from '../../types/index.ts';

export function getTestAnchorWeek(programWeek: number): TestWeekNumber | null {
  if (programWeek >= 5 && programWeek <= 8) return 4;
  if (programWeek >= 9 && programWeek <= 12) return 8;
  if (programWeek >= 13 && programWeek <= 16) return 12;
  return null;
}

export function getTestResultForExercise(
  exerciseKey: string,
  anchorWeek: TestWeekNumber,
  testResults: TestResult[] | undefined,
): TestResult | undefined {
  return testResults?.find(
    result => result.exerciseKey === exerciseKey && result.testWeek === anchorWeek,
  );
}

export function isTestWeek(programWeek: number): boolean {
  return programWeek === 4 || programWeek === 8 || programWeek === 12 || programWeek === 16;
}
