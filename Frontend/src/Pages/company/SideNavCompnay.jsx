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
        className="md:hidden fixed top-4 left-4 z-50 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg transition-all duration-200"
        onClick={() => setMobileOpen(true)}
      >
        ☰
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-30 md:hidden transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static top-0 left-0 h-screen bg-slate-900 text-slate-100 z-40
          transition-all duration-300 shadow-2xl border-r border-slate-800
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          ${collapsed ? "w-20" : "w-72"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800">
          {!collapsed && <span className="font-bold text-xl tracking-wide bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Company Panel</span>}

          {/* Desktop Collapse Button */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:block text-slate-400 hover:text-white hover:bg-slate-800 p-1 rounded-lg transition-all"
          >
            {collapsed ? "➤" : "◀"}
          </button>

          {/* Mobile Close */}
          <button
            className="md:hidden text-slate-400 hover:text-white"
            onClick={() => setMobileOpen(false)}
          >
            ✕
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2 mt-4">
          <Link
            to={`/company/${companyUrl}/dashboard`}
            className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-200 font-medium group
              ${location.pathname.includes("dashboard") 
                ? "bg-sky-600 text-white shadow-md shadow-indigo-900/20" 
                : "text-slate-400 hover:bg-slate-800 hover:text-white"}
            `}
          >
            <FaTachometerAlt className={location.pathname.includes("dashboard") ? "text-white" : "text-slate-500 group-hover:text-white"} />
            {!collapsed && <span>Dashboard</span>}
          </Link>

          <Link
            to={`/company/${companyUrl}/jobs`}
            className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-200 font-medium group
              ${location.pathname.includes("jobs") 
                ? "bg-sky-600 text-white shadow-md shadow-indigo-900/20" 
                : "text-slate-400 hover:bg-slate-800 hover:text-white"}
            `}
          >
            <FaBriefcase className={location.pathname.includes("jobs") ? "text-white" : "text-slate-500 group-hover:text-white"} />
            {!collapsed && <span>Jobs</span>}
          </Link>
        </nav>

        {/* Logout */}
        <div className="mt-auto p-4 absolute bottom-0 w-full border-t border-slate-800 bg-slate-900">
          <button
            onClick={logout}
            className={`flex items-center gap-3 w-full py-3 rounded-xl justify-center transition-all duration-200 font-semibold
             ${collapsed 
                ? "bg-rose-500/10 text-rose-500 hover:bg-rose-600 hover:text-white" 
                : "bg-sky-600 text-white shadow-lg shadow-rose-900/20"}
            `}
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