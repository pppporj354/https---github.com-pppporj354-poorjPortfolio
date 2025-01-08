// src/components/layout/SkillsCard.tsx
import { usePortfolioData } from "../../hooks/usePortfolioData"
import type { Skill } from "../interfaces/Project"
import { LoadingState } from "../shared/LoadingState"
import { ErrorState } from "../shared/ErrorState"

interface SkillsCardProps {
  skills: Skill[]
}

export function SkillsCard({ skills }: SkillsCardProps) {
  return (
    <div
      className="card bg-base-100 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
      data-scroll
    >
      <div className="card-body">
        <h2 className="card-title">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <div
              key={index}
              className={`badge badge-${skill.type} badge-lg cursor-pointer transition-all duration-300 hover:badge-outline`}
            >
              {skill.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function SkillsCardContainer() {
  const { data, loading, error } = usePortfolioData()

  if (loading) return <LoadingState />
  if (error) return <ErrorState message={error.message} />
  if (!data) return null

  return <SkillsCard skills={data.skills} />
}
