
import React from "react";

const LoadingSpinner: React.FC = () => {
  // Added aria attributes for accessibility
  return (
      <div className="loading-spinner" role="status" aria-live="polite">
          Loading...
      </div>
  );
};

export default LoadingSpinner;