
import React from "react";

interface ErrorMessageProps {
  message: string | null; // Allow null in case there's no error
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
   // Don't render anything if there is no message
  if (!message) {
    return null;
  }

  return (
    <div className="error-message" role="alert"> {/* Added role="alert" for accessibility */}
      <p>Error: {message}</p>
    </div>
  );
};

export default ErrorMessage;