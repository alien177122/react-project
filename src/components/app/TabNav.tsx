import type {ComponentType} from 'react';
import {EX_COUNT} from '../../data/exercises';
import type {AppTab} from './tabs';
import {
  TabIconCalculator,
  TabIconJournal,
  TabIconSplit,
  TabIconTheory,
  TabIconTraining,
} from './TabNavIcons';

const TAB_ICONS: Record<AppTab, ComponentType<{className?: string}>> = {
  training: TabIconTraining,
  calculator: TabIconCalculator,
  theory: TabIconTheory,
  split: TabIconSplit,
  journal: TabIconJournal,
};

interface TabNavProps {
  activeTab: AppTab;
  allSaved: boolean;
  savedCount: number;
  onTabChange: (tab: AppTab) => void;
}

export function TabNav({activeTab, allSaved, savedCount, onTabChange}: TabNavProps) {
  return (
    <nav className="tab-bar ta-mode-nav app-shell__nav" aria-label="Разделы приложения">
      <TabButton
        label="Тренировка"
        tab="training"
        activeTab={activeTab}
        locked={!allSaved}
        meta={!allSaved ? `${savedCount}/${EX_COUNT}` : undefined}
        metaLabel={`Сохранено ${savedCount} из ${EX_COUNT}`}
        title={!allSaved ? `Сохрани 1ПМ для всех ${EX_COUNT} упражнений` : undefined}
        onTabChange={onTabChange}
      />
      <TabButton
        label="Калькулятор"
        tab="calculator"
        activeTab={activeTab}
        onTabChange={onTabChange}
      />
      <TabButton label="Теория" tab="theory" activeTab={activeTab} onTabChange={onTabChange} />
      <TabButton label="Сплит" tab="split" activeTab={activeTab} onTabChange={onTabChange} />
      <TabButton label="Журнал" tab="journal" activeTab={activeTab} onTabChange={onTabChange} />
    </nav>
  );
}

interface TabButtonProps {
  label: string;
  tab: AppTab;
  activeTab: AppTab;
  locked?: boolean;
  meta?: string;
  metaLabel?: string;
  title?: string;
  onTabChange: (tab: AppTab) => void;
}

function TabButton({
  label,
  tab,
  activeTab,
  locked = false,
  meta,
  metaLabel,
  title,
  onTabChange,
}: TabButtonProps) {
  const active = activeTab === tab;
  const Icon = TAB_ICONS[tab];
  return (
    <button
      type="button"
      className={`tab-btn ta-mode-nav__item${active ? ' tab-active is-active' : ''}${locked ? ' tab-locked is-locked' : ''}`}
      aria-current={active ? 'page' : undefined}
      aria-disabled={locked || undefined}
      aria-label={metaLabel ?? label}
      title={title}
      onClick={() => {
        if (!locked) onTabChange(tab);
      }}>
      <span className="tab-btn-stack ta-mode-nav__stack">
        <span className="tab-btn-icon ta-mode-nav__icon" aria-hidden="true">
          <Icon className="tab-btn-icon__svg" />
        </span>
        <span className="tab-btn-label ta-mode-nav__label">{label}</span>
        {meta ? (
          <span className="tab-btn-meta ta-mode-nav__meta" aria-label={metaLabel}>
            {meta}
          </span>
        ) : null}
      </span>
    </button>
  );
}
