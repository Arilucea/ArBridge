
import React, { Component, ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  showDetails?: boolean; // Optional prop to control detail visibility
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // You can also log the error to an error reporting service
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="error-boundary">
          <h2>Something went wrong.</h2>
          <p>The application encountered an unexpected error. Please try refreshing the page.</p>
          {this.props.showDetails && this.state.error && ( // Only show details if prop enabled and error exists
            <details style={{ whiteSpace: "pre-wrap" }}>
              <summary>Error Details</summary>
              {this.state.error && <p>{this.state.error.toString()}</p>}
              <br />
              {this.state.errorInfo && (
                  <>
                     <p>Component Stack Error Details:</p>
                     <p>{this.state.errorInfo.componentStack}</p>
                  </>
              )}
            </details>
          )}
          <button
            className="submit-button"
            style={{ width: "auto", marginTop: "1rem" }}
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;