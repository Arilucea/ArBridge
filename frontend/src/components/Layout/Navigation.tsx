
import React from "react";

interface NavigationProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="logo-container">
          {/* Ensure the image is in the public folder or imported */}
          <img
            src="arbridge-logo.png" // Assumes logo is in public folder
            alt="ArBridge Logo"
            className="logo"
          />
        </div>
        <div className="tab-buttons">
          <button
            className={`tab-button ${activeTab === "new-request" ? "active" : ""}`}
            onClick={() => onTabChange("new-request")}
            aria-current={activeTab === "new-request" ? "page" : undefined}
          >
            New Request
          </button>
          <button
            className={`tab-button ${activeTab === "check-request" ? "active" : ""}`}
            onClick={() => onTabChange("check-request")}
             aria-current={activeTab === "check-request" ? "page" : undefined}
          >
            Check Request
          </button>
          <button
            className={`tab-button ${activeTab === "pending-requests" ? "active" : ""}`}
            onClick={() => onTabChange("pending-requests")}
             aria-current={activeTab === "pending-requests" ? "page" : undefined}
          >
            Pending Requests
          </button>
          <button
            className={`tab-button ${activeTab === "completed-requests" ? "active" : ""}`}
            onClick={() => onTabChange("completed-requests")}
             aria-current={activeTab === "completed-requests" ? "page" : undefined}
          >
            Completed Requests
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;