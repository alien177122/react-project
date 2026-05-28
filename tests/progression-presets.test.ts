import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import {
  buildGeneralPreviewWeeks,
  buildStrengthPreviewWeeks,
  buildProgressionPreviewWeeks,
  filterChartPreviewWeeks,
  getPhaseDisplayLabel,
  getTestWeekExplanation,
  getProgressionPreviewMeta,
  DEMO_SQUAT_ONE_RM,
} from '@training/shared/program/progressionPreview';
import {
  normalizeProgressionPreset,
  PROGRESSION_PRESET_META,
  PROGRESSION_PRESET_ORDER,
  applyProgramSettingsPatch,
  getActiveProgramForPreset,
  getDefaultDaysForPreset,
  getPresetForActiveProgram,
} from '@training/shared/program/progressionPresets';
import {DEFAULT_PROGRAM_SETTINGS} from '@training/shared/types';

describe('progression presets', () => {
  it('exposes exactly two Excel tracks', () => {
    assert.deepEqual(PROGRESSION_PRESET_ORDER, ['general', 'strength']);
  });

  it('migrates legacy preset ids', () => {
    assert.equal(normalizeProgressionPreset('average'), 'general');
    assert.equal(normalizeProgressionPreset('heavier'), 'strength');
    assert.equal(normalizeProgressionPreset('more_power'), 'strength');
    assert.equal(normalizeProgressionPreset('general'), 'general');
    assert.equal(normalizeProgressionPreset(undefined), 'general');
  });

  it('uses preset labels without program version numbers', () => {
    assert.equal(PROGRESSION_PRESET_META.general.label, 'Оптимальная');
    assert.equal(PROGRESSION_PRESET_META.strength.label, 'На силу');
    for (const preset of PROGRESSION_PRESET_ORDER) {
      const meta = PROGRESSION_PRESET_META[preset];
      assert.doesNotMatch(meta.label, /2\.0|3\.0/);
      assert.doesNotMatch(meta.description, /2\.0|3\.0|Программа/i);
      assert.doesNotMatch(meta.programLabel, /2\.0|3\.0|Программа/i);
    }
  });

  it('maps presets to program versions', () => {
    assert.equal(getActiveProgramForPreset('general'), '2.0');
    assert.equal(getActiveProgramForPreset('strength'), '3.0');
    assert.equal(getPresetForActiveProgram('2.0'), 'general');
    assert.equal(getPresetForActiveProgram('3.0'), 'strength');
    assert.equal(getDefaultDaysForPreset('general'), 3);
    assert.equal(getDefaultDaysForPreset('strength'), 4);
  });

  it('syncs preset, days and activeProgram on patch', () => {
    const general = applyProgramSettingsPatch(DEFAULT_PROGRAM_SETTINGS, {
      progressionPreset: 'general',
    });
    assert.deepEqual(general.programSettings, {progressionPreset: 'general', daysPerWeek: 3});
    assert.equal(general.activeProgram, '2.0');

    const strength = applyProgramSettingsPatch(DEFAULT_PROGRAM_SETTINGS, {
      progressionPreset: 'strength',
    });
    assert.deepEqual(strength.programSettings, {progressionPreset: 'strength', daysPerWeek: 4});
    assert.equal(strength.activeProgram, '3.0');

    const fourDays = applyProgramSettingsPatch(DEFAULT_PROGRAM_SETTINGS, {daysPerWeek: 4});
    assert.equal(fourDays.programSettings.progressionPreset, 'strength');
    assert.equal(fourDays.activeProgram, '3.0');

    const threeDays = applyProgramSettingsPatch(
      {progressionPreset: 'strength', daysPerWeek: 4},
      {daysPerWeek: 3},
    );
    assert.equal(threeDays.programSettings.progressionPreset, 'general');
    assert.equal(threeDays.activeProgram, '2.0');
  });
});

describe('progression preview', () => {
  it('builds 8-week general squat demo from 100 kg 1RM', () => {
    const weeks = buildGeneralPreviewWeeks(DEMO_SQUAT_ONE_RM);
    assert.equal(weeks.length, 8);
    assert.equal(weeks[0]?.weight, 70);
    assert.equal(weeks[0]?.pct, 68);
    assert.equal(weeks[4]?.isDeload, true);
    assert.equal(weeks[7]?.weight, 90);
  });

  it('builds 16-week strength squat demo with Brzycki percent weeks', () => {
    const weeks = buildStrengthPreviewWeeks();
    assert.equal(weeks.length, 16);
    assert.equal(weeks[0]?.loadLabel, '12ПМ');
    assert.equal(weeks[0]?.isPrepWeek, true);
    assert.equal(weeks[2]?.isPrepWeek, true);
    assert.equal(weeks[3]?.loadLabel, 'Тест');
    assert.equal(weeks[3]?.isTestWeek, true);
    assert.equal(weeks[4]?.weight, 72.5);
    assert.equal(weeks[4]?.pct, 70);
    assert.equal(weeks[4]?.isPrepWeek, false);
    assert.equal(weeks[15]?.loadLabel, 'Тест');
    assert.equal(weeks[15]?.isTestWeek, true);
  });

  it('includes test weeks on strength chart: W4 unknown weight, W8+ from program %', () => {
    const all = buildProgressionPreviewWeeks('strength');
    const chart = filterChartPreviewWeeks(all, 'strength');
    assert.equal(all.length, 16);
    assert.equal(chart.length, 13);
    assert.ok(chart.every(week => !week.isPrepWeek));
    assert.deepEqual(
      chart.map(week => week.week),
      [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    );
    const testWeeks = chart.filter(week => week.isTestWeek);
    assert.equal(testWeeks.length, 4);
    const w4 = testWeeks.find(week => week.week === 4);
    const w8 = testWeeks.find(week => week.week === 8);
    const w12 = testWeeks.find(week => week.week === 12);
    const w16 = testWeeks.find(week => week.week === 16);
    assert.equal(w4?.weightDisplay, '?');
    assert.equal(w4?.weight, null);
    assert.equal(w4?.repsDisplay, '?');
    assert.equal(w4?.schemeDisplay, '1×8');
    assert.equal(w4?.sets, 1);
    assert.equal(w4?.reps, 8);
    assert.equal(w8?.weight, 82.5);
    assert.equal(w8?.pct, 82.5);
    assert.equal(w8?.repsDisplay, '?');
    assert.equal(w8?.schemeDisplay, '1×?');
    assert.equal(w8?.sets, 1);
    assert.equal(w12?.weight, 85);
    assert.equal(w12?.pct, 85);
    assert.equal(w12?.schemeDisplay, '1×?');
    assert.equal(w12?.sets, 1);
    assert.equal(w16?.weight, 90);
    assert.equal(w16?.pct, 90);
    assert.equal(w16?.schemeDisplay, '1×?');
    assert.equal(w16?.sets, 1);
    assert.ok(testWeeks.every(week => week.repsDisplay === '?'));
  });

  it('excludes test and prep weeks from general chart preview data', () => {
    const chart = filterChartPreviewWeeks(buildProgressionPreviewWeeks('general'), 'general');
    assert.equal(chart.length, 8);
    assert.deepEqual(
      chart.map(week => week.week),
      [1, 2, 3, 4, 5, 6, 7, 8],
    );
  });

  it('returns preset-specific test week explanation', () => {
    assert.match(getTestWeekExplanation('strength'), /демо 1ПМ/);
    assert.match(getTestWeekExplanation('strength'), /Подготовка \(1–3\)/);
    assert.match(getTestWeekExplanation('strength'), /Неделя 4/);
    assert.match(getTestWeekExplanation('strength'), /8, 12, 16/);
    assert.match(getTestWeekExplanation('general'), /разгрузка/i);
    assert.doesNotMatch(getTestWeekExplanation('general'), /2\.0|3\.0|Программа/i);
  });

  it('uses preset names in chart subtitle', () => {
    const general = getProgressionPreviewMeta({
      progressionPreset: 'general',
      daysPerWeek: 3,
    });
    const strength = getProgressionPreviewMeta({
      progressionPreset: 'strength',
      daysPerWeek: 4,
    });
    assert.match(general.subtitle, /Оптимальная · 8 нед/);
    assert.match(strength.subtitle, /На силу · 16 нед/);
    assert.doesNotMatch(general.subtitle, /Общая|2\.0/);
    assert.doesNotMatch(strength.subtitle, /Силовая|3\.0/);
  });

  it('maps phase labels for chart rows in Russian', () => {
    const general = buildGeneralPreviewWeeks();
    assert.equal(getPhaseDisplayLabel(general[0]!, 'general'), 'Объем');
    assert.equal(getPhaseDisplayLabel(general[4]!, 'general'), 'Разгрузка');
    assert.equal(getPhaseDisplayLabel(general[5]!, 'general'), 'Сила');
    assert.equal(getPhaseDisplayLabel(general[7]!, 'general'), 'Пик');

    const strength = filterChartPreviewWeeks(buildStrengthPreviewWeeks(), 'strength');
    assert.deepEqual(
      strength.map(week => getPhaseDisplayLabel(week, 'strength')),
      [
        'Тест',
        'Объем',
        'Сила',
        'Гипертрофия',
        'Тест',
        'Объем',
        'Сила',
        'Гипертрофия',
        'Тест',
        'Объем',
        'Сила',
        'Гипертрофия',
        'Тест',
      ],
    );
  });
});
