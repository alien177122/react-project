import assert from 'node:assert/strict';
import test from 'node:test';
import {
  ANABOLIC_VESSELS_CONCEPTS,
  ANABOLIC_VESSELS_LESSON_GROUPS,
  ANABOLIC_VESSELS_SOURCE,
} from '@training/shared/data/theory';
import {isReadingArticle, normalizeChapterId} from '../src/data/theoryChapters.ts';

test('ANABOLIC_VESSELS_SOURCE points to the Egorov AAS-vessels talk', () => {
  assert.equal(ANABOLIC_VESSELS_SOURCE.url, 'https://www.youtube.com/watch?v=2kKssc-FqzY');
  assert.equal(ANABOLIC_VESSELS_SOURCE.citation, 'Дневник врача Егорова');
  assert.match(ANABOLIC_VESSELS_SOURCE.title, /анаболики делают с сосудами/);
});

test('ANABOLIC_VESSELS_LESSON_GROUPS has five lecture sections', () => {
  assert.equal(ANABOLIC_VESSELS_LESSON_GROUPS.length, 5);
  assert.deepEqual(
    ANABOLIC_VESSELS_LESSON_GROUPS.map(group => group.step),
    ['1.1', '1.2', '1.3', '1.4', '1.5'],
  );
  for (const group of ANABOLIC_VESSELS_LESSON_GROUPS) {
    assert.ok(group.checkIn?.question);
    assert.ok(group.topics.length >= 1);
    for (const topic of group.topics) {
      assert.ok(topic.lecture.length >= 3);
      assert.ok(topic.definition.length > 0);
    }
  }
});

test('anabolic vessels lecture keeps sourced numbers and the HRT disclaimer', () => {
  const text = JSON.stringify(ANABOLIC_VESSELS_LESSON_GROUPS);
  assert.match(text, /не про гормонозаместительн/);
  assert.match(text, /2–3/);
  assert.match(text, /75%/);
  assert.match(text, /28 лет/);
  assert.match(text, /2010/);
  assert.match(text, /37,0–37,3/);
  assert.match(text, /800 г/);
  assert.doesNotMatch(text, /стройк/);
});

test('ANABOLIC_VESSELS_CONCEPTS is a compact derivative of lecture topics', () => {
  const topics = ANABOLIC_VESSELS_LESSON_GROUPS.flatMap(group => group.topics);
  assert.equal(ANABOLIC_VESSELS_CONCEPTS.length, topics.length);
  for (const [index, concept] of ANABOLIC_VESSELS_CONCEPTS.entries()) {
    assert.equal(concept.title, topics[index].title);
    assert.equal(concept.definition, topics[index].definition);
    assert.equal('lecture' in concept, false);
  }
  assert.equal(normalizeChapterId('anabolic-vessels'), 'anabolic-vessels');
  assert.equal(isReadingArticle('anabolic-vessels'), true);
});
