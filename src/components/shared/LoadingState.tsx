// src/components/shared/LoadingState.tsx
import { ReactNode } from "react"

interface LoadingStateProps {
  cols?: number
  children?: ReactNode
}

export function LoadingState({ cols = 1, children }: LoadingStateProps) {
  return (
    <div
      className={`card bg-base-100 shadow-xl ${
        cols > 1 ? `md:col-span-${cols}` : ""
      }`}
    >
      <div className="card-body animate-pulse">
        {children || (
          <>
            <div className="h-8 w-3/4 rounded bg-base-300"></div>
            <div className="space-y-3">
              <div className="h-4 w-full rounded bg-base-300"></div>
              <div className="h-4 w-2/3 rounded bg-base-300"></div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
