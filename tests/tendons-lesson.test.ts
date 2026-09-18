import assert from 'node:assert/strict';
import test from 'node:test';
import {TENDON_PROTOCOL_CONCEPTS, TENDONS_LESSON_GROUPS} from '@training/shared/data/theory';

test('TENDONS_LESSON_GROUPS has four lecture sections', () => {
  assert.equal(TENDONS_LESSON_GROUPS.length, 4);
  assert.deepEqual(
    TENDONS_LESSON_GROUPS.map(group => group.step),
    ['6.1', '6.2', '6.3', '6.4'],
  );
  for (const group of TENDONS_LESSON_GROUPS) {
    assert.ok(group.checkIn?.question);
    assert.ok(group.topics.length >= 1);
    for (const topic of group.topics) {
      assert.ok(topic.lecture.length >= 3);
      assert.ok(topic.lecture.length <= 6);
    }
  }
});

test('TENDONS lecture stays within callout and case caps', () => {
  const topics = TENDONS_LESSON_GROUPS.flatMap(group => group.topics);
  assert.ok(topics.filter(topic => topic.callout).length <= 3);
  assert.ok(topics.filter(topic => topic.caseStudy).length <= 3);
});

test('TENDONS lecture does not copy Epley or clusters from other chapters', () => {
  const blob = TENDONS_LESSON_GROUPS.flatMap(group =>
    group.topics.flatMap(topic => [
      ...topic.lecture,
      topic.definition,
      topic.pattern ?? '',
      ...(topic.bullets ?? []),
    ]),
  ).join(' ');
  assert.equal(blob.includes('Эпли'), false);
  assert.equal(blob.includes('кластер'), false);
  assert.equal(blob.includes('1.3'), false);
  assert.equal(blob.includes('1.2'), false);
  assert.equal(blob.includes('1.1'), false);
});

test('TENDON_PROTOCOL_CONCEPTS protocol contract is unchanged', () => {
  assert.equal(TENDON_PROTOCOL_CONCEPTS.length, 5);
  assert.deepEqual(
    TENDON_PROTOCOL_CONCEPTS.map(item => item.id),
    ['isometric-hold', 'intensity', 'volume', 'tut', 'frequency'],
  );
  for (const item of TENDON_PROTOCOL_CONCEPTS) {
    assert.ok(item.definition);
    assert.ok(item.pattern);
    assert.ok(item.bullets.length >= 1);
  }
});
