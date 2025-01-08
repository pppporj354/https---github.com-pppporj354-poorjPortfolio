import { usePortfolioData } from "../../hooks/usePortfolioData"
import TimelineContainer from "../layout/TimeLine"
import SkillsCardContainer from "../layout/SkillsCard"
import StatsGridContainer from "../layout/StatsGrid"
import { LoadingState } from "../shared/LoadingState"
import { ErrorState } from "../shared/ErrorState"

export default function ProfilePage() {
  const { data, loading, error } = usePortfolioData()

  if (loading) return <LoadingState cols={3} />
  if (error) return <ErrorState message={error.message} cols={3} />
  if (!data) return null

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="hero bg-base-200 rounded-box p-8">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src={data.profile.avatar}
            className="max-w-sm rounded-lg shadow-2xl"
            alt={data.profile.name}
          />
          <div>
            <h1 className="text-5xl font-bold">{data.profile.name}</h1>
            <p className="py-6">
              Professional {data.profile.role} with{" "}
              {data.stats.experience.years} years of experience
            </p>
            <button className="btn btn-primary">Download CV</button>
          </div>
        </div>
      </div>

      {/* Skills and Experience Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <SkillsCardContainer />
        <StatsGridContainer />
      </div>

      {/* Professional Journey */}
      <TimelineContainer />

      {/* Additional Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
              Education
            </h2>
            {/* Add education details */}
            <div className="space-y-4">
              {data.profile.education?.map((edu, index) => (
                <div key={index} className="border-l-4 border-primary pl-4">
                  <h3 className="font-bold">{edu.degree}</h3>
                  <p className="text-sm opacity-70">{edu.school}</p>
                  <p className="text-xs opacity-50">{edu.year}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-secondary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
              Certifications
            </h2>
            <div className="space-y-4">
              {data.profile.certifications?.map((cert, index) => (
                <div key={index} className="bg-base-200 p-4 rounded-lg">
                  <h3 className="font-bold">{cert.name}</h3>
                  <p className="text-sm opacity-70">{cert.issuer}</p>
                  <p className="text-xs opacity-50">{cert.year}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
