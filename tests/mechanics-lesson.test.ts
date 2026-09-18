import assert from 'node:assert/strict';
import test from 'node:test';
import {MECHANICAL_CONCEPTS, MECHANICS_LESSON_GROUPS} from '@training/shared/data/theory';

test('MECHANICS_LESSON_GROUPS has four lecture sections', () => {
  assert.equal(MECHANICS_LESSON_GROUPS.length, 4);
  assert.deepEqual(
    MECHANICS_LESSON_GROUPS.map(group => group.step),
    ['8.1', '8.2', '8.3', '8.4'],
  );
  for (const group of MECHANICS_LESSON_GROUPS) {
    assert.ok(group.checkIn?.question);
    assert.ok(group.topics.length >= 1);
    for (const topic of group.topics) {
      assert.ok(topic.lecture.length >= 3);
      assert.ok(topic.lecture.length <= 6);
    }
  }
});

test('MECHANICS lecture stays within callout and case caps', () => {
  const topics = MECHANICS_LESSON_GROUPS.flatMap(group => group.topics);
  assert.ok(topics.filter(topic => topic.callout).length <= 3);
  assert.ok(topics.filter(topic => topic.caseStudy).length <= 3);
});

test('MECHANICS lecture does not copy Epley, construction, clusters, or tendon window', () => {
  const blob = MECHANICS_LESSON_GROUPS.flatMap(group =>
    group.topics.flatMap(topic => [
      ...topic.lecture,
      topic.definition,
      topic.pattern ?? '',
      ...(topic.bullets ?? []),
    ]),
  ).join(' ');
  assert.equal(blob.includes('Эпли'), false);
  assert.equal(blob.includes('прораб'), false);
  assert.equal(blob.includes('кластер'), false);
  assert.equal(blob.includes('4,5–6,5'), false);
});

test('MECHANICAL_CONCEPTS card contract is unchanged', () => {
  assert.equal(MECHANICAL_CONCEPTS.length, 9);
  assert.deepEqual(
    MECHANICAL_CONCEPTS.map(item => item.id),
    [
      'formula',
      'torque',
      'moments',
      'anthropometry',
      'squat',
      'bench',
      'deadlift',
      'no-universal',
      'mistakes',
    ],
  );
  for (const item of MECHANICAL_CONCEPTS) {
    assert.ok(item.definition);
    assert.ok(item.bullets.length >= 1);
  }
});
