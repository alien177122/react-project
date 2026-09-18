import assert from 'node:assert/strict';
import test from 'node:test';
import {MTOR_CONCEPTS, MTOR_LESSON_GROUPS} from '@training/shared/data/theory';
import {splitPattern} from '../src/components/theory/parsePattern.ts';

test('MTOR_LESSON_GROUPS has five lecture sections', () => {
  assert.equal(MTOR_LESSON_GROUPS.length, 5);
  assert.deepEqual(
    MTOR_LESSON_GROUPS.map(group => group.step),
    ['2.1', '2.2', '2.3', '2.4', '2.5'],
  );
  for (const group of MTOR_LESSON_GROUPS) {
    assert.ok(group.checkIn?.question);
    assert.ok(group.topics.length >= 1);
  }
});

test('MTOR_CONCEPTS is a compact derivative of lecture topics', () => {
  const topics = MTOR_LESSON_GROUPS.flatMap(group => group.topics);
  assert.equal(MTOR_CONCEPTS.length, topics.length);
  for (const [index, concept] of MTOR_CONCEPTS.entries()) {
    assert.equal(concept.title, topics[index].title);
    assert.equal(concept.definition, topics[index].definition);
    assert.equal(
      Object.keys(concept).every(key =>
        ['title', 'definition', 'pattern', 'bullets'].includes(key),
      ),
      true,
    );
    assert.equal('lecture' in concept, false);
  }
});

test('splitPattern uses product chips, arrows, or a single fallback', () => {
  const product = splitPattern('нагрузка × белок × энергия = сигнал роста');
  assert.deepEqual(
    product.map(piece => piece.kind),
    ['chip', 'op', 'chip', 'op', 'chip', 'op', 'chip'],
  );
  assert.equal(product[1].text, '×');
  assert.equal(product[5].text, '=');

  const cascade = splitPattern('лейцин → Rag-GTPase → mTORC1');
  assert.equal(
    cascade.filter(piece => piece.kind === 'op').every(piece => piece.text === '→'),
    true,
  );
  assert.equal(
    cascade.some(piece => piece.text === '×'),
    false,
  );

  const fallback = splitPattern('без стрелок и произведения');
  assert.deepEqual(fallback, [{kind: 'chip', text: 'без стрелок и произведения'}]);
});
