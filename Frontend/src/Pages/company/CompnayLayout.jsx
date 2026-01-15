import React from 'react';
import { Outlet } from 'react-router-dom';
import SideNavbarCompany from './SideNavCompnay.jsx'; // your company sidebar
 // keep your original logout

const CompanyLayout = () => {

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <SideNavbarCompany />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <div className="flex justify-between items-center p-4 bg-blue-300 text-white shadow border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold">Company Dashboard</h1>


        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default CompanyLayout;
