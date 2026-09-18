export const SPLIT_LIMITS = {
  MAX_SPLITS: 50,
  MAX_CALCULATIONS: 50,
  MAX_NAME_LENGTH: 40,
  MAX_DAY_LABEL_LENGTH: 20,
};

export const LEG_EXERCISE_KEYS = new Set([
  'squat',
  'legPress',
  'legExt',
  'legCurl',
  'gluteBridge',
  'seatedCalfRaise',
]);

const SPLIT_MUSCLES = new Set(['chest', 'biceps', 'legs', 'shoulders', 'back', 'triceps']);
const WEIGHT_MODES = new Set(['progression', 'fixed', 'scheme_only']);

export function pruneSplits(splits) {
  return [...splits]
    .sort((a, b) => String(b.updatedAt ?? '').localeCompare(String(a.updatedAt ?? '')))
    .slice(0, SPLIT_LIMITS.MAX_SPLITS);
}

export function isSplitMuscle(value) {
  return SPLIT_MUSCLES.has(value);
}

export function isWeightMode(value) {
  return WEIGHT_MODES.has(value);
}

export function normalizeLegExercisesArray(input) {
  if (!Array.isArray(input)) return null;
  const picked = [];
  for (const key of input) {
    if (typeof key !== 'string' || !LEG_EXERCISE_KEYS.has(key.trim())) continue;
    const id = key.trim();
    if (picked.includes(id)) continue;
    picked.push(id);
    if (picked.length === 2) break;
  }
  if (picked.length !== 2) return null;
  return picked;
}
