// src/components/layout/ProfileCard.tsx
import { usePortfolioData } from "../../hooks/usePortfolioData"
import type { ProfileData } from "../interfaces/Project"
import { useState } from "react"

interface ProfileCardProps {
  profileData: ProfileData
}

export function ProfileCard({ profileData }: ProfileCardProps) {
  const { name, role, avatar, status } = profileData
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <div
      className="card bg-base-100 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl md:col-span-2"
      data-scroll
    >
      <div className="card-body">
        <div className="flex flex-col items-center gap-4 md:flex-row">
          <div className="avatar animate-pulse hover:animate-none">
            <div className="w-24 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
              <img
                src={avatar}
                alt="Profile Avatar"
                className={`transition-opacity duration-300 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setImageLoaded(true)}
              />
            </div>
          </div>
          <div className="text-center md:text-left">
            <h2 className="card-title inline-block bg-gradient-to-r from-primary to-secondary bg-clip-text text-3xl font-bold text-transparent">
              {name}
            </h2>
            <p className="font-semibold text-primary">{role}</p>
            <div className="mt-2 flex flex-wrap justify-center gap-2 md:justify-start">
              {status.available && (
                <span className="badge badge-primary badge-outline">
                  Available for hire
                </span>
              )}
              {status.remote && (
                <span className="badge badge-secondary badge-outline">
                  Remote
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProfileCardContainer() {
  const { data, loading, error } = usePortfolioData()

  if (loading) {
    return (
      <div className="card bg-base-100 shadow-xl md:col-span-2">
        <div className="card-body animate-pulse">
          <div className="flex flex-col items-center gap-4 md:flex-row">
            <div className="h-24 w-24 rounded-full bg-base-300"></div>
            <div className="w-full space-y-3">
              <div className="h-8 w-3/4 rounded bg-base-300"></div>
              <div className="h-4 w-1/2 rounded bg-base-300"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="card bg-error text-error-content md:col-span-2">
        <div className="card-body">
          <h2 className="card-title">Error</h2>
          <p>{error.message}</p>
        </div>
      </div>
    )
  }

  if (!data) return null

  return <ProfileCard profileData={data.profile} />
}
