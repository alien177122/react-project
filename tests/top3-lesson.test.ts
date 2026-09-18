import assert from 'node:assert/strict';
import test from 'node:test';
import {TOP3_LESSON_GROUPS, TOP_THREE_SUPPLEMENTS} from '@training/shared/data/theory';

test('TOP3_LESSON_GROUPS has four lecture sections', () => {
  assert.equal(TOP3_LESSON_GROUPS.length, 4);
  assert.deepEqual(
    TOP3_LESSON_GROUPS.map(group => group.step),
    ['4.1', '4.2', '4.3', '4.4'],
  );
  for (const group of TOP3_LESSON_GROUPS) {
    assert.ok(group.checkIn?.question);
    assert.ok(group.topics.length >= 1);
    for (const topic of group.topics) {
      assert.ok(topic.lecture.length >= 3);
      assert.ok(topic.lecture.length <= 6);
    }
  }
});

test('TOP3 lecture stays within callout and case caps', () => {
  const topics = TOP3_LESSON_GROUPS.flatMap(group => group.topics);
  assert.ok(topics.filter(topic => topic.callout).length <= 3);
  assert.ok(topics.filter(topic => topic.caseStudy).length <= 3);
});

test('TOP3 lecture does not copy podium mechanisms', () => {
  const blob = TOP3_LESSON_GROUPS.flatMap(group =>
    group.topics.flatMap(topic => [...topic.lecture, topic.definition]),
  ).join(' ');
  assert.equal(blob.includes('PCr'), false);
  assert.equal(blob.includes('фосфокреатин'), false);
  assert.equal(blob.includes('аденозин'), false);
});

test('TOP_THREE_SUPPLEMENTS podium contract is unchanged', () => {
  assert.equal(TOP_THREE_SUPPLEMENTS.length, 3);
  assert.deepEqual(
    TOP_THREE_SUPPLEMENTS.map(item => item.id),
    ['creatine', 'caffeine', 'magnesium'],
  );
  for (const item of TOP_THREE_SUPPLEMENTS) {
    assert.ok(item.dose);
    assert.ok(item.definition);
    assert.ok(item.pattern);
    assert.ok(item.bullets.length >= 1);
  }
});
