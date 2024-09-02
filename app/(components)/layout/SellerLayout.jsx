import React from 'react';
import { useSidebar } from '../../context/SidebarContext'
import SellerNavigation from "../nav/SellerNavigation.jsx";

const SellerLayout = ({ children }) => {
  const { isOpen } = useSidebar(); // Access sidebar state

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <SellerNavigation />

      {/* Main content */}
      <main
        className={`transition-all duration-300 flex-grow p-4 ${
          isOpen ? 'ml-64' : 'ml-20'
        }`} // Adjust margin based on sidebar state
      >
        {children}
      </main>
    </div>
  );
};

export default SellerLayout;
