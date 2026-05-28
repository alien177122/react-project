import type {CustomSplit, SplitWeightMode} from '../../types';

interface SplitToolbarProps {
  draft: CustomSplit;
  savedSplits: CustomSplit[];
  onNameChange: (name: string) => void;
  onSelectSplit: (id: string) => void;
  onCreateNew: () => void;
  onDuplicateLast: () => void;
  onDaysPerWeek: (days: 2 | 3) => void;
  onVaryIntensity: (value: boolean) => void;
  onWeightMode: (mode: SplitWeightMode) => void;
  onSave: () => void;
}

const WEIGHT_MODES: {id: SplitWeightMode; label: string; short: string}[] = [
  {id: 'progression', label: 'Прогрессия', short: 'Прогр.'},
  {id: 'fixed', label: 'Фикс', short: 'Фикс'},
  {id: 'scheme_only', label: 'Только схема', short: 'Схема'},
];

export function SplitToolbar({
  draft,
  savedSplits,
  onNameChange,
  onSelectSplit,
  onCreateNew,
  onDuplicateLast,
  onDaysPerWeek,
  onVaryIntensity,
  onWeightMode,
  onSave,
}: SplitToolbarProps) {
  return (
    <header className="app-tab-section split-toolbar">
      <div
        className={`split-toolbar__top${savedSplits.length === 0 ? ' split-toolbar__top--solo' : ''}`}>
        <div className="split-toolbar__field split-toolbar__field--grow">
          <label className="split-toolbar__label" htmlFor="split-name">
            Название сплита
          </label>
          <input
            id="split-name"
            className="split-toolbar__input"
            type="text"
            maxLength={40}
            placeholder="Мой сплит"
            value={draft.name}
            onChange={event => onNameChange(event.target.value)}
          />
        </div>

        {savedSplits.length > 0 ? (
          <div className="split-toolbar__field">
            <label className="split-toolbar__label" htmlFor="split-picker">
              Сохранённые
            </label>
            <div className="split-toolbar__select-wrap">
              <select
                id="split-picker"
                className="split-toolbar__select"
                value={draft.id}
                onChange={event => onSelectSplit(event.target.value)}>
                {savedSplits.map(split => (
                  <option key={split.id} value={split.id}>
                    {split.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ) : null}

        <div className="split-toolbar__actions">
          <button
            type="button"
            className="split-toolbar__action split-toolbar__action--ghost"
            onClick={onCreateNew}>
            <span className="split-toolbar__action-icon" aria-hidden="true">
              +
            </span>
            <span className="split-toolbar__action-text">Новый</span>
          </button>
          <button
            type="button"
            className="split-toolbar__action split-toolbar__action--muted"
            onClick={onDuplicateLast}
            disabled={savedSplits.length === 0}>
            <span className="split-toolbar__action-text">
              <span className="split-toolbar__action-text-full">Повторить прошлый</span>
              <span className="split-toolbar__action-text-short">Повторить</span>
            </span>
          </button>
          <button
            type="button"
            className="split-toolbar__action split-toolbar__action--save"
            onClick={onSave}>
            Сохранить
          </button>
        </div>
      </div>

      <div className="split-toolbar__settings">
        <fieldset className="split-toolbar__panel">
          <legend className="split-toolbar__legend">Дней в неделю</legend>
          <div className="split-segment" role="radiogroup" aria-label="Дней в неделю">
            {([2, 3] as const).map(days => (
              <button
                key={days}
                type="button"
                role="radio"
                className="split-segment__btn"
                aria-checked={draft.daysPerWeek === days}
                onClick={() => onDaysPerWeek(days)}>
                {days} дня
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="split-toolbar__panel split-toolbar__panel--wide">
          <legend className="split-toolbar__legend">Режим веса</legend>
          <div
            className="split-segment split-segment--compact"
            role="radiogroup"
            aria-label="Режим веса">
            {WEIGHT_MODES.map(mode => (
              <button
                key={mode.id}
                type="button"
                role="radio"
                className="split-segment__btn"
                aria-checked={draft.weightMode === mode.id}
                onClick={() => onWeightMode(mode.id)}>
                <span className="split-segment__label-full">{mode.label}</span>
                <span className="split-segment__label-short">{mode.short}</span>
              </button>
            ))}
          </div>
        </fieldset>

        <div className="split-toolbar__panel split-toolbar__panel--switch">
          <span className="split-toolbar__legend">Интенсивность</span>
          <button
            type="button"
            role="switch"
            className={`split-switch${draft.varyIntensity ? ' split-switch--on' : ''}`}
            aria-checked={draft.varyIntensity}
            onClick={() => onVaryIntensity(!draft.varyIntensity)}>
            <span className="split-switch__track" aria-hidden="true">
              <span className="split-switch__thumb" />
            </span>
            <span className="split-switch__copy">
              <span className="split-switch__title">Вариация</span>
              <span className="split-switch__state">{draft.varyIntensity ? 'Вкл' : 'Выкл'}</span>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
