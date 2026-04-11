import { useState } from 'react'
import { EXERCISES, MUSCLE_CONTRIB, MUSCLE_ORDER, CAT_ORDER, MUSCLE_META, CAT_META } from '../constants'
import { donutArc } from '../utils'

function computeMuscleVol(): Record<string, number> {
  const r: Record<string, number> = {}
  for (const [key, cfg] of Object.entries(EXERCISES)) {
    const contrib = MUSCLE_CONTRIB[key]; if (!contrib) continue
    const avgSets = cfg.weekSchemes.reduce((s, w) => s + w.sets, 0) / cfg.weekSchemes.length
    for (const [m, share] of Object.entries(contrib))
      r[m] = (r[m] || 0) + avgSets * share
  }
  return r
}

export function VolumeDonut() {
  const [hov, setHov] = useState<string | null>(null)
  const vol = computeMuscleVol()
  const total = MUSCLE_ORDER.reduce((s, m) => s + (vol[m] || 0), 0)

  const SEG_GAP = 1.5, CAT_GAP = 5
  const usable = 360 - CAT_GAP * 3

  interface DonutSeg {
    muscle: string; value: number; pct: number
    startDeg: number; endDeg: number; catKey: string
  }
  const segs: DonutSeg[] = []
  let deg = -90

  for (const catKey of CAT_ORDER) {
    const muscles = MUSCLE_ORDER.filter(m => MUSCLE_META[m].catKey === catKey)
    const catVol = muscles.reduce((s, m) => s + (vol[m] || 0), 0)
    const catDegTotal = (catVol / total) * usable
    const mUsable = catDegTotal - SEG_GAP * (muscles.length - 1)
    for (let i = 0; i < muscles.length; i++) {
      const m = muscles[i], mVol = vol[m] || 0
      const mDeg = catVol > 0 ? (mVol / catVol) * mUsable : 0
      segs.push({ muscle: m, value: mVol, pct: (mVol / total) * 100, startDeg: deg, endDeg: deg + mDeg, catKey })
      deg += mDeg + (i < muscles.length - 1 ? SEG_GAP : 0)
    }
    deg += CAT_GAP
  }

  const cx = 120, cy = 120
  const RO_OUT = 108, RO_IN = 96 // outer ring = category
  const RI_OUT = 92,  RI_IN = 56 // inner ring = muscles

  const catArcs = CAT_ORDER.map(catKey => {
    const cs = segs.filter(s => s.catKey === catKey)
    if (!cs.length) return null
    return { catKey, startDeg: cs[0].startDeg, endDeg: cs[cs.length - 1].endDeg, color: CAT_META[catKey].color }
  })

  const catVols = CAT_ORDER.map(c => MUSCLE_ORDER.filter(m => MUSCLE_META[m].catKey === c).reduce((s, m) => s + (vol[m] || 0), 0))
  const hovSeg = segs.find(s => s.muscle === hov)

  return (
    <div className="donut-wrap">
      <svg width="240" height="240" viewBox="0 0 240 240">
        {catArcs.map(ca => ca && (
          <path key={ca.catKey}
            d={donutArc(cx, cy, RO_OUT, RO_IN, ca.startDeg, ca.endDeg)}
            fill={ca.color}
            opacity={hov && MUSCLE_META[hov]?.catKey !== ca.catKey ? 0.18 : 0.65}
            style={{ transition: 'opacity 0.15s' }}
          />
        ))}
        {segs.map(seg => {
          const isHov = seg.muscle === hov
          const ro = isHov ? RI_OUT + 5 : RI_OUT
          return (
            <path key={seg.muscle}
              d={donutArc(cx, cy, ro, RI_IN, seg.startDeg, seg.endDeg)}
              fill={MUSCLE_META[seg.muscle].color}
              opacity={hov && !isHov ? 0.2 : 0.88}
              style={{ cursor: 'pointer', transition: 'opacity 0.15s' }}
              onMouseEnter={() => setHov(seg.muscle)}
              onMouseLeave={() => setHov(null)}
              onTouchStart={() => setHov(hov === seg.muscle ? null : seg.muscle)}
            />
          )
        })}
        {hovSeg ? (<>
          <text x={cx} y={cy - 10} textAnchor="middle" fill="#fff" fontFamily="Inter,sans-serif" fontSize="12" fontWeight="600">{MUSCLE_META[hovSeg.muscle].label}</text>
          <text x={cx} y={cy + 6}  textAnchor="middle" fill={MUSCLE_META[hovSeg.muscle].color} fontFamily="'Courier New',monospace" fontSize="15" fontWeight="700">{hovSeg.value.toFixed(1)}</text>
          <text x={cx} y={cy + 20} textAnchor="middle" fill="#666" fontFamily="Inter,sans-serif" fontSize="10">сет / цикл</text>
          <text x={cx} y={cy + 33} textAnchor="middle" fill="#555" fontFamily="Inter,sans-serif" fontSize="10">{hovSeg.pct.toFixed(0)}% объёма</text>
        </>) : (<>
          <text x={cx} y={cy - 6}  textAnchor="middle" fill="#555" fontFamily="Inter,sans-serif" fontSize="9" letterSpacing="2">ОБЪЁМ</text>
          <text x={cx} y={cy + 10} textAnchor="middle" fill="#888" fontFamily="'Courier New',monospace" fontSize="12">{total.toFixed(0)} сет</text>
          <text x={cx} y={cy + 24} textAnchor="middle" fill="#555" fontFamily="Inter,sans-serif" fontSize="9">за цикл</text>
        </>)}
      </svg>

      <div className="donut-legend">
        {CAT_ORDER.map((catKey, ci) => {
          const muscles = MUSCLE_ORDER.filter(m => MUSCLE_META[m].catKey === catKey)
          const catVol = catVols[ci]
          return (
            <div key={catKey} className="donut-cat">
              <div className="donut-cat-hd" style={{ color: CAT_META[catKey].color }}>
                {CAT_META[catKey].label}
                <span className="donut-cat-pct">{((catVol / total) * 100).toFixed(0)}%</span>
              </div>
              {muscles.map(m => (
                <div key={m}
                  className={`donut-row${hov === m ? ' donut-row-hov' : ''}`}
                  onMouseEnter={() => setHov(m)}
                  onMouseLeave={() => setHov(null)}
                  onTouchStart={() => setHov(hov === m ? null : m)}
                >
                  <span className="donut-dot" style={{ background: MUSCLE_META[m].color }} />
                  <span className="donut-name">{MUSCLE_META[m].label}</span>
                  <span className="donut-val" style={{ color: MUSCLE_META[m].color }}>{(vol[m] || 0).toFixed(1)}</span>
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}
