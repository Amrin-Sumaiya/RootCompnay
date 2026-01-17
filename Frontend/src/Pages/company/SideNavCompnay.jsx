import { Link, useLocation, useParams } from "react-router-dom";
import { FaTachometerAlt, FaBriefcase, FaSignOutAlt } from "react-icons/fa";
import { useState } from "react";

const SideNavbarCompany = () => {
  const location = useLocation();
  const { companyUrl } = useParams();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded"
        onClick={() => setMobileOpen(true)}
      >
        ☰
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static top-0 left-0 h-screen bg-gray-800 text-white z-40
          transition-all duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          ${collapsed ? "w-20" : "w-64"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {!collapsed && <span className="font-bold">Company Panel</span>}

          {/* Desktop Collapse Button */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:block text-white text-lg"
          >
            {collapsed ? "➤" : "◀"}
          </button>

          {/* Mobile Close */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileOpen(false)}
          >
            ✕
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-2">
          <Link
            to={`/company/${companyUrl}/dashboard`}
            className={`flex items-center gap-3 p-3 rounded hover:bg-gray-700
              ${location.pathname.includes("dashboard") && "bg-gray-700"}
            `}
          >
            <FaTachometerAlt />
            {!collapsed && <span>Dashboard</span>}
          </Link>

          <Link
            to={`/company/${companyUrl}/jobs`}
            className={`flex items-center gap-3 p-3 rounded hover:bg-gray-700
              ${location.pathname.includes("jobs") && "bg-gray-700"}
            `}
          >
            <FaBriefcase />
            {!collapsed && <span>Jobs</span>}
          </Link>
        </nav>

        {/* Logout */}
        <div className="mt-auto p-3">
          <button
            onClick={logout}
            className="flex items-center gap-3 bg-red-500 w-full py-2 rounded justify-center"
          >
            <FaSignOutAlt />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default SideNavbarCompany;
