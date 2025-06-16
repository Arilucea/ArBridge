
import React from "react";

interface EmptyStateProps {
  message?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message }) => {
  return (
    <div className="empty-state">
      <p>{message || "No requests found."}</p>
    </div>
  );
};

interface RequestsTableProps {
  requests: string[]; // Expecting an array of request IDs (strings)
  onCheckRequest: (requestId: string) => void; // Callback function when a request is clicked
  emptyMessage?: string; // Optional message for the empty state
}

const RequestsTable: React.FC<RequestsTableProps> = ({ requests, onCheckRequest, emptyMessage }) => {
  if (!requests || requests.length === 0) {
    return <EmptyState message={emptyMessage} />;
  }

  return (
    <div className="requests-table-container">
      <table className="requests-table">
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Action</th>{/* Added header for the button column */}
          </tr>
        </thead>
        <tbody>
          {requests.map((requestId) => (
            <tr key={requestId}>
              {/* Make ID clickable as well */}
              <td
                className="request-id clickable"
                onClick={() => onCheckRequest(requestId)}
                style={{ cursor: 'pointer' }} // Add pointer cursor
                title={`View details for ${requestId}`} // Add title for hover tooltip
              >
                {requestId}
              </td>
              <td>
                <button
                  className="check-request-button"
                  onClick={() => onCheckRequest(requestId)}
                  aria-label={`Check details for request ${requestId}`} // Accessibility
                >
                  Check Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestsTable;