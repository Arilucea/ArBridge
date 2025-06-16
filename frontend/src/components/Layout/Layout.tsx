
import React, { ReactNode } from "react";
import Navigation from "./Navigation";

interface LayoutProps {
  children: ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
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
