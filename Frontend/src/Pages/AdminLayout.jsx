import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import SideNavbar from "../Componenets/SideNavbar.jsx";
import { FaPlus, FaShieldAlt } from "react-icons/fa"; // Added icons for visual appeal

const AdminLayout = () => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900 font-sans">
      {/* Sidebar */}
      <SideNavbar />

      {/* Main Area */}
      <div className="flex-1 flex flex-col transition-all duration-300">
        
        {/* Topbar */}
        <header className="sticky top-0 z-20 bg-white/80 dark:bg-slate-800/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            
            {/* Title Section */}
            <div className="flex items-center gap-3">
                <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-lg text-indigo-600 dark:text-indigo-400">
                    <FaShieldAlt size={20} />
                </div>
                <div>
                    <h1 className="text-xl font-extrabold text-slate-800 dark:text-white tracking-tight">
                    Root Access
                    </h1>
                    <p className="text-xs text-slate-500 font-medium hidden md:block">System Administration Console</p>
                </div>
            </div>

            {/* Action Button */}
            {location.pathname !== "/create" && (
              <Link
                to="/create"
                className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 active:scale-95 transition-all shadow-lg shadow-indigo-500/20"
              >
                <FaPlus size={12} />
                <span>Create New</span>
              </Link>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-6 py-8 animate-fadeIn">
            <Outlet />
          </div>
        </main>
        
      </div>
    </div>
  );
};

export default AdminLayout;