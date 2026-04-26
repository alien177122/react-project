import { useCallback, useId, useMemo, useRef, useState } from 'react'
import type { SavedExercise } from '../types'
import { EXERCISES, WHEEL_ORDER, TYPE_COLORS, TYPE_LABELS } from '../data/exercises'
import { useFocusTrap } from '../hooks/useFocusTrap'
import { ExerciseWheelSegment } from './ExerciseWheelSegment'

// ============================================================
// КОЛЕСО ВЫБОРА УПРАЖНЕНИЙ — модальное окно с SVG-диаграммой
// Клик по сегменту устанавливает selectedExercise в App
// Цвет сегмента = тип снаряда (A=жёлтый, B=оранжевый, C=синий, D=зелёный)
// ============================================================
interface ExerciseWheelProps {
  value: string
  onChange: (key: string) => void
  savedExercises?: SavedExercise[]
}

export default function ExerciseWheel({ value, onChange, savedExercises = [] }: ExerciseWheelProps) {
  const [open, setOpen] = useState(false)
  const [hov, setHov] = useState<string | null>(null)
  const titleId = useId()
  const modalRef = useRef<HTMLDivElement>(null)
  const dialogId = `${titleId}-dialog`
  const savedByKey = useMemo(
    () => new Map(savedExercises.map(saved => [saved.exerciseKey, saved])),
    [savedExercises],
  )

  const close = useCallback(() => {
    setOpen(false)
    setHov(null)
  }, [])
  useFocusTrap(open, modalRef, close)

  function pick(key: string) {
    onChange(key)
    close()
  }

  const N = WHEEL_ORDER.length
  const GAP = 1.5
  const USABLE = 360 - GAP * N
  const SD = USABLE / N

  const cx = 190, cy = 190
  const RO = 165
  const RI = 78
  const RL = 122

  return (
    <>
      <button
        className="ew-trigger"
        onClick={() => setOpen(true)}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? dialogId : undefined}
      >
        <span className="ew-trigger-name">{EXERCISES[value].name}</span>
        <span className="ew-trigger-icon">◈</span>
      </button>

      {open && (
        <div className="ew-overlay" onClick={close}>
          <div
            ref={modalRef}
            id={dialogId}
            className="ew-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            onClick={e => e.stopPropagation()}
          >
            <div id={titleId} className="ew-modal-title">Выбери упражнение</div>
            <svg className="ew-svg" viewBox="0 0 380 380">
              {WHEEL_ORDER.map((key, i) => {
                return (
                  <ExerciseWheelSegment
                    key={key}
                    exerciseKey={key}
                    index={i}
                    segmentDeg={SD}
                    gap={GAP}
                    selectedKey={value}
                    hoveredKey={hov}
                    saved={savedByKey.get(key)}
                    cx={cx}
                    cy={cy}
                    ro={RO}
                    ri={RI}
                    labelRadius={RL}
                    onHover={setHov}
                    onPick={pick}
                  />
                )
              })}
              {hov ? (<>
                <text x={cx} y={cy - 12} textAnchor="middle" fill="#fff" fontFamily="Inter,sans-serif" fontSize="13" fontWeight="600">{EXERCISES[hov].name}</text>
                <text x={cx} y={cy + 6}  textAnchor="middle" fill={TYPE_COLORS[EXERCISES[hov].type]} fontFamily="'Courier New',monospace" fontSize="11">{TYPE_LABELS[EXERCISES[hov].type]}</text>
                {EXERCISES[hov].isPullup && (
                  <text x={cx} y={cy + 22} textAnchor="middle" fill="#666" fontFamily="Inter,sans-serif" fontSize="10">тело + доп. вес</text>
                )}
              </>) : (<>
                <text x={cx} y={cy - 8} textAnchor="middle" fill="#555" fontFamily="Inter,sans-serif" fontSize="11" letterSpacing="2">ВЫБЕРИ</text>
                <text x={cx} y={cy + 8} textAnchor="middle" fill="#555" fontFamily="Inter,sans-serif" fontSize="11" letterSpacing="2">УПРАЖНЕНИЕ</text>
              </>)}
            </svg>
            <div className="ew-legend">
              {Object.entries(TYPE_COLORS).map(([t, c]) => (
                <div key={t} className="ew-legend-item">
                  <span className="ew-legend-dot" style={{ background: c }} />
                  <span>{TYPE_LABELS[t]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
