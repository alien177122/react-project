import assert from 'node:assert/strict';
import test from 'node:test';
import {
  LATE_DINNER_CONCEPTS,
  LATE_DINNER_LESSON_GROUPS,
  LATE_DINNER_SOURCE,
} from '@training/shared/data/theory';
import {
  getTheoryChapter,
  isReadingArticle,
  normalizeChapterId,
  THEORY_CHAPTERS,
  THEORY_READING_ARTICLES,
} from '../src/data/theoryChapters.ts';

test('LATE_DINNER_SOURCE points to the Egorov night-eating talk', () => {
  assert.equal(LATE_DINNER_SOURCE.url, 'https://www.youtube.com/watch?v=JMbwy3zP7Ws');
  assert.equal(LATE_DINNER_SOURCE.citation, 'Дневник врача Егорова');
  assert.match(LATE_DINNER_SOURCE.title, /есть на ночь/);
});

test('LATE_DINNER_LESSON_GROUPS has five lecture sections', () => {
  assert.equal(LATE_DINNER_LESSON_GROUPS.length, 5);
  assert.deepEqual(
    LATE_DINNER_LESSON_GROUPS.map(group => group.step),
    ['1.1', '1.2', '1.3', '1.4', '1.5'],
  );
  for (const group of LATE_DINNER_LESSON_GROUPS) {
    assert.ok(group.checkIn?.question);
    assert.ok(group.topics.length >= 1);
    for (const topic of group.topics) {
      assert.ok(topic.lecture.length >= 3);
      assert.ok(topic.definition.length > 0);
    }
  }
});

test('late dinner lecture keeps sourced timing and Garmin numbers', () => {
  const text = JSON.stringify(LATE_DINNER_LESSON_GROUPS);
  assert.match(text, /2–3/);
  assert.match(text, /16:00–17:00/);
  assert.match(text, /19:00–20:00/);
  assert.match(text, /50–55/);
  assert.match(text, /45–47/);
  assert.match(text, /75–82/);
  assert.match(text, /300–400/);
  assert.match(text, /3–4/);
});

test('LATE_DINNER_CONCEPTS is a compact derivative of lecture topics', () => {
  const topics = LATE_DINNER_LESSON_GROUPS.flatMap(group => group.topics);
  assert.equal(LATE_DINNER_CONCEPTS.length, topics.length);
  for (const [index, concept] of LATE_DINNER_CONCEPTS.entries()) {
    assert.equal(concept.title, topics[index].title);
    assert.equal(concept.definition, topics[index].definition);
    assert.equal('lecture' in concept, false);
  }
});

test('reading articles are not in the 10-chapter grid', () => {
  assert.equal(THEORY_CHAPTERS.length, 10);
  assert.equal(
    THEORY_CHAPTERS.every(chapter => chapter.kind === 'chapter'),
    true,
  );
  assert.equal(THEORY_READING_ARTICLES.length, 3);
  assert.deepEqual(
    THEORY_READING_ARTICLES.map(article => article.id),
    ['diabetes-habits', 'late-dinner', 'anabolic-vessels'],
  );
  assert.equal(normalizeChapterId('late-dinner'), 'late-dinner');
  assert.equal(normalizeChapterId('cardio'), 'cardio');
  assert.equal(getTheoryChapter('cardio').kind, 'chapter');
  assert.equal(isReadingArticle('diabetes-habits'), true);
  assert.equal(isReadingArticle('cardio'), false);
});
