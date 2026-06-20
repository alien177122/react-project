import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import {
  buildGeneralPreviewWeeks,
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
import {DEFAULT_PROGRAM_SETTINGS, PROGRAM_DAYS_PER_WEEK} from '@training/shared/types';

describe('progression presets', () => {
  it('exposes only the optimal track', () => {
    assert.deepEqual(PROGRESSION_PRESET_ORDER, ['general']);
  });

  it('migrates legacy preset ids to general', () => {
    assert.equal(normalizeProgressionPreset('average'), 'general');
    assert.equal(normalizeProgressionPreset('heavier'), 'general');
    assert.equal(normalizeProgressionPreset('more_power'), 'general');
    assert.equal(normalizeProgressionPreset('strength'), 'general');
    assert.equal(normalizeProgressionPreset('general'), 'general');
    assert.equal(normalizeProgressionPreset(undefined), 'general');
  });

  it('uses preset labels without program version numbers', () => {
    assert.equal(PROGRESSION_PRESET_META.general.label, 'Оптимальная');
    for (const preset of PROGRESSION_PRESET_ORDER) {
      const meta = PROGRESSION_PRESET_META[preset];
      assert.doesNotMatch(meta.label, /2\.0|3\.0/);
      assert.doesNotMatch(meta.description, /2\.0|3\.0|Программа/i);
      assert.doesNotMatch(meta.programLabel, /2\.0|3\.0|Программа/i);
    }
  });

  it('maps preset to Program 2.0 and 2 days per week', () => {
    assert.equal(getActiveProgramForPreset('general'), '2.0');
    assert.equal(getPresetForActiveProgram('2.0'), 'general');
    assert.equal(getPresetForActiveProgram('3.0'), 'general');
    assert.equal(getDefaultDaysForPreset('general'), PROGRAM_DAYS_PER_WEEK);
  });

  it('always resolves canonical settings on patch', () => {
    const result = applyProgramSettingsPatch(DEFAULT_PROGRAM_SETTINGS, {
      progressionPreset: 'general',
    });
    assert.deepEqual(result.programSettings, {
      progressionPreset: 'general',
      daysPerWeek: PROGRAM_DAYS_PER_WEEK,
    });
    assert.equal(result.activeProgram, '2.0');

    const legacyStrength = applyProgramSettingsPatch(DEFAULT_PROGRAM_SETTINGS, {
      daysPerWeek: 4 as never,
    });
    assert.deepEqual(legacyStrength.programSettings, {
      progressionPreset: 'general',
      daysPerWeek: PROGRAM_DAYS_PER_WEEK,
    });
    assert.equal(legacyStrength.activeProgram, '2.0');
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

  it('buildProgressionPreviewWeeks always returns general wave', () => {
    const weeks = buildProgressionPreviewWeeks('general');
    assert.equal(weeks.length, 8);
    assert.equal(weeks[0]?.pct, 68);
  });

  it('excludes test and prep weeks from chart preview data', () => {
    const chart = filterChartPreviewWeeks(buildProgressionPreviewWeeks('general'), 'general');
    assert.equal(chart.length, 8);
    assert.deepEqual(
      chart.map(week => week.week),
      [1, 2, 3, 4, 5, 6, 7, 8],
    );
  });

  it('returns general test week explanation', () => {
    assert.match(getTestWeekExplanation('general'), /разгрузка/i);
    assert.doesNotMatch(getTestWeekExplanation('general'), /2\.0|3\.0|Программа/i);
  });

  it('uses optimal track in chart subtitle', () => {
    const meta = getProgressionPreviewMeta({
      progressionPreset: 'general',
      daysPerWeek: PROGRAM_DAYS_PER_WEEK,
    });
    assert.match(meta.subtitle, /Оптимальная · 8 нед/);
    assert.match(meta.subtitle, /2 дня\/нед/);
    assert.doesNotMatch(meta.subtitle, /Общая|2\.0|На силу/i);
  });

  it('maps phase labels for chart rows in Russian', () => {
    const general = buildGeneralPreviewWeeks();
    assert.equal(getPhaseDisplayLabel(general[0]!, 'general'), 'Объем');
    assert.equal(getPhaseDisplayLabel(general[4]!, 'general'), 'Разгрузка');
    assert.equal(getPhaseDisplayLabel(general[5]!, 'general'), 'Сила');
    assert.equal(getPhaseDisplayLabel(general[7]!, 'general'), 'Пик');
  });
});
