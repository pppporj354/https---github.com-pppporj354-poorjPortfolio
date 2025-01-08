// src/components/layout/StatsGrid.tsx
import { usePortfolioData } from "../../hooks/usePortfolioData"
import type { Stats } from "../interfaces/Project"

import { ErrorState } from "../shared/ErrorState"

interface StatsGridProps {
  stats: Stats
}

export function StatsGridComponent({ stats }: StatsGridProps) {
  return (
    <div className="stats bg-base-100 shadow md:col-span-3" data-scroll>
      <div className="stat place-items-center">
        <div className="stat-title">Projects</div>
        <div className="stat-value text-primary">{stats.projects.count}</div>
        {/* <div className="stat-desc">↗︎ {stats.projects.increase} increase</div> */}
      </div>
      <div className="stat place-items-center">
        <div className="stat-title">Experience</div>
        <div className="stat-value text-secondary">
          {stats.experience.years}
        </div>
        <div className="stat-desc">Professional Experience</div>
      </div>
      <div className="stat place-items-center">
        <div className="stat-title">Clients</div>
        <div className="stat-value text-accent">{stats.clients.count}</div>
        <div className="stat-desc">Satisfied Clients</div>
      </div>
    </div>
  )
}

// src/components/layout/StatsGrid.tsx
export default function StatsGrid() {
  const { data, loading, error } = usePortfolioData()

  if (loading) {
    return (
      <div className={`stats shadow md:col-span-3 animate-pulse`}>
        {[1, 2, 3].map((i) => (
          <div key={i} className="stat place-items-center">
            <div className="h-4 w-20 rounded bg-base-300"></div>
            <div className="h-8 w-16 rounded bg-base-300 mt-2"></div>
            <div className="h-4 w-24 rounded bg-base-300 mt-2"></div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return <ErrorState message={error.message} cols={3} />
  }

  if (!data) return null

  return <StatsGridComponent stats={data.stats} />
}
