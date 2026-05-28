import {useState} from 'react';
import type {ActiveProgram, UserData} from '../types';
import {Button} from '../components/ui/Button';

interface ProgramSelectorScreenProps {
  userData: UserData;
  onSelect: (program: ActiveProgram) => void;
  onDismiss?: () => void;
}

export function ProgramSelectorScreen({userData, onSelect, onDismiss}: ProgramSelectorScreenProps) {
  const [selected, setSelected] = useState<ActiveProgram>(userData.activeProgram ?? '2.0');

  return (
    <div className="program-selector" role="dialog" aria-labelledby="program-selector-title">
      <div className="program-selector__panel">
        <h2 id="program-selector-title" className="program-selector__title">
          Выберите программу
        </h2>
        <p className="program-selector__lead">
          Можно сменить позже в панели пользователя. Прогресс каждого трека сохраняется отдельно.
        </p>

        <div className="program-selector__cards" role="radiogroup" aria-label="Тип прогрессии">
          <button
            type="button"
            role="radio"
            aria-checked={selected === '2.0'}
            className={`program-selector__card${selected === '2.0' ? ' program-selector__card--selected' : ''}`}
            onClick={() => setSelected('2.0')}>
            <span className="program-selector__badge">Рекомендуем начать здесь</span>
            <span className="program-selector__card-title">Оптимальная</span>
            <span className="program-selector__card-stats">8 недель · 3 дня · 12 упражнений</span>
            <span className="program-selector__card-desc">
              Проверенная волновая периодизация с калькулятором 1ПМ.
            </span>
          </button>

          <button
            type="button"
            role="radio"
            aria-checked={selected === '3.0'}
            className={`program-selector__card${selected === '3.0' ? ' program-selector__card--selected' : ''}`}
            onClick={() => setSelected('3.0')}>
            <span className="program-selector__card-title">На силу</span>
            <span className="program-selector__card-stats">16 недель · 4 дня · 20 упражнений</span>
            <span className="program-selector__card-desc">
              Brzycki, тестовые недели 4/8/12/16, расчёт весов после тестов.
            </span>
          </button>
        </div>

        <div className="program-selector__actions">
          <Button variant="primary" onClick={() => onSelect(selected)}>
            Продолжить
          </Button>
          {onDismiss ? (
            <Button variant="ghost" onClick={onDismiss}>
              Позже
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
