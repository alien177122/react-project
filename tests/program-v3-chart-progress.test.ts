import assert from 'node:assert/strict';
import {describe, it} from 'node:test';
import {buildProgramV3ChartRows, filterProgramV3ChartWeeks} from '@training/shared/program/v3';

describe('ProgramV3 chart progress', () => {
  it('filters prep weeks from chart geometry', () => {
    const rows = buildProgramV3ChartRows({exerciseKey: 'bench', testResults: []});
    const chart = filterProgramV3ChartWeeks(rows);
    assert.equal(rows.length, 16);
    assert.equal(chart.length, 13);
    assert.deepEqual(
      chart.map(row => row.week),
      [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    );
  });

  it('prep list rows use RM labels without kg', () => {
    const rows = buildProgramV3ChartRows({exerciseKey: 'bench', testResults: []});
    assert.equal(rows[0]?.loadLabel, '12ПМ');
    assert.equal(rows[0]?.weight, null);
    assert.equal(rows[1]?.loadLabel, '10ПМ');
    assert.equal(rows[2]?.loadLabel, '10ПМ');
  });

  it('week 4 test shows ? in list, no chart weight', () => {
    const rows = buildProgramV3ChartRows({
      exerciseKey: 'bench',
      testResults: [],
      draft: {weight: 80, reps: 6},
    });
    const w4 = rows.find(row => row.week === 4);
    assert.equal(w4?.weightDisplay, '?');
    assert.equal(w4?.weight, null);
    assert.equal(w4?.isTestWeek, true);
  });

  it('weeks 5–7 use draft anchor when no test logged', () => {
    const rows = buildProgramV3ChartRows({
      exerciseKey: 'bench',
      testResults: [],
      draft: {weight: 80, reps: 6},
    });
    const w5 = rows.find(row => row.week === 5);
    const w6 = rows.find(row => row.week === 6);
    const w7 = rows.find(row => row.week === 7);
    assert.equal(w5?.status, 'ok');
    assert.equal(w5?.weight, 67.5);
    assert.equal(w5?.isPreviewWeight, true);
    assert.equal(w6?.weight, 72.5);
    assert.equal(w7?.weight, 62.5);
  });

  it('weeks 5–7 use real test when logged', () => {
    const rows = buildProgramV3ChartRows({
      exerciseKey: 'bench',
      testResults: [
        {
          exerciseKey: 'bench',
          testWeek: 4,
          weight: 50,
          reps: 8,
          date: '2026-05-01',
        },
      ],
    });
    const w5 = rows.find(row => row.week === 5);
    assert.equal(w5?.status, 'ok');
    assert.equal(w5?.weight, 45);
    assert.equal(w5?.isPreviewWeight, false);
  });

  it('maps meso phase labels for list display', () => {
    const rows = buildProgramV3ChartRows({
      exerciseKey: 'bench',
      testResults: [],
      draft: {weight: 80, reps: 6},
    });
    assert.equal(rows.find(row => row.week === 5)?.phaseLabel, 'Объем');
    assert.equal(rows.find(row => row.week === 6)?.phaseLabel, 'Сила');
    assert.equal(rows.find(row => row.week === 7)?.phaseLabel, 'Гипертрофия');
  });
});
