import React from "react";

const EmptyState = ({ message }) => {
  return (
    <div className="empty-state">
      <p>{message || "No requests found."}</p>
    </div>
  );
};

const RequestsTable = ({ requests, onCheckRequest, emptyMessage }) => {
  if (!requests || requests.length === 0) {
    return <EmptyState message={emptyMessage} />;
  }

  return (
    <div className="requests-table-container">
      <table className="requests-table">
        <thead>
          <tr>
            <th>Request ID</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {requests.map((requestId) => (
            <tr key={requestId}>
              <td
                className="request-id clickable"
                onClick={() => onCheckRequest(requestId)}
              >
                {requestId}
              </td>
              <td>
                <button
                  className="check-request-button"
                  onClick={() => onCheckRequest(requestId)}
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