import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import {
  filterSplitExerciseItems,
  muscleFiltersForRegion,
  type SplitExercisePickerItem,
} from '../src/hooks/useSplitExercisePicker.ts';

const SAMPLE_ITEMS: SplitExercisePickerItem[] = [
  {
    key: 'bench',
    name: 'Жим штанги лёжа',
    typeLabel: 'Тип A',
    typeColor: '#ffb020',
    muscle: 'chest',
    muscleLabel: 'Грудь',
    muscleColor: '#ffb020',
  },
  {
    key: 'squat',
    name: 'Приседания',
    typeLabel: 'Тип A',
    typeColor: '#ffb020',
    muscle: 'legs',
    muscleLabel: 'Ноги',
    muscleColor: '#3affb8',
  },
  {
    key: 'curl',
    name: 'Бицепс',
    typeLabel: 'Тип C',
    typeColor: '#5ba4ff',
    muscle: 'biceps',
    muscleLabel: 'Бицепс',
    muscleColor: '#4090ee',
  },
];

describe('muscleFiltersForRegion', () => {
  it('returns upper-body muscles when region is upper', () => {
    const filters = muscleFiltersForRegion('upper');
    assert.ok(filters.includes('chest'));
    assert.ok(filters.includes('back'));
    assert.ok(!filters.includes('legs'));
  });

  it('returns only legs when region is lower', () => {
    const filters = muscleFiltersForRegion('lower');
    assert.deepEqual(filters, ['all', 'legs']);
  });
});

describe('filterSplitExerciseItems', () => {
  it('filters by region and muscle', () => {
    const upperChest = filterSplitExerciseItems(SAMPLE_ITEMS, 'upper', 'chest');
    assert.deepEqual(
      upperChest.map(item => item.key),
      ['bench'],
    );

    const lower = filterSplitExerciseItems(SAMPLE_ITEMS, 'lower', 'all');
    assert.deepEqual(
      lower.map(item => item.key),
      ['squat'],
    );

    const all = filterSplitExerciseItems(SAMPLE_ITEMS, 'all', 'biceps');
    assert.deepEqual(
      all.map(item => item.key),
      ['curl'],
    );
  });
});
