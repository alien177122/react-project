import {Fragment, useState} from 'react';
import {EXERCISES, TYPE_LABELS} from '../data/exercises';
import {EXERCISES_V3} from '@shared/program/v3';
import {PlateDiagram} from './PlateDiagram';
import type {TrainingDayDef} from '../types';
import type {TrainingExerciseRow} from '../utils/training';
import {calcWarmupSets, volumeClass} from '../utils/calc';

function formatWeight(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

function barWeightForType(type: 'A' | 'B' | 'C' | 'D'): number {
  return type === 'B' ? 10 : 20;
}

function loadNoteForExercise(config: (typeof EXERCISES)[string] | undefined): string {
  if (!config) return 'Это упражнение: схема блинов не применяется.';

  if (config.isPullup) {
    return 'Для подтягиваний рабочая нагрузка показана как доп. вес к весу тела.';
  }

  if (config.type === 'D') {
    return `${TYPE_LABELS[config.type]}: подбери удобное положение. Амплитуда не слишком большая и не слишком маленькая; идеально — 90–120 градусов.`;
  }

  return `${TYPE_LABELS[config.type]}: схема блинов не применяется.`;
}

function exerciseConfigForKey(key: string) {
  return (
    EXERCISES[key] ??
    (EXERCISES_V3[key]
      ? {
          name: EXERCISES_V3[key].name,
          type: (EXERCISES_V3[key].step >= 2.5 ? 'A' : 'C') as 'A' | 'B' | 'C' | 'D',
          isPullup: EXERCISES_V3[key].isPullup,
        }
      : undefined)
  );
}

function formatDisplayWeight(ex: TrainingExerciseRow, hideWeights: boolean): string {
  if (ex.loadHint && ex.weight <= 0) return ex.loadHint;
  if (hideWeights || ex.weight <= 0) return '—';
  if (ex.isPullup && ex.extraWeight != null) {
    return ex.extraWeight >= 0 ? `+${ex.extraWeight.toFixed(1)}` : ex.extraWeight.toFixed(1);
  }
  return ex.weight.toFixed(1);
}

function schemeLabel(ex: TrainingExerciseRow): string {
  if (ex.progressionMode === 'pyramid') {
    return '↓ пирамида';
  }
  if (ex.scheme.sets !== 4) {
    return `${ex.scheme.sets} × ${ex.scheme.reps}`;
  }
  return `${ex.scheme.sets} × ${ex.scheme.reps}`;
}

function looksLikePyramidTaper(sets: {weight: number; reps: number}[]): boolean {
  if (sets.length < 2) return false;
  const allSame = sets.every(s => s.weight === sets[0]!.weight && s.reps === sets[0]!.reps);
  if (allSame) return false;

  const weightDown = sets.every((s, i) => i === 0 || s.weight <= sets[i - 1]!.weight);
  const repsUp = sets.every((s, i) => i === 0 || s.reps >= sets[i - 1]!.reps);
  const weightUp = sets.every((s, i) => i === 0 || s.weight >= sets[i - 1]!.weight);
  const repsDown = sets.every((s, i) => i === 0 || s.reps <= sets[i - 1]!.reps);

  return (weightDown && repsUp) || (weightUp && repsDown);
}

function workingSetWeightLabel(
  set: {weight: number},
  ex: TrainingExerciseRow,
  hideWeights: boolean,
): string {
  if (hideWeights || set.weight <= 0) return '—';
  if (ex.isPullup && ex.extraWeight != null) {
    const extra = ex.extraWeight + (set.weight - ex.weight);
    return extra >= 0 ? `+${extra.toFixed(1)}` : extra.toFixed(1);
  }
  return formatWeight(set.weight);
}

// ============================================================
// КАРТОЧКА ДНЯ ТРЕНИРОВКИ — используется во вкладке "Тренировка"
// isPreview=true → затемнённая карточка "следующего дня"
// ============================================================
export default function TrainingDayCard({
  dayDef,
  weekIndex,
  exercises,
  isPreview,
  hideWeights,
  variant = 'default',
}: {
  dayDef: TrainingDayDef;
  weekIndex: number;
  exercises: TrainingExerciseRow[];
  isPreview?: boolean;
  hideWeights?: boolean;
  variant?: 'default' | 'split-preview';
}) {
  const [openExerciseKey, setOpenExerciseKey] = useState<string | null>(null);

  const cardClass = [
    'training-card',
    isPreview ? 'training-card-preview' : '',
    variant === 'split-preview' ? 'training-card--split-preview' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cardClass}>
      <div className="training-card-head">
        <span className="training-card-day">День {dayDef.dayNumber}</span>
        <span className="training-card-name">{dayDef.name}</span>
        <span className="training-card-week">Нед {weekIndex + 1}</span>
      </div>
      <table className="pt">
        <thead>
          <tr>
            <th style={{textAlign: 'left'}}>Упражнение</th>
            <th>Вес, кг</th>
            <th>Схема</th>
            <th>Повт</th>
          </tr>
        </thead>
        <tbody>
          {exercises.map(ex => {
            const config = exerciseConfigForKey(ex.key);
            const isOpen = openExerciseKey === ex.key;
            const panelId = `training-load-${dayDef.dayNumber}-${weekIndex + 1}-${ex.key}`;
            const displayWeight = formatDisplayWeight(ex, !!hideWeights);
            const barWeight = config ? barWeightForType(config.type) : 20;
            const canShowPlates =
              !!config && !config.isPullup && (config.type === 'A' || config.type === 'B');
            const warmups = config
              ? calcWarmupSets(ex.warmupTopWeight, config).map(set => ({
                  ...set,
                  weight: canShowPlates ? Math.max(set.weight, barWeight) : set.weight,
                }))
              : [];
            const isPyramid = ex.progressionMode === 'pyramid';
            const showPyramidLayout = isPyramid || looksLikePyramidTaper(ex.workingSets);
            const pyramidSets = ex.workingSets;

            return (
              <Fragment key={ex.key}>
                <tr className={isOpen ? 'training-row is-expanded' : 'training-row'}>
                  <td className="training-exercise-cell">
                    <button
                      type="button"
                      className="training-exercise-trigger"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenExerciseKey(isOpen ? null : ex.key)}>
                      <span>{ex.name}</span>
                      <span className="training-exercise-trigger__hint">
                        {isOpen ? 'Скрыть' : 'Разбор'}
                      </span>
                    </button>
                  </td>
                  <td className="w-kg">{displayWeight}</td>
                  <td className={`w-sr${isPyramid ? ' training-scheme-pyramid' : ''}`}>
                    {isPyramid ? (
                      schemeLabel(ex)
                    ) : ex.scheme.sets !== 4 ? (
                      <>
                        <b>{ex.scheme.sets}</b> × {ex.scheme.reps}
                      </>
                    ) : (
                      <>
                        {ex.scheme.sets} × {ex.scheme.reps}
                      </>
                    )}
                  </td>
                  <td className={volumeClass(ex.totalReps)}>{ex.totalReps}</td>
                </tr>
                {isOpen && (
                  <tr className="training-load-row">
                    <td colSpan={4}>
                      <div
                        className="ta-shell training-load-menu"
                        id={panelId}
                        role="region"
                        aria-label={`Схема и разминка: ${ex.name}`}>
                        <div className="training-load-menu__head">
                          <div>
                            <div className="training-load-menu__eyebrow">
                              {isPyramid ? 'Пирамида нагрузки' : 'Схема подхода'}
                            </div>
                            <h3 className="training-load-menu__title">{ex.name}</h3>
                          </div>
                          <div className="training-load-menu__work">
                            <span>{displayWeight}</span>
                            <small>
                              кг ·{' '}
                              {isPyramid
                                ? schemeLabel(ex)
                                : `${ex.scheme.sets} × ${ex.scheme.reps}`}
                            </small>
                          </div>
                        </div>

                        <div className="training-load-menu__section">
                          <div className="training-load-menu__eyebrow">Рабочие подходы</div>
                          <ul
                            className={[
                              'training-working-sets',
                              showPyramidLayout ? 'training-working-sets--pyramid' : '',
                            ]
                              .filter(Boolean)
                              .join(' ')}
                            aria-label={`Рабочие подходы: ${ex.name}`}>
                            {pyramidSets.map(set => (
                              <li
                                className="training-working-sets__item"
                                key={`${ex.key}-set-${set.set}`}>
                                <span className="training-working-sets__set">#{set.set}</span>
                                <span className="training-working-sets__weight">
                                  {workingSetWeightLabel(set, ex, !!hideWeights)} кг
                                </span>
                                <span className="training-working-sets__reps">{set.reps} повт</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {canShowPlates ? (
                          <PlateDiagram weight={ex.warmupTopWeight} barWeight={barWeight} />
                        ) : (
                          <div className="training-load-menu__note">
                            {loadNoteForExercise(config)}
                          </div>
                        )}

                        <div className="training-load-menu__section">
                          <div className="training-load-menu__eyebrow">Разминочные подходы</div>
                          {warmups.length > 0 ? (
                            <ul
                              className="training-warmups"
                              aria-label={`Разминочные подходы для ${ex.name}`}>
                              {warmups.map(warmup => (
                                <li
                                  className="training-warmups__item"
                                  key={`${warmup.label}-${warmup.weight}-${warmup.reps}`}>
                                  <span className="training-warmups__label">{warmup.label}</span>
                                  <span className="training-warmups__weight">
                                    {formatWeight(warmup.weight)} кг
                                  </span>
                                  <span className="training-warmups__reps">{warmup.reps} повт</span>
                                  <span className="training-warmups__rest">{warmup.rest}</span>
                                  <span className="training-warmups__purpose">
                                    {warmup.purpose}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <div className="training-load-menu__note">
                              Разминка: 2–3 лёгких подхода с собственным весом, затем рабочая схема.
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
