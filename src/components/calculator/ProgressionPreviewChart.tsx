import {useEffect, useState, type CSSProperties, type KeyboardEvent} from 'react';
import type {ProgramSettings} from '../../types';
import {
  getProgressionPreviewMeta,
  getTestWeekExplanation,
} from '@shared/program/progressionPreview';
import {PROGRESSION_PRESET_META} from '@shared/program/progressionPresets';
import {useProgressionPreview, type PreviewChartWeek} from '../../hooks/useProgressionPreview';

const TIP_WIDTH = 232;
const TIP_HEIGHT = 78;
const TIP_MARGIN = 16;
const CHART_WIDTH = 800;

function formatWeight(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

function weightLabel(week: PreviewChartWeek): string {
  if (week.weightDisplay != null) return week.weightDisplay;
  if (week.hasWeight && week.weight != null) return `${formatWeight(week.weight)} кг`;
  return week.loadLabel ?? '—';
}

function schemeLabel(week: PreviewChartWeek): string {
  return week.schemeDisplay ?? `${week.sets}×${week.reps}`;
}

function volumeLabel(week: PreviewChartWeek): string {
  if (week.repsDisplay != null) return `${week.repsDisplay} повт`;
  return `${week.totalReps} повт`;
}

function phaseHint(week: PreviewChartWeek): string {
  if (week.isTestWeek) {
    if (week.pct != null) {
      return `по программе ${week.pct}% · повторы на отказе`;
    }
    return 'введите вес×повторы после отказа';
  }
  const label = week.phaseLabel;
  if (label === 'Разгрузка') return 'восстановление';
  if (label === 'Пик') return 'пик';
  if (label === 'Сила') return 'интенсификация';
  if (label === 'Гипертрофия') return 'гипертрофия';
  return 'накопление';
}

interface ProgressionPreviewChartProps {
  settings: ProgramSettings;
}

export default function ProgressionPreviewChart({settings}: ProgressionPreviewChartProps) {
  const meta = getProgressionPreviewMeta(settings);
  const {weeks, phases, linePath, areaPath, viewBox, grid, deloadWeek} =
    useProgressionPreview(settings);
  const presetMeta = PROGRESSION_PRESET_META[settings.progressionPreset];
  const testWeekExplanation = getTestWeekExplanation(settings.progressionPreset);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    setActiveIndex(null);
  }, [settings.progressionPreset, settings.daysPerWeek]);

  const active = activeIndex == null ? null : weeks[activeIndex];
  const tipX = active
    ? Math.max(TIP_MARGIN, Math.min(CHART_WIDTH - TIP_WIDTH - TIP_MARGIN, active.x - TIP_WIDTH / 2))
    : TIP_MARGIN;

  const listDesc =
    deloadWeek != null
      ? `${weeks.length} недель: рабочий вес и фаза. Неделя ${deloadWeek} — разгрузка.`
      : `${weeks.length} недель: рабочий вес и фаза по неделям.`;

  const svgDesc =
    deloadWeek != null
      ? `${weeks.length} недель: интенсивность в килограммах и объём в повторениях. Неделя ${deloadWeek} — разгрузка.`
      : `${weeks.length} недель: интенсивность в килограммах и объём в повторениях.`;

  const keyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setActiveIndex(null);
      return;
    }
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    const current = activeIndex ?? 0;
    const delta = event.key === 'ArrowRight' ? 1 : -1;
    setActiveIndex(Math.max(0, Math.min(weeks.length - 1, current + delta)));
  };

  return (
    <section
      key={`${settings.progressionPreset}-${settings.daysPerWeek}`}
      className="progression-preview ta-period"
      aria-label={`Пример прогрессии: ${meta.title}, ${presetMeta.label}`}>
      <header className="progression-preview__head">
        <p className="progression-preview__title">{meta.title}</p>
        <p className="progression-preview__meta">{meta.subtitle}</p>
        <p className="progression-preview__note">{testWeekExplanation}</p>
      </header>

      <p id="progression-preview-list-desc" className="progression-preview__sr-only">
        {presetMeta.description}. {listDesc}
      </p>

      <div className="ta-period__phases" aria-hidden="true">
        {phases.map(phase => (
          <span
            key={`${phase.label}-${phase.weeks}`}
            className="ta-period__phase"
            style={
              {
                flexGrow: phase.weeks,
                '--phase-color': `var(${phase.colorVar})`,
                '--phase-bg': `var(${phase.tintVar})`,
              } as CSSProperties
            }>
            {phase.label}
          </span>
        ))}
      </div>

      <div className="ta-period__scroll">
        <svg
          className="ta-period__svg"
          viewBox={viewBox}
          preserveAspectRatio="none"
          role="img"
          aria-labelledby="progression-preview-title progression-preview-desc">
          <title id="progression-preview-title">Пример прогрессии по неделям</title>
          <desc id="progression-preview-desc">{svgDesc}</desc>
          {grid.map(y => (
            <line key={y} className="ta-period__grid" x1="56" x2="744" y1={y} y2={y} />
          ))}
          <text className="ta-period__axis" x="12" y="34">
            кг
          </text>
          <text className="ta-period__axis" x="748" y="34">
            повт
          </text>
          <path className="ta-period__area" d={areaPath} />
          <path className="ta-period__line" d={linePath} pathLength={1} />
          {weeks.map((week, index) => (
            <g key={week.week}>
              <rect
                className={`ta-period__bar${activeIndex === index ? ' is-active' : ''}${week.isDeload ? ' is-deload' : ''}${week.isTestWeek ? ' is-test' : ''}`}
                x={week.barX}
                y={week.barY}
                width="40"
                height={week.barHeight}
                style={{animationDelay: `${index * 60}ms`}}
                onPointerEnter={() => setActiveIndex(index)}
                onPointerLeave={() => setActiveIndex(null)}
              />
              {week.isTestWeek && !week.hasWeight ? (
                <>
                  <circle
                    className={`ta-period__point ta-period__point--test${activeIndex === index ? ' is-active' : ''}`}
                    cx={week.x}
                    cy={week.y}
                    r="3"
                    onPointerEnter={() => setActiveIndex(index)}
                    onPointerLeave={() => setActiveIndex(null)}
                  />
                  <text
                    className="ta-period__test-mark"
                    x={week.x}
                    y={week.y - 10}
                    textAnchor="middle"
                    onPointerEnter={() => setActiveIndex(index)}
                    onPointerLeave={() => setActiveIndex(null)}>
                    ?
                  </text>
                </>
              ) : week.hasWeight ? (
                <circle
                  className={`ta-period__point${week.isTestWeek ? ' ta-period__point--test' : ''}${activeIndex === index ? ' is-active' : ''}`}
                  cx={week.x}
                  cy={week.y}
                  r="4"
                  onPointerEnter={() => setActiveIndex(index)}
                  onPointerLeave={() => setActiveIndex(null)}
                />
              ) : (
                <circle
                  className={`ta-period__point ta-period__point--muted${activeIndex === index ? ' is-active' : ''}`}
                  cx={week.x}
                  cy={week.y}
                  r="3"
                  onPointerEnter={() => setActiveIndex(index)}
                  onPointerLeave={() => setActiveIndex(null)}
                />
              )}
              <text className="ta-period__week-label" x={week.x} y="264" textAnchor="middle">
                {week.week}
              </text>
            </g>
          ))}
          {active ? (
            <g className="ta-period__tip" transform={`translate(${tipX}, 14)`}>
              <line
                className="ta-period__cursor"
                x1={active.x - tipX}
                x2={active.x - tipX}
                y1="0"
                y2="228"
              />
              <rect width={TIP_WIDTH} height={TIP_HEIGHT} rx="10" />
              <text x="14" y="21">
                Неделя {active.week} · {active.phaseLabel}
              </text>
              <text x="14" y="42">
                {weightLabel(active)} · {schemeLabel(active)}
              </text>
              <text x="14" y="63">
                {volumeLabel(active)} · {phaseHint(active)}
              </text>
            </g>
          ) : null}
        </svg>
      </div>

      <div
        className="ta-period__weeks ta-period__weeks--preview"
        role="listbox"
        aria-label="Недели примера прогрессии"
        aria-describedby="progression-preview-list-desc"
        onKeyDown={keyDown}>
        {weeks.map((week, index) => (
          <button
            key={week.week}
            id={`progression-preview-week-${week.week}`}
            className={`ta-period-week${activeIndex === index ? ' is-active' : ''}${week.isDeload ? ' is-deload' : ''}${week.isTestWeek ? ' is-test' : ''}`}
            type="button"
            role="option"
            aria-selected={activeIndex === index}
            style={
              {
                '--phase-color': `var(${week.phaseColorVar})`,
                '--phase-bg': `var(${week.phaseTintVar})`,
              } as CSSProperties
            }
            onFocus={() => setActiveIndex(index)}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            onClick={() => setActiveIndex(activeIndex === index ? null : index)}>
            <span>Нед {week.week}</span>
            <strong>{weightLabel(week)}</strong>
            <span>{schemeLabel(week)}</span>
            <span>{volumeLabel(week)}</span>
            <em>{week.phaseLabel}</em>
          </button>
        ))}
      </div>
    </section>
  );
}
