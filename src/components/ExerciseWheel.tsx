import { useState, useEffect } from 'react'
import { EXERCISES, WHEEL_ORDER, TYPE_COLORS, SHORT_NAMES, TYPE_LABELS } from '../constants'
import type { SavedExercise } from '../types'
import { pol, donutArc } from '../utils'

export function ExerciseWheel({ value, onChange, savedExercises = [] }: { value: string; onChange: (key: string) => void; savedExercises?: SavedExercise[] }) {
  const [open, setOpen] = useState(false)
  const [hov, setHov] = useState<string | null>(null)

  useEffect(() => {
    if (!open) return
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', h)
    return () => document.removeEventListener('keydown', h)
  }, [open])

  function pick(key: string) { onChange(key); setOpen(false) }

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
      <button className="ew-trigger" onClick={() => setOpen(true)} type="button">
        <span className="ew-trigger-name">{EXERCISES[value].name}</span>
        <span className="ew-trigger-icon">◈</span>
      </button>

      {open && (
        <div className="ew-overlay" onClick={() => setOpen(false)}>
          <div className="ew-modal" onClick={e => e.stopPropagation()}>
            <div className="ew-modal-title">Выбери упражнение</div>
            <svg className="ew-svg" viewBox="0 0 380 380">
              {WHEEL_ORDER.map((key, i) => {
                const ex = EXERCISES[key]
                const s = i * (SD + GAP)
                const e = s + SD
                const isHov = hov === key
                const isSel = value === key
                const ro = isHov ? RO + 5 : RO
                const color = TYPE_COLORS[ex.type]
                const midDeg = (s + e) / 2
                const [tx, ty] = pol(cx, cy, RL, midDeg)
                const flip = midDeg > 90 && midDeg < 270
                const rot = flip ? midDeg + 180 : midDeg
                return (
                  <g key={key}>
                    <path
                      d={donutArc(cx, cy, ro, RI, s, e)}
                      fill={color}
                      opacity={hov && !isHov ? 0.2 : isSel ? 0.95 : 0.7}
                      stroke={isSel ? '#e8ff3a' : 'none'}
                      strokeWidth={isSel ? 2 : 0}
                      style={{ cursor: 'pointer', transition: 'opacity 0.15s' }}
                      onMouseEnter={() => setHov(key)}
                      onMouseLeave={() => setHov(null)}
                      onTouchStart={() => setHov(hov === key ? null : key)}
                      onClick={() => pick(key)}
                    />
                    <text
                      x={tx} y={ty}
                      textAnchor="middle" dominantBaseline="central"
                      transform={`rotate(${rot},${tx},${ty})`}
                      fill={isHov ? '#fff' : isSel ? '#fff' : '#bbb'}
                      fontFamily="Inter,sans-serif"
                      fontSize={isHov ? '12' : '11'}
                      fontWeight={isHov || isSel ? '600' : '400'}
                      style={{ pointerEvents: 'none', transition: 'fill 0.15s' }}
                    >{SHORT_NAMES[key]}</text>
                    {(() => {
                      const saved = savedExercises.find(s => s.exerciseKey === key)
                      if (!saved) return null
                      const RLO = RO + 14
                      const [lx, ly] = pol(cx, cy, RLO, midDeg)
                      const lrot = flip ? midDeg + 180 : midDeg
                      return (
                        <text
                          x={lx} y={ly}
                          textAnchor="middle" dominantBaseline="central"
                          transform={`rotate(${lrot},${lx},${ly})`}
                          fill={color}
                          fontFamily="'Courier New',monospace"
                          fontSize="9"
                          fontWeight="700"
                          opacity="0.85"
                          style={{ pointerEvents: 'none' }}
                        >{saved.oneRM}</text>
                      )
                    })()}
                  </g>
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
