import React from 'react';
import { useSidebar } from '../../context/SidebarContext'
import AdminNavigation from "../nav/AdminNavigation";

const AdminLayout = ({ children }) => {
  const { isOpen } = useSidebar(); // Access sidebar state

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <AdminNavigation />

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

export default AdminLayout;
