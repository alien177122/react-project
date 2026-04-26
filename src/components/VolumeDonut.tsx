import { useMemo, useState, type CSSProperties } from 'react'
import { MUSCLE_META, MUSCLE_ORDER, CAT_ORDER, CAT_META } from '../data/muscles'
import { computeMuscleVol } from '../utils/muscles'
import { donutArc } from '../utils/geometry'

interface DonutSeg {
  muscle: string
  value: number
  pct: number
  startDeg: number
  endDeg: number
  catKey: string
}

export default function VolumeDonut() {
  const [hov, setHov] = useState<string | null>(null)
  const vol = useMemo(() => computeMuscleVol(), [])
  const total = useMemo(
    () => MUSCLE_ORDER.reduce((s, m) => s + (vol[m] || 0), 0),
    [vol],
  )

  const SEG_GAP = 1.5, CAT_GAP = 5
  const usable = 360 - CAT_GAP * 3

  const { segs, catArcs, catVols } = useMemo(() => {
    const nextSegs: DonutSeg[] = []
    let deg = -90

    for (const catKey of CAT_ORDER) {
      const muscles = MUSCLE_ORDER.filter(m => MUSCLE_META[m].catKey === catKey)
      const catVol = muscles.reduce((s, m) => s + (vol[m] || 0), 0)
      const catDegTotal = total > 0 ? (catVol / total) * usable : 0
      const mUsable = catDegTotal - SEG_GAP * (muscles.length - 1)
      for (let i = 0; i < muscles.length; i++) {
        const m = muscles[i], mVol = vol[m] || 0
        const mDeg = catVol > 0 ? (mVol / catVol) * mUsable : 0
        nextSegs.push({ muscle: m, value: mVol, pct: total > 0 ? (mVol / total) * 100 : 0, startDeg: deg, endDeg: deg + mDeg, catKey })
        deg += mDeg + (i < muscles.length - 1 ? SEG_GAP : 0)
      }
      deg += CAT_GAP
    }

    const nextCatArcs = CAT_ORDER.map(catKey => {
      const cs = nextSegs.filter(s => s.catKey === catKey)
      if (!cs.length) return null
      return { catKey, startDeg: cs[0].startDeg, endDeg: cs[cs.length - 1].endDeg, color: CAT_META[catKey].color }
    })

    const nextCatVols = CAT_ORDER.map(
      c => MUSCLE_ORDER.filter(m => MUSCLE_META[m].catKey === c).reduce((s, m) => s + (vol[m] || 0), 0),
    )

    return { segs: nextSegs, catArcs: nextCatArcs, catVols: nextCatVols }
  }, [total, usable, vol])

  const cx = 120, cy = 120
  const RO_OUT = 108, RO_IN = 96
  const RI_OUT = 92,  RI_IN = 56
  const hovSeg = segs.find(s => s.muscle === hov)

  return (
    <div className="donut-wrap">
      <svg width="240" height="240" viewBox="0 0 240 240">
        {catArcs.map(ca => ca && (
          <path key={ca.catKey}
            className="donut-cat-arc"
            d={donutArc(cx, cy, RO_OUT, RO_IN, ca.startDeg, ca.endDeg)}
            fill={ca.color}
            opacity={hov && MUSCLE_META[hov]?.catKey !== ca.catKey ? 0.18 : 0.65}
          />
        ))}
        {segs.map(seg => {
          const isHov = seg.muscle === hov
          return (
            <path key={seg.muscle}
              className={`donut-seg${isHov ? ' is-active' : ''}`}
              d={donutArc(cx, cy, RI_OUT, RI_IN, seg.startDeg, seg.endDeg)}
              fill={MUSCLE_META[seg.muscle].color}
              opacity={hov && !isHov ? 0.2 : 0.88}
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
              <div
                className="donut-cat-hd calc-vol-legend__head"
                style={{ '--donut-color': CAT_META[catKey].color } as CSSProperties}
              >
                {CAT_META[catKey].label}
                <span className="donut-cat-pct">{(total > 0 ? (catVol / total) * 100 : 0).toFixed(0)}%</span>
              </div>
              {muscles.map(m => (
                <div key={m}
                  className={`donut-row calc-vol-legend__row${hov === m ? ' donut-row-hov' : ''}`}
                  style={{ '--donut-color': MUSCLE_META[m].color } as CSSProperties}
                  onMouseEnter={() => setHov(m)}
                  onMouseLeave={() => setHov(null)}
                  onTouchStart={() => setHov(hov === m ? null : m)}
                >
                  <span className="donut-dot" />
                  <span className="donut-name">{MUSCLE_META[m].label}</span>
                  <span className="donut-val">{(vol[m] || 0).toFixed(1)}</span>
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}
