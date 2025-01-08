// src/components/layout/FeaturedProject.tsx
import { usePortfolioData } from "../../hooks/usePortfolioData"
import type { Project } from "../interfaces/Project"
import { LoadingState } from "../shared/LoadingState"
import { ErrorState } from "../shared/ErrorState"

interface FeaturedProjectProps {
  project: Project
}

export function FeaturedProject({ project }: FeaturedProjectProps) {
  return (
    <div>
      <div
        className="card bg-base-100 bg-opacity-80 shadow-xl backdrop-blur-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
        data-scroll
      >
        <div className="card-body">
          <h2 className="card-title">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-warning"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            {project.title}
          </h2>
          <div className="mockup-code">
            <pre>
              <code>
                npm install {project.title.toLowerCase().replace(/\s+/g, "-")}
              </code>
            </pre>
          </div>
          <div className="card-actions mt-4 justify-end">
            <button className="btn btn-primary btn-sm transition-transform duration-200 hover:scale-105">
              View Project
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function FeaturedProjectContainer() {
  const { data, loading, error } = usePortfolioData()

  if (loading) return <LoadingState />
  if (error) return <ErrorState message={error.message} />
  if (!data) return null

  const featuredProject = data.projects.find((p) => p.type === "featured")
  return featuredProject ? <FeaturedProject project={featuredProject} /> : null
}
