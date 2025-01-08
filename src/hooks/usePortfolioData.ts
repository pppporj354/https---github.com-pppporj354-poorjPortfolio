// import portfolioData from "../components/data/data.json"
// import type {
//   ProfileData,
//   Skill,
//   Project,
//   TimelineEntry,
//   Testimonial,
//   Stats,
//   SocialLinks,
//   Activity,
// } from "../components/interfaces/Project"

// interface PortfolioData {
//   profile: ProfileData
//   skills: Skill[]
//   activities: Activity[]
//   projects: Project[]
//   timeline: TimelineEntry[]
//   testimonials: Testimonial[]
//   stats: Stats
//   social: SocialLinks
// }

// export function usePortfolioData() {
//   return portfolioData as PortfolioData
// }

// src/hooks/usePortfolioData.ts

import { useState, useEffect } from "react"
import portfolioData from "../components/data/data.json"
import type {
  ProfileData,
  Skill,
  Project,
  TimelineEntry,
  Testimonial,
  Stats,
  SocialLinks,
  Activity,
} from "../components/interfaces/Project"

interface PortfolioData {
  profile: ProfileData
  skills: Skill[]
  activities: Activity[]
  projects: Project[]
  timeline: TimelineEntry[]
  testimonials: Testimonial[]
  stats: Stats
  social: SocialLinks
}

interface UsePortfolioDataReturn {
  data: PortfolioData | null
  loading: boolean
  error: Error | null
}

export function usePortfolioData(): UsePortfolioDataReturn {
  const [state, setState] = useState<UsePortfolioDataReturn>({
    data: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    const loadData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500))

        const data = portfolioData as PortfolioData
        if (!validatePortfolioData(data)) {
          throw new Error("Invalid portfolio data structure")
        }

        setState({
          data,
          loading: false,
          error: null,
        })
      } catch (err) {
        setState({
          data: null,
          loading: false,
          error:
            err instanceof Error
              ? err
              : new Error("Failed to load portfolio data"),
        })
      }
    }

    loadData()
  }, [])

  return state
}

function validatePortfolioData(data: unknown): data is PortfolioData {
  if (!data || typeof data !== "object") return false

  const requiredKeys = [
    "profile",
    "skills",
    "activities",
    "projects",
    "timeline",
    "testimonials",
    "stats",
    "social",
  ] as const

  // Check if all required keys exist
  const hasAllKeys = requiredKeys.every((key) => key in data)
  if (!hasAllKeys) return false

  const portfolioData = data as Record<string, unknown>

  // Validate profile
  const profile = portfolioData.profile as ProfileData
  if (
    !profile?.name ||
    !profile?.role ||
    !profile?.avatar ||
    !profile?.status
  ) {
    return false
  }

  if (
    !Array.isArray(portfolioData.skills) ||
    !Array.isArray(portfolioData.activities) ||
    !Array.isArray(portfolioData.projects) ||
    !Array.isArray(portfolioData.timeline) ||
    !Array.isArray(portfolioData.testimonials)
  ) {
    return false
  }

  const stats = portfolioData.stats as Stats
  if (
    !stats?.projects?.count ||
    !stats?.experience?.years ||
    !stats?.clients?.count
  ) {
    return false
  }

  const social = portfolioData.social as SocialLinks
  if (!social?.github || !social?.linkedin || !social?.twitter) {
    return false
  }

  return true
}
