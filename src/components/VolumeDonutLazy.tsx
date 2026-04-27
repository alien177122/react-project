import { Suspense, lazy } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const VolumeDonut = lazy(() => import('./VolumeDonut'))

function DonutSkeleton() {
  return (
    <div className="ta-vol ta-vol--skeleton" aria-hidden="true">
      <div className="ta-vol__skeleton-summary" />
      <div className="ta-vol__skeleton-grid">
        <div className="ta-vol__skeleton-donut" />
        <div className="ta-vol__skeleton-list" />
      </div>
    </div>
  )
}

export default function VolumeDonutLazy() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({
    rootMargin: '200px 0px',
  })

  return (
    <div ref={ref}>
      {isVisible
        ? (
          <Suspense fallback={<DonutSkeleton />}>
            <VolumeDonut />
          </Suspense>
        )
        : <DonutSkeleton />
      }
    </div>
  )
}
