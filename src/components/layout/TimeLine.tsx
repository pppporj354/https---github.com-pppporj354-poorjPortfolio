// src/components/layout/Timeline.tsx
import { usePortfolioData } from "../../hooks/usePortfolioData"
import type { TimelineEntry } from "../interfaces/Project"
import { LoadingState } from "../shared/LoadingState"
import { ErrorState } from "../shared/ErrorState"

interface TimelineProps {
  entries: TimelineEntry[]
}

export function Timeline({ entries }: TimelineProps) {
  return (
    <div
      className="card bg-base-100 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl md:col-span-3"
      data-scroll
    >
      <div className="card-body">
        <h2 className="card-title mb-4">Experience </h2>
        <ul className="timeline timeline-vertical timeline-snap-icon max-md:timeline-compact">
          {entries.map((entry, index) => (
            <li key={index}>
              {index > 0 && <hr className="bg-primary" />}
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5 text-primary"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div
                className={`mb-10 ${
                  index % 2 === 0
                    ? "timeline-start md:text-end"
                    : "timeline-end"
                }`}
              >
                <time className="font-mono italic">{entry.date}</time>
                <div className="text-lg font-black">{entry.title}</div>
                <p className="text-sm opacity-70">{entry.description}</p>
              </div>
              <hr className="bg-primary" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function TimelineContainer() {
  const { data, loading, error } = usePortfolioData()

  if (loading) return <LoadingState cols={3} />
  if (error) return <ErrorState message={error.message} cols={3} />
  if (!data) return null

  return <Timeline entries={data.timeline} />
}
