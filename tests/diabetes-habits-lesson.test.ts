import assert from 'node:assert/strict';
import test from 'node:test';
import {
  DIABETES_HABITS_CONCEPTS,
  DIABETES_HABITS_LESSON_GROUPS,
  DIABETES_HABITS_SOURCE,
} from '@training/shared/data/theory';

test('DIABETES_HABITS_SOURCE points to the Egorov clinical talk', () => {
  assert.equal(DIABETES_HABITS_SOURCE.url, 'https://www.youtube.com/watch?v=xqM-kXnsznc');
  assert.equal(DIABETES_HABITS_SOURCE.citation, 'Дневник врача Егорова');
  assert.match(DIABETES_HABITS_SOURCE.title, /диабету/);
});

test('DIABETES_HABITS_LESSON_GROUPS has three lecture sections', () => {
  assert.equal(DIABETES_HABITS_LESSON_GROUPS.length, 3);
  assert.deepEqual(
    DIABETES_HABITS_LESSON_GROUPS.map(group => group.step),
    ['1.1', '1.2', '1.3'],
  );
  for (const group of DIABETES_HABITS_LESSON_GROUPS) {
    assert.ok(group.checkIn?.question);
    assert.ok(group.topics.length >= 1);
    for (const topic of group.topics) {
      assert.ok(topic.lecture.length >= 3);
      assert.ok(topic.definition.length > 0);
    }
  }
});

test('clinical cases keep the sourced lab numbers', () => {
  const text = JSON.stringify(DIABETES_HABITS_LESSON_GROUPS);
  assert.match(text, /6,7%/);
  assert.match(text, /HOMA 8,0/);
  assert.match(text, /28,2/);
  assert.match(text, /5,3%/);
  assert.match(text, /GLUT4/);
  assert.match(text, /60%/);
  assert.match(text, /16:00–17:00/);
  assert.match(text, /рост − 100/);
});

test('DIABETES_HABITS_CONCEPTS is a compact derivative of lecture topics', () => {
  const topics = DIABETES_HABITS_LESSON_GROUPS.flatMap(group => group.topics);
  assert.equal(DIABETES_HABITS_CONCEPTS.length, topics.length);
  for (const [index, concept] of DIABETES_HABITS_CONCEPTS.entries()) {
    assert.equal(concept.title, topics[index].title);
    assert.equal(concept.definition, topics[index].definition);
    assert.equal('lecture' in concept, false);
  }
});
