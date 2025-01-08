// src/components/layout/ProjectShowcase.tsx
import { usePortfolioData } from "../../hooks/usePortfolioData"
import type { Project } from "../interfaces/Project"
import { ErrorState } from "../shared/ErrorState"
import { LoadingState } from "../shared/LoadingState"

interface ProjectShowcaseProps {
  projects: Project[]
}

export function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  return (
    <div
      className="card glass shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl md:col-span-2"
      data-scroll
    >
      <div className="card-body">
        <h2 className="card-title text-2xl font-bold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-success"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
            />
          </svg>
          Project Showcase
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <div key={project.id} className="card bg-base-200">
              <figure className="px-4 pt-4">
                <div className="h-48 w-full animate-pulse rounded-xl bg-gradient-to-r from-primary to-secondary" />
              </figure>
              <div className="card-body">
                <h3 className="card-title text-lg">{project.title}</h3>
                <p className="text-sm opacity-70">{project.description}</p>
                <div className="card-actions">
                  {project.technologies.map((tech, index) => (
                    <div
                      key={index}
                      className={`badge badge-${tech.type} badge-outline`}
                    >
                      {tech.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ProjectShowcaseContainer() {
  const { data, loading, error } = usePortfolioData()

  if (loading) return <LoadingState cols={2} />
  if (error) return <ErrorState message={error.message} cols={2} />
  if (!data) return null

  const showcaseProjects = data.projects.filter((p) => p.type === "showcase")
  return <ProjectShowcase projects={showcaseProjects} />
}
