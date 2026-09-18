import assert from 'node:assert/strict';
import test from 'node:test';
import {
  PERIODIZATION_HIERARCHY,
  PERIODIZATION_MODELS,
  PERIODIZATION_SCIENCE,
  PROGRESSION_LESSON_GROUPS,
  SPECIAL_METHODS,
} from '@training/shared/data/theory';

test('PROGRESSION_LESSON_GROUPS has four lecture sections', () => {
  assert.equal(PROGRESSION_LESSON_GROUPS.length, 4);
  assert.deepEqual(
    PROGRESSION_LESSON_GROUPS.map(group => group.step),
    ['10.1', '10.2', '10.3', '10.4'],
  );
  for (const group of PROGRESSION_LESSON_GROUPS) {
    assert.ok(group.checkIn?.question);
    assert.ok(group.topics.length >= 1);
    for (const topic of group.topics) {
      assert.ok(topic.lecture.length >= 3);
      assert.ok(topic.lecture.length <= 6);
    }
  }
});

test('PROGRESSION lecture stays within callout and case caps', () => {
  const topics = PROGRESSION_LESSON_GROUPS.flatMap(group => group.topics);
  assert.ok(topics.filter(topic => topic.callout).length <= 3);
  assert.ok(topics.filter(topic => topic.caseStudy).length <= 3);
});

test('PROGRESSION lecture does not copy Epley, construction, or tendon window', () => {
  const blob = PROGRESSION_LESSON_GROUPS.flatMap(group =>
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
  assert.equal(blob.includes('4,5–6,5'), false);
});

test('periodization widget contracts are unchanged', () => {
  assert.equal(PERIODIZATION_HIERARCHY.length, 5);
  assert.equal(PERIODIZATION_SCIENCE.length, 5);
  assert.equal(PERIODIZATION_MODELS.length, 4);
  assert.equal(SPECIAL_METHODS.length, 14);
});
