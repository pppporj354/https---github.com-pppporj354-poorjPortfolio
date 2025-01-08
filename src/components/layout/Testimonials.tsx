// src/components/layout/Testimonials.tsx
import { useState } from "react"
import { usePortfolioData } from "../../hooks/usePortfolioData"
import type { Testimonial } from "../interfaces/Project"
import { LoadingState } from "../shared/LoadingState"
import { ErrorState } from "../shared/ErrorState"

interface TestimonialsProps {
  testimonials: Testimonial[]
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const nextTestimonial = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setTimeout(() => setIsAnimating(false), 500) // Match duration with CSS
  }

  const prevTestimonial = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
    setTimeout(() => setIsAnimating(false), 500) // Match duration with CSS
  }

  return (
    <div
      className="card bg-base-100 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl md:col-span-3"
      data-scroll
    >
      <div className="card-body relative">
        <h2 className="card-title mb-4">What People Say</h2>
        <div className="carousel w-full relative overflow-hidden pb-12">
          <div
            className={`carousel-item relative w-full transition-all duration-500 ease-in-out transform
              ${isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
          >
            <div className="flex flex-col items-center gap-4 text-center w-full">
              <div className="avatar">
                <div className="w-16 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
                  <img
                    src={testimonials[currentIndex].author.avatar}
                    alt={testimonials[currentIndex].author.name}
                    className={`transition-opacity duration-300 ${
                      imageLoaded ? "opacity-100" : "opacity-0"
                    }`}
                    onLoad={() => setImageLoaded(true)}
                  />
                </div>
              </div>
              <blockquote
                className={`max-w-lg transition-all duration-500 ease-in-out transform
                  ${
                    isAnimating
                      ? "translate-y-4 opacity-0"
                      : "translate-y-0 opacity-100"
                  }`}
              >
                <p className="italic">{testimonials[currentIndex].content}</p>
                <footer className="mt-2 font-semibold text-primary">
                  - {testimonials[currentIndex].author.name},{" "}
                  {testimonials[currentIndex].author.company}
                </footer>
              </blockquote>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <button
              onClick={prevTestimonial}
              className="btn btn-circle btn-ghost transition-all duration-200 hover:bg-base-200 hover:scale-110"
              disabled={isAnimating}
            >
              ❮
            </button>
            <button
              onClick={nextTestimonial}
              className="btn btn-circle btn-ghost transition-all duration-200 hover:bg-base-200 hover:scale-110"
              disabled={isAnimating}
            >
              ❯
            </button>
          </div>

          {/* Dots indicator */}
        </div>
        <div className="flex justify-center gap-2 mt-4">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isAnimating) {
                  setIsAnimating(true)
                  setCurrentIndex(index)
                  setTimeout(() => setIsAnimating(false), 500)
                }
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-primary scale-125"
                  : "bg-base-300 hover:bg-base-content/50"
              }`}
              disabled={isAnimating}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function TestimonialsContainer() {
  const { data, loading, error } = usePortfolioData()

  if (loading) return <LoadingState cols={3} />
  if (error) return <ErrorState message={error.message} cols={3} />
  if (!data) return null

  return <Testimonials testimonials={data.testimonials} />
}
