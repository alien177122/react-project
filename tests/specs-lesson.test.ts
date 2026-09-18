import assert from 'node:assert/strict';
import test from 'node:test';
import {SPECS_LESSON_GROUPS} from '@training/shared/data/theory';

test('SPECS_LESSON_GROUPS has four lecture sections', () => {
  assert.equal(SPECS_LESSON_GROUPS.length, 4);
  assert.deepEqual(
    SPECS_LESSON_GROUPS.map(group => group.step),
    ['5.1', '5.2', '5.3', '5.4'],
  );
  for (const group of SPECS_LESSON_GROUPS) {
    assert.ok(group.checkIn?.question);
    assert.ok(group.topics.length >= 1);
    for (const topic of group.topics) {
      assert.ok(topic.lecture.length >= 3);
      assert.ok(topic.lecture.length <= 6);
    }
  }
});

test('SPECS lecture stays within callout and case caps', () => {
  const topics = SPECS_LESSON_GROUPS.flatMap(group => group.topics);
  assert.ok(topics.filter(topic => topic.callout).length <= 3);
  assert.ok(topics.filter(topic => topic.caseStudy).length <= 3);
});

test('SPECS lecture does not copy Epley from chapter 01', () => {
  const blob = SPECS_LESSON_GROUPS.flatMap(group =>
    group.topics.flatMap(topic => [
      ...topic.lecture,
      topic.definition,
      topic.pattern ?? '',
      ...(topic.bullets ?? []),
    ]),
  ).join(' ');
  assert.equal(blob.includes('Эпли'), false);
  assert.equal(blob.includes('1.3'), false);
  assert.equal(blob.includes('1.2'), false);
  assert.equal(blob.includes('1.1'), false);
});
