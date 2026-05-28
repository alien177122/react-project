import type {ProgramSettings, ProgressionPreset} from '../../types';
import {
  PROGRESSION_PRESET_META,
  PROGRESSION_PRESET_ORDER,
} from '@shared/program/progressionPresets';
import ProgressionPreviewChart from './ProgressionPreviewChart';

interface ProgressionPresetPickerProps {
  settings: ProgramSettings;
  onChange: (patch: Partial<ProgramSettings>) => void;
  showDaysPerWeek?: boolean;
  showPreview?: boolean;
}

export default function ProgressionPresetPicker({
  settings,
  onChange,
  showDaysPerWeek = true,
  showPreview = true,
}: ProgressionPresetPickerProps) {
  return (
    <div className="progression-controls program-settings">
      <div className="program-settings__fields">
        <div className="program-settings__field">
          <span className="progression-controls__label program-settings__label">
            Тип прогрессии
          </span>
          <div className="program-settings__control">
            <div className="progression-controls__actions">
              <div
                className="progression-controls__segmented"
                role="group"
                aria-label="Тип прогрессии">
                {PROGRESSION_PRESET_ORDER.map(preset => (
                  <button
                    key={preset}
                    type="button"
                    className={`progression-controls__option${settings.progressionPreset === preset ? ' is-active' : ''}`}
                    aria-pressed={settings.progressionPreset === preset}
                    title={PROGRESSION_PRESET_META[preset].description}
                    onClick={() => onChange({progressionPreset: preset as ProgressionPreset})}>
                    {PROGRESSION_PRESET_META[preset].label}
                  </button>
                ))}
              </div>
            </div>
            <p className="program-settings__hint">
              {PROGRESSION_PRESET_META[settings.progressionPreset].description}
            </p>
          </div>
        </div>

        {showDaysPerWeek ? (
          <div className="program-settings__field">
            <span className="progression-controls__label program-settings__label">
              Дней в неделю
            </span>
            <div className="program-settings__control">
              <div className="progression-controls__actions">
                <div
                  className="progression-controls__segmented"
                  role="group"
                  aria-label="Дней в неделю">
                  {([3, 4] as const).map(days => (
                    <button
                      key={days}
                      type="button"
                      className={`progression-controls__option${settings.daysPerWeek === days ? ' is-active' : ''}`}
                      aria-pressed={settings.daysPerWeek === days}
                      onClick={() => onChange({daysPerWeek: days})}>
                      {days} дня
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {showPreview ? <ProgressionPreviewChart settings={settings} /> : null}
    </div>
  );
}
