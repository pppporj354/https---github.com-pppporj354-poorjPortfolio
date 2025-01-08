// src/components/layout/StatsCard.tsx
import { usePortfolioData } from "../../hooks/usePortfolioData"
import type { Stats } from "../interfaces/Project"
import { LoadingState } from "../shared/LoadingState"
import { ErrorState } from "../shared/ErrorState"
interface StatsCardProps {
  stats: Stats
}

export function StatsCard({ stats }: StatsCardProps) {
  const { projects } = stats

  return (
    <div
      className="stats bg-base-100 shadow transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      data-scroll
    >
      <div className="stat transition-colors duration-200 hover:bg-base-200">
        <div className="stat-title opacity-70">Projects</div>
        <div className="stat-value text-primary">{projects.count}</div>
        <div className="stat-desc text-success">
          ↗︎ {projects.increase} increase
        </div>
      </div>
    </div>
  )
}

export default function StatsCardContainer() {
  const { data, loading, error } = usePortfolioData()

  if (loading) return <LoadingState />
  if (error) return <ErrorState message={error.message} />
  if (!data) return null

  return <StatsCard stats={data.stats} />
}
