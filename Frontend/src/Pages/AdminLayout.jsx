import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import SideNavbar from "../Componenets/SideNavbar.jsx";

const AdminLayout = () => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <SideNavbar />

      {/* Main Area */}
      <div className="flex-1 flex flex-col ">
        {/* Topbar */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">
              Root Access
            </h1>

            {location.pathname !== "/create" && (
              <Link
                to="/create"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                + Create
              </Link>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
