import assert from 'node:assert/strict';
import test from 'node:test';
import {STRENGTH_FORMULA_OVERVIEW} from '@training/shared/data/strength-formula';
import {STRENGTH_LESSON_GROUPS} from '@training/shared/data/theory';

test('STRENGTH_LESSON_GROUPS has four lecture sections', () => {
  assert.equal(STRENGTH_LESSON_GROUPS.length, 4);
  assert.deepEqual(
    STRENGTH_LESSON_GROUPS.map(group => group.step),
    ['9.1', '9.2', '9.3', '9.4'],
  );
  for (const group of STRENGTH_LESSON_GROUPS) {
    assert.ok(group.checkIn?.question);
    assert.ok(group.topics.length >= 1);
    for (const topic of group.topics) {
      assert.ok(topic.lecture.length >= 3);
      assert.ok(topic.lecture.length <= 6);
    }
  }
});

test('STRENGTH lecture stays within callout and case caps', () => {
  const topics = STRENGTH_LESSON_GROUPS.flatMap(group => group.topics);
  assert.ok(topics.filter(topic => topic.callout).length <= 3);
  assert.ok(topics.filter(topic => topic.caseStudy).length <= 3);
});

test('STRENGTH lecture does not copy Epley, construction, clusters, or tendon window', () => {
  const blob = STRENGTH_LESSON_GROUPS.flatMap(group =>
    group.topics.flatMap(topic => [
      ...topic.lecture,
      topic.definition,
      topic.pattern ?? '',
      ...(topic.bullets ?? []),
      topic.callout?.value ?? '',
      topic.callout?.caption ?? '',
      topic.caseStudy?.title ?? '',
      topic.caseStudy?.body ?? '',
      group.checkIn?.question ?? '',
      group.checkIn?.answer ?? '',
    ]),
  ).join(' ');
  assert.equal(blob.includes('Эпли'), false);
  assert.equal(blob.includes('прораб'), false);
  assert.equal(blob.includes('кластер'), false);
  assert.equal(blob.includes('4,5–6,5'), false);
});

test('STRENGTH_FORMULA_OVERVIEW contract is unchanged', () => {
  assert.equal(STRENGTH_FORMULA_OVERVIEW.formulaParts.length, 5);
});
