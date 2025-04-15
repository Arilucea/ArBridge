import React from "react";
import Navigation from "./Navigation";

const Layout = ({ children, activeTab, onTabChange }) => {
  return (
    <div className="app-container">
      <Navigation activeTab={activeTab} onTabChange={onTabChange} />
      <div className="container">
        {children}
      </div>
    </div>
  );
};

export default Layout;