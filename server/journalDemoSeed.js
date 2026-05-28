/** Demo account for journal UI previews and manual QA. */

export const JOURNAL_DEMO_NAME = 'JournalDemo';
export const JOURNAL_DEMO_PASSWORD = 'Squat123!';

function localDateDaysAgo(daysAgo) {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() - daysAgo);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function isoAtNoonDaysAgo(daysAgo) {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
}

/** @param {{ w: number; r: number; rpe?: number }[]} sets */
function mapSets(sets) {
  return sets.map((set, index) => ({
    setIndex: index + 1,
    weight: set.w,
    reps: set.r,
    ...(set.rpe != null ? {rpe: set.rpe} : {}),
  }));
}

function makeSession(exerciseKey, daysAgo, sets, sessionNote) {
  const date = localDateDaysAgo(daysAgo);
  const createdAt = isoAtNoonDaysAgo(daysAgo);
  return {
    id: `demo-${exerciseKey}-${daysAgo}`,
    exerciseKey,
    date,
    sets: mapSets(sets),
    createdAt,
    updatedAt: createdAt,
    ...(sessionNote ? {sessionNote} : {}),
  };
}

/** @param {number[]} daysAgoList @param {number[]} weights */
function liftHistory(exerciseKey, daysAgoList, weights, reps = 5) {
  return daysAgoList.map((daysAgo, index) => {
    const weight = weights[index];
    return makeSession(exerciseKey, daysAgo, [
      {w: weight, r: reps, rpe: 8},
      {w: weight, r: reps, rpe: 8},
      {w: Math.max(weight - 2.5, 1), r: reps + 1, rpe: 8.5},
    ]);
  });
}

export function buildJournalDemoUserData() {
  const seedDate = localDateDaysAgo(0);

  const exercises = [
    {exerciseKey: 'bench', testWeight: 90, testReps: 5, oneRM: 102.5, date: seedDate},
    {exerciseKey: 'squat', testWeight: 120, testReps: 5, oneRM: 136.5, date: seedDate},
    {exerciseKey: 'row', testWeight: 80, testReps: 6, oneRM: 96, date: seedDate},
    {exerciseKey: 'ohp', testWeight: 55, testReps: 6, oneRM: 66, date: seedDate},
    {exerciseKey: 'curl', testWeight: 35, testReps: 8, oneRM: 44.3, date: seedDate},
    {exerciseKey: 'dbPress', testWeight: 28, testReps: 10, oneRM: 37.3, date: seedDate},
    {exerciseKey: 'lateralRaise', testWeight: 12, testReps: 12, oneRM: 16.8, date: seedDate},
    {exerciseKey: 'legPress', testWeight: 180, testReps: 8, oneRM: 228, date: seedDate},
    {exerciseKey: 'legExt', testWeight: 55, testReps: 10, oneRM: 73.3, date: seedDate},
    {exerciseKey: 'legCurl', testWeight: 45, testReps: 10, oneRM: 60, date: seedDate},
    {exerciseKey: 'gluteBridge', testWeight: 100, testReps: 8, oneRM: 126.7, date: seedDate},
    {
      exerciseKey: 'pullUp',
      testWeight: 86,
      testReps: 6,
      oneRM: 96.3,
      bodyWeight: 80,
      date: seedDate,
    },
  ];

  const weekOffsets = [56, 49, 42, 35, 28, 21, 14, 7, 0];

  const journal = [
    ...liftHistory('bench', weekOffsets, [80, 82.5, 85, 87.5, 87.5, 90, 90, 92.5, 92.5]),
    ...liftHistory('squat', weekOffsets, [100, 105, 110, 112.5, 112.5, 115, 117.5, 120, 120]),
    ...liftHistory('row', weekOffsets, [70, 72.5, 75, 77.5, 77.5, 80, 80, 82.5, 82.5], 6),
    ...liftHistory('ohp', weekOffsets, [45, 47.5, 50, 52.5, 52.5, 55, 55, 57.5, 57.5], 6),
    ...liftHistory('curl', weekOffsets, [28, 30, 30, 32.5, 32.5, 35, 35, 37.5, 37.5], 8),
    ...liftHistory('dbPress', [42, 28, 21, 14, 7, 0], [24, 26, 27, 28, 29, 30], 10),
    ...liftHistory('legPress', [42, 28, 14, 0], [160, 170, 175, 180], 8),
    ...weekOffsets.slice(3).map((daysAgo, index) => {
      const extra = index * 2.5;
      const total = 80 + extra;
      return makeSession(
        'pullUp',
        daysAgo,
        [
          {w: total, r: 6, rpe: 8},
          {w: total, r: 5, rpe: 8.5},
          {w: total - 2.5, r: 6, rpe: 8},
        ],
        extra > 0 ? `Доп. вес +${extra} кг` : 'Собственный вес',
      );
    }),
  ];

  return {
    name: JOURNAL_DEMO_NAME,
    exercises,
    journal,
    trainingProgress: {completedSessions: 6},
    activeProgram: '2.0',
  };
}

/**
 * @param {ReturnType<import('./db.js').createDb>} db
 * @param {{ hash: (value: string, rounds: number) => Promise<string> }} bcrypt
 */
export async function applyJournalDemoSeed(db, bcrypt) {
  const hash = await bcrypt.hash(JOURNAL_DEMO_PASSWORD, 10);

  if (!db.userExists(JOURNAL_DEMO_NAME)) {
    db.createUser(JOURNAL_DEMO_NAME, hash);
  }

  db.putUser(JOURNAL_DEMO_NAME, buildJournalDemoUserData());
}
