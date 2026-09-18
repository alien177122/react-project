/** Whitelist aligned with packages/shared/src/data/exercises.ts EXERCISES keys. */
export const EXERCISE_CATALOG = {
  bench: {usesBodyWeight: false, isPullup: false},
  squat: {usesBodyWeight: false, isPullup: false},
  gluteBridge: {usesBodyWeight: false, isPullup: false},
  legPress: {usesBodyWeight: false, isPullup: false},
  row: {usesBodyWeight: false, isPullup: false},
  pullUp: {usesBodyWeight: true, isPullup: true},
  ohp: {usesBodyWeight: false, isPullup: false},
  curl: {usesBodyWeight: false, isPullup: false},
  dbPress: {usesBodyWeight: false, isPullup: false},
  lateralRaise: {usesBodyWeight: false, isPullup: false},
  legExt: {usesBodyWeight: false, isPullup: false},
  legCurl: {usesBodyWeight: false, isPullup: false},
  dips: {usesBodyWeight: true, isPullup: false},
  deadlift: {usesBodyWeight: false, isPullup: false},
  lyingTricepExt: {usesBodyWeight: false, isPullup: false},
  seatedCalfRaise: {usesBodyWeight: false, isPullup: false},
};

export function isKnownExerciseKey(key) {
  return Object.prototype.hasOwnProperty.call(EXERCISE_CATALOG, key);
}

export function getExerciseConfig(key) {
  return EXERCISE_CATALOG[key] ?? null;
}
