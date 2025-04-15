import React from "react";

const Navigation = ({ activeTab, onTabChange }) => {
  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="logo-container">
          <img 
            src="arbridge-logo.png" 
            alt="ArBridge Logo" 
            className="logo" 
          />
        </div>
        <div className="tab-buttons">
          <button
            className={`tab-button ${activeTab === "new-request" ? "active" : ""}`}
            onClick={() => onTabChange("new-request")}
          >
            New Request
          </button>
          <button
            className={`tab-button ${activeTab === "check-request" ? "active" : ""}`}
            onClick={() => onTabChange("check-request")}
          >
            Check Request
          </button>
          <button
            className={`tab-button ${activeTab === "pending-requests" ? "active" : ""}`}
            onClick={() => onTabChange("pending-requests")}
          >
            Pending Requests
          </button>
          <button
            className={`tab-button ${activeTab === "completed-requests" ? "active" : ""}`}
            onClick={() => onTabChange("completed-requests")}
          >
            Completed Requests
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;