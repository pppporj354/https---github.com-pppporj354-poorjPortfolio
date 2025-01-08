// src/components/layout/RecentActivity.tsx
import { usePortfolioData } from "../../hooks/usePortfolioData"
import type { Activity } from "../interfaces/Project"
import { LoadingState } from "../shared/LoadingState"
import { ErrorState } from "../shared/ErrorState"

interface RecentActivityProps {
  activities: Activity[]
}

export function RecentActivity({ activities }: RecentActivityProps) {
  const getStatusIcon = (status: Activity["status"]) => {
    switch (status) {
      case "completed":
        return "✓"
      case "in-progress":
        return "●"
      case "pending":
        return "○"
    }
  }

  return (
    <div
      className="card bg-base-100 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
      data-scroll
    >
      <div className="card-body">
        <h2 className="card-title">Recent Activity</h2>
        <ul className="steps steps-vertical">
          {activities.map((activity) => (
            <li
              key={activity.id}
              data-content={getStatusIcon(activity.status)}
              className={`step ${
                activity.status === "completed" ? "step-primary" : ""
              } font-medium`}
            >
              {activity.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function RecentActivityContainer() {
  const { data, loading, error } = usePortfolioData()

  if (loading) return <LoadingState />
  if (error) return <ErrorState message={error.message} />
  if (!data) return null

  return <RecentActivity activities={data.activities} />
}
