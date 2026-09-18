import assert from 'node:assert/strict';
import test from 'node:test';
import {SUPPLEMENT_TIERS, TIER_LESSON_GROUPS} from '@training/shared/data/theory';

test('TIER_LESSON_GROUPS has four lecture sections', () => {
  assert.equal(TIER_LESSON_GROUPS.length, 4);
  assert.deepEqual(
    TIER_LESSON_GROUPS.map(group => group.step),
    ['3.1', '3.2', '3.3', '3.4'],
  );
  for (const group of TIER_LESSON_GROUPS) {
    assert.ok(group.checkIn?.question);
    assert.ok(group.topics.length >= 1);
    for (const topic of group.topics) {
      assert.ok(topic.lecture.length >= 3);
      assert.ok(topic.lecture.length <= 6);
    }
  }
});

test('TIER lecture stays within callout and case caps', () => {
  const topics = TIER_LESSON_GROUPS.flatMap(group => group.topics);
  assert.ok(topics.filter(topic => topic.callout).length <= 3);
  assert.ok(topics.filter(topic => topic.caseStudy).length <= 3);
});

test('TIER lecture does not copy Top-3 doses', () => {
  const blob = TIER_LESSON_GROUPS.flatMap(group =>
    group.topics.flatMap(topic => [
      ...topic.lecture,
      topic.definition,
      topic.pattern ?? '',
      ...(topic.bullets ?? []),
      topic.callout?.value ?? '',
      topic.callout?.caption ?? '',
      topic.caseStudy?.title ?? '',
      topic.caseStudy?.body ?? '',
    ]),
  ).join(' ');
  assert.equal(blob.includes('3–5 г'), false);
  assert.equal(blob.includes('200 мг'), false);
  assert.equal(blob.includes('20 г'), false);
});

test('SUPPLEMENT_TIERS pyramid contract is unchanged', () => {
  assert.deepEqual(
    SUPPLEMENT_TIERS.map(tier => tier.tier),
    ['S', 'A', 'B', 'C', 'D', 'E', 'F'],
  );
  for (const tier of SUPPLEMENT_TIERS) {
    assert.ok(tier.label);
    assert.ok(tier.note);
    assert.ok(tier.items.length >= 1);
  }
});
