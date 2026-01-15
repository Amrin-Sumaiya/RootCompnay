import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import SideNavbar from '../Componenets/SideNavbar.jsx'; // Ensure correct folder name

const AdminLayout = () => {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <SideNavbar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">Root Access</h1>
          {location.pathname !== '/create' && (
            <Link
              to="/create"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Create
            </Link>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
