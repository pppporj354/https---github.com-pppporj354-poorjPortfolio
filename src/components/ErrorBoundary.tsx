// src/components/ErrorBoundary.tsx
import { Component, ErrorInfo, ReactNode } from "react"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="card bg-error text-error-content">
          <div className="card-body">
            <h2 className="card-title">Something went wrong</h2>
            <p>Please try refreshing the page</p>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
