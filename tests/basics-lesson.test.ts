import assert from 'node:assert/strict';
import test from 'node:test';
import {BASICS_CORE, BASICS_LESSON_GROUPS} from '@training/shared/data/theory';

test('BASICS_LESSON_GROUPS has four lecture sections', () => {
  assert.equal(BASICS_LESSON_GROUPS.length, 4);
  assert.deepEqual(
    BASICS_LESSON_GROUPS.map(group => group.step),
    ['1.1', '1.2', '1.3', '1.4'],
  );
  for (const group of BASICS_LESSON_GROUPS) {
    assert.ok(group.checkIn?.question);
    assert.ok(group.topics.length >= 1);
    for (const topic of group.topics) {
      assert.ok(topic.lecture.length >= 3);
      assert.ok(topic.lecture.length <= 6);
    }
  }
});

test('BASICS_CORE is a compact derivative of lecture topics', () => {
  const topics = BASICS_LESSON_GROUPS.flatMap(group => group.topics);
  assert.equal(BASICS_CORE.length, topics.length);
  for (const [index, concept] of BASICS_CORE.entries()) {
    assert.equal(concept.id, topics[index].id);
    assert.equal(concept.title, topics[index].title);
    assert.equal(concept.definition, topics[index].definition);
    assert.equal(
      Object.keys(concept).every(key =>
        ['id', 'title', 'definition', 'pattern', 'bullets'].includes(key),
      ),
      true,
    );
    assert.equal('lecture' in concept, false);
  }
});

test('BASICS lecture does not duplicate fractional lenses', () => {
  const ids = BASICS_LESSON_GROUPS.flatMap(group => group.topics.map(topic => topic.id));
  assert.equal(ids.includes('set-counting'), false);
  assert.equal(ids.includes('session-dose'), false);
  assert.equal(ids.includes('isolation-stimulus'), false);
});

test('BASICS lecture stays within callout and case caps', () => {
  const topics = BASICS_LESSON_GROUPS.flatMap(group => group.topics);
  assert.ok(topics.filter(topic => topic.callout).length <= 3);
  assert.ok(topics.filter(topic => topic.caseStudy).length <= 3);
});
