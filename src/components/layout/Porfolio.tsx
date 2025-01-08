// src/components/layout/Portfolio.tsx
import { useEffect } from "react"

import ProfileCardContainer from "./ProfileCard"
import StatsCardContainer from "./StatsCard"
import SkillsCardContainer from "./SkillsCard"
import RecentActivityContainer from "./RecentActivity"
import FeaturedProjectContainer from "./FeaturedProject"
import ProjectShowcaseContainer from "./ProjectShowcase"
import TimelineContainer from "./TimeLine"
import TestimonialsContainer from "./Testimonials"
import StatsGrid from "./StatsGrid"
import ContactCardContainer from "./ContactCard"

export default function Portfolio() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100")
            entry.target.classList.remove("translate-y-4")
          }
        })
      },
      {
        threshold: 0.1,
      }
    )

    document.querySelectorAll("[data-scroll]").forEach((el) => {
      el.classList.add(
        "opacity-0",
        "translate-y-4",
        "transition-all",
        "duration-500"
      )
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-base-300 bg-gradient-to-br from-base-300 via-base-200 to-base-300 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid auto-rows-auto grid-cols-1 gap-4 md:grid-cols-3">
          <ProfileCardContainer />
          <StatsCardContainer />
          <SkillsCardContainer />
          <RecentActivityContainer />
          <FeaturedProjectContainer />
          <ProjectShowcaseContainer />
          <TimelineContainer />
          <TestimonialsContainer />
          <StatsGrid />
          <ContactCardContainer />
        </div>
      </div>
    </div>
  )
}
