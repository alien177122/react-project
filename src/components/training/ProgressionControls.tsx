import type {TrainingPreferences} from '../../types';
import PyramidHelpDialog from './PyramidHelpDialog';

interface ProgressionControlsProps {
  preferences: TrainingPreferences;
  onChange: (patch: Partial<TrainingPreferences>) => void;
}

export default function ProgressionControls({preferences, onChange}: ProgressionControlsProps) {
  const isPyramid = preferences.progressionMode === 'pyramid';

  return (
    <div className="progression-controls">
      <div className="progression-controls__row">
        <span className="progression-controls__label">Схема подходов</span>
        <div className="progression-controls__actions">
          <div className="progression-controls__segmented" role="group" aria-label="Схема подходов">
            <button
              type="button"
              className={`progression-controls__option${preferences.progressionMode === 'linear' ? ' is-active' : ''}`}
              aria-pressed={preferences.progressionMode === 'linear'}
              onClick={() => onChange({progressionMode: 'linear'})}>
              Постоянная
            </button>
            <button
              type="button"
              className={`progression-controls__option${isPyramid ? ' is-active' : ''}`}
              aria-pressed={isPyramid}
              onClick={() => onChange({progressionMode: 'pyramid', pyramidType: 'descending'})}>
              ↓ Пирамида
            </button>
          </div>
          {isPyramid ? <PyramidHelpDialog /> : null}
        </div>
      </div>
    </div>
  );
}
