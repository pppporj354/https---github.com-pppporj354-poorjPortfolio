import { usePortfolioData } from "../../hooks/usePortfolioData"
import type { Project } from "../interfaces/Project"
import { LoadingState } from "../shared/LoadingState"
import { ErrorState } from "../shared/ErrorState"
import { useState } from "react"

interface ProjectCardProps {
  project: Project
}

function ProjectCard({ project }: ProjectCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const fallbackImage = "https://placehold.co/600x400?text=Project+Preview"

  return (
    <div
      className="card lg:card-side bg-base-100 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
      data-scroll
    >
      {/* Image Container - Left Side */}
      <figure className="relative w-full lg:w-48 h-full">
        {/* Loading Skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-base-300 animate-pulse lg:rounded-l-xl lg:rounded-tr-none rounded-t-xl" />
        )}
        {/* Project Image */}
        <img
          src={project.image || fallbackImage}
          alt={project.title}
          className={`w-full h-48 object-cover lg:rounded-l-xl lg:rounded-tr-none rounded-t-xl transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            e.currentTarget.src = fallbackImage
            setImageLoaded(true)
          }}
        />
      </figure>

      {/* Content - Right Side */}
      <div className="card-body">
        <h2 className="card-title">
          {project.title}
          {project.type === "featured" && (
            <div className="badge badge-warning">Featured</div>
          )}
        </h2>
        <p className="text-sm opacity-70">{project.description}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {project.technologies.map((tech, index) => (
            <div
              key={index}
              className={`badge badge-${tech.type} badge-outline`}
            >
              {tech.name}
            </div>
          ))}
        </div>
        <div className="card-actions justify-end mt-4">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fillRule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clipRule="evenodd"
                />
              </svg>
              Demo
            </a>
          )}
          {project.sourceUrl && (
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              Source
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ProjectsPage() {
  const { data, loading, error } = usePortfolioData()

  if (loading) return <LoadingState cols={3} />
  if (error) return <ErrorState message={error.message} cols={3} />
  if (!data) return null

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="hero bg-base-200 rounded-box p-8">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-4">My Projects</h1>
            <p className="opacity-70">
              A collection of my work, side projects, and experiments
            </p>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}
