import test from 'node:test';
import assert from 'node:assert/strict';
import {buildJournalProgressChartModel} from '@training/shared/hooks/useJournalProgressChart';
import {sessionVolume} from '@training/shared/utils/journalMetrics';

test('buildJournalProgressChartModel maps sessions to weeks with e1RM', () => {
  const sessions = [
    {
      id: '1',
      exerciseKey: 'bench',
      date: '2026-05-02',
      sets: [{setIndex: 1, weight: 80, reps: 5}],
      createdAt: '2026-05-02T12:00:00.000Z',
      updatedAt: '2026-05-02T12:00:00.000Z',
    },
    {
      id: '2',
      exerciseKey: 'bench',
      date: '2026-05-30',
      sets: [{setIndex: 1, weight: 92.5, reps: 5}],
      createdAt: '2026-05-30T12:00:00.000Z',
      updatedAt: '2026-05-30T12:00:00.000Z',
    },
  ];

  const model = buildJournalProgressChartModel(sessions);

  assert.equal(model.weekCount, 8);
  assert.equal(model.journalWeeks.filter(week => week.hasData).length, 2);
  assert.ok(model.journalLinePath.includes('M'));
  assert.equal(model.journalWeeks[0]?.hasData, true);
  assert.equal(model.journalWeeks[1]?.hasData, true);
  assert.equal(model.latestPeak != null && model.latestPeak > 100, true);
});

test('buildJournalProgressChartModel scales volume bars by session tonnage not reps alone', () => {
  const sameRepsSessions = [
    {
      id: '1',
      exerciseKey: 'bench',
      date: '2026-05-02',
      sets: [
        {setIndex: 1, weight: 80, reps: 5},
        {setIndex: 2, weight: 80, reps: 5},
        {setIndex: 3, weight: 80, reps: 5},
      ],
      createdAt: '2026-05-02T12:00:00.000Z',
      updatedAt: '2026-05-02T12:00:00.000Z',
    },
    {
      id: '2',
      exerciseKey: 'bench',
      date: '2026-05-09',
      sets: [
        {setIndex: 1, weight: 90, reps: 5},
        {setIndex: 2, weight: 90, reps: 5},
        {setIndex: 3, weight: 90, reps: 5},
      ],
      createdAt: '2026-05-09T12:00:00.000Z',
      updatedAt: '2026-05-09T12:00:00.000Z',
    },
  ];

  const model = buildJournalProgressChartModel(sameRepsSessions);
  const week1 = model.journalWeeks[0];
  const week2 = model.journalWeeks[1];

  assert.equal(week1?.totalReps, week2?.totalReps);
  assert.ok(week1?.volume != null && week2?.volume != null);
  assert.ok(week2.volume! > week1.volume!);
  assert.ok(week2.barHeight! > week1.barHeight!);
  assert.equal(
    week2.barHeight,
    model.journalWeeks.reduce((max, week) => Math.max(max, week.barHeight ?? 0), 0),
  );
  assert.equal(week1?.volume, sessionVolume(sameRepsSessions[0].sets));
  assert.equal(week2?.volume, sessionVolume(sameRepsSessions[1].sets));
});

test('buildJournalProgressChartModel uses journal-only scale for one session', () => {
  const sessions = [
    {
      id: '1',
      exerciseKey: 'bench',
      date: '2026-05-30',
      sets: [{setIndex: 1, weight: 80, reps: 5}],
      createdAt: '2026-05-30T12:00:00.000Z',
      updatedAt: '2026-05-30T12:00:00.000Z',
    },
  ];

  const model = buildJournalProgressChartModel(sessions);

  assert.equal(model.journalWeeks.filter(week => week.hasData).length, 1);
  assert.ok(model.journalLinePath.includes('M'));
  assert.equal(model.latestPeak != null && model.latestPeak > 0, true);
});

test('buildJournalProgressChartModel returns empty slots without sessions', () => {
  const model = buildJournalProgressChartModel([]);

  assert.equal(model.weekCount, 8);
  assert.equal(
    model.journalWeeks.every(week => !week.hasData),
    true,
  );
  assert.equal(model.journalLinePath, '');
  assert.equal(model.latestPeak, null);
});
