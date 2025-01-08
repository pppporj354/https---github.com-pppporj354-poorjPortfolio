// src/components/shared/ErrorState.tsx
interface ErrorStateProps {
  message: string
  cols?: number
}

export function ErrorState({ message, cols = 1 }: ErrorStateProps) {
  return (
    <div
      className={`card bg-error text-error-content ${
        cols > 1 ? `md:col-span-${cols}` : ""
      }`}
    >
      <div className="card-body">
        <h2 className="card-title">Error</h2>
        <p>{message}</p>
      </div>
    </div>
  )
}
