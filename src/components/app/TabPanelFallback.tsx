import type {AppTab} from './tabs';

const TAB_LABELS: Record<AppTab, string> = {
  calculator: 'Калькулятор',
  theory: 'Теория',
  training: 'Тренировка',
  split: 'Сплит',
  journal: 'Журнал',
};

interface TabPanelFallbackProps {
  tab: AppTab;
}

/** Lightweight shell placeholder while a lazy tab chunk loads. */
export function TabPanelFallback({tab}: TabPanelFallbackProps) {
  return (
    <div className="ta-shell tab-panel-fallback" role="status" aria-live="polite" aria-busy="true">
      <p className="tab-panel-fallback__label">Загрузка: {TAB_LABELS[tab]}</p>
      <div className="tab-panel-fallback__skeleton" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}
