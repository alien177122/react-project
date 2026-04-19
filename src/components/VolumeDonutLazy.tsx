import { Suspense, lazy } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const VolumeDonut = lazy(() => import('./VolumeDonut'))

function DonutSkeleton() {
  return (
    <div className="donut-wrap donut-skeleton" aria-hidden="true">
      <div className="donut-skeleton-svg" />
      <div className="donut-skeleton-legend" />
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
