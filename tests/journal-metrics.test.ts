import test from 'node:test'
import assert from 'node:assert/strict'
import {
  buildPeakSeries,
  deltaLastWeeks,
  e1rm,
  sessionPeak,
  sessionVolume,
} from '@training/shared/utils/journalMetrics'

test('e1rm increases with reps at same weight', () => {
  assert.ok(e1rm(100, 8) > e1rm(100, 5))
})

test('sessionPeak picks highest estimated max', () => {
  const peak = sessionPeak([
    { setIndex: 1, weight: 80, reps: 5 },
    { setIndex: 2, weight: 75, reps: 10 },
  ])
  assert.equal(peak, sessionPeak([{ setIndex: 1, weight: 75, reps: 10 }]))
})

test('sessionVolume sums weight × reps', () => {
  assert.equal(
    sessionVolume([
      { setIndex: 1, weight: 100, reps: 5 },
      { setIndex: 2, weight: 50, reps: 10 },
    ]),
    1000,
  )
})

test('buildPeakSeries keeps at most 8 points', () => {
  const sessions = Array.from({ length: 12 }, (_, index) => ({
    date: `2026-01-${String(index + 1).padStart(2, '0')}`,
    sets: [{ setIndex: 1, weight: 80 + index, reps: 5 }],
  }))
  assert.equal(buildPeakSeries(sessions, 8).length, 8)
})

test('deltaLastWeeks returns difference', () => {
  const points = [
    { date: '2026-01-01', peak: 100 },
    { date: '2026-01-08', peak: 105 },
    { date: '2026-01-15', peak: 110 },
  ]
  assert.equal(deltaLastWeeks(points, 2), 10)
})
