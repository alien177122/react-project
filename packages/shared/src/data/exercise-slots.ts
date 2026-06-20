/** One program slot satisfied by any listed key (OR). */
export interface ExerciseAltGroup {
  id: string;
  keys: readonly [string, ...string[]];
  label: string;
}

export const DEADLIFT_GLUTE_ALT_GROUP: ExerciseAltGroup = {
  id: 'deadlift-or-glute',
  keys: ['deadlift', 'gluteBridge'],
  label: 'Становая тяга / Ягодичный мост',
};

export const EXERCISE_ALT_GROUPS: readonly ExerciseAltGroup[] = [DEADLIFT_GLUTE_ALT_GROUP];

const ALT_KEYS = new Set(EXERCISE_ALT_GROUPS.flatMap(group => group.keys));

function groupForKey(key: string): ExerciseAltGroup | undefined {
  return EXERCISE_ALT_GROUPS.find(group => (group.keys as readonly string[]).includes(key));
}

export interface ExerciseSlot {
  keys: readonly string[];
  label: string;
}

/** 12 unlock slots (deadlift and gluteBridge share one). */
export function buildExerciseSlots(
  allExerciseKeys: readonly string[],
  nameOf: (key: string) => string,
): ExerciseSlot[] {
  const slots: ExerciseSlot[] = [];
  const slotted = new Set<string>();

  for (const group of EXERCISE_ALT_GROUPS) {
    slots.push({keys: group.keys, label: group.label});
    for (const key of group.keys) slotted.add(key);
  }

  for (const key of allExerciseKeys) {
    if (slotted.has(key)) continue;
    slots.push({keys: [key], label: nameOf(key)});
  }

  return slots;
}

export function isAltExerciseKey(key: string): boolean {
  return ALT_KEYS.has(key);
}

export function isSlotFilled(slot: ExerciseSlot, savedKeys: ReadonlySet<string>): boolean {
  return slot.keys.some(key => savedKeys.has(key));
}

export function countSavedExerciseSlots(
  savedKeys: Iterable<string>,
  slots: readonly ExerciseSlot[],
): number {
  const saved = new Set(savedKeys);
  return slots.filter(slot => isSlotFilled(slot, saved)).length;
}

export function allExerciseSlotsSaved(
  savedKeys: Iterable<string>,
  slots: readonly ExerciseSlot[],
): boolean {
  return countSavedExerciseSlots(savedKeys, slots) === slots.length;
}

export function getMissingExerciseSlotLabels(
  savedKeys: Iterable<string>,
  slots: readonly ExerciseSlot[],
): string[] {
  const saved = new Set(savedKeys);
  return slots.filter(slot => !isSlotFilled(slot, saved)).map(slot => slot.label);
}

/** Prefer saved alt variant; default to first key in group for empty slot. */
export function preferAltExerciseKey(
  keys: readonly string[],
  savedKeys: ReadonlySet<string>,
): string {
  for (const key of keys) {
    if (savedKeys.has(key)) return key;
  }
  return keys[0];
}

/**
 * Maps a program day key to the saved exercise key when alts apply
 * (e.g. TRAINING_DAYS gluteBridge → deadlift if only deadlift is saved).
 */
export function resolveProgramExerciseKey(
  programKey: string,
  savedByKey: ReadonlyMap<string, unknown>,
): string | null {
  const group = groupForKey(programKey);
  if (group) {
    for (const key of group.keys) {
      if (savedByKey.has(key)) return key;
    }
    return null;
  }
  return savedByKey.has(programKey) ? programKey : null;
}
