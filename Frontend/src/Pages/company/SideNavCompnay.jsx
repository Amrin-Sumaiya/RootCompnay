import { Link, useLocation, useParams } from "react-router-dom";
import { FaTachometerAlt, FaBriefcase, FaSignOutAlt, FaBars, FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
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

  const navItems = [
    { name: "Dashboard", path: `/company/${companyUrl}/dashboard`, icon: <FaTachometerAlt /> },
    { name: "Jobs", path: `/company/${companyUrl}/jobs`, icon: <FaBriefcase /> },
  ];

  return (
    <>
      {/* ==================== 
          MOBILE TOGGLE BUTTON 
         ==================== */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg transition-all duration-200"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* ==================== 
          MOBILE OVERLAY 
         ==================== */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ==================== 
          SIDEBAR CONTAINER 
         ==================== */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 bg-slate-900 text-slate-100 shadow-2xl border-r border-slate-800
          transition-all duration-300 ease-in-out flex flex-col h-screen
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static
          ${collapsed ? "w-20" : "w-72"}
        `}
      >
        
        {/* 1. HEADER (Logo & Toggle) */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-800 shrink-0">
          {!collapsed && (
            <span className="font-bold text-xl tracking-wide bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent whitespace-nowrap">
              Company Panel
            </span>
          )}
          
          {/* Desktop Collapse Button */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 p-2 rounded-lg transition-all ml-auto"
          >
            {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
          </button>
        </div>

        {/* 2. NAVIGATION (Takes available middle space) */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
          {navItems.map((item) => {
            const isActive = location.pathname.includes(item.path.split('/').pop()); // Simple active check
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setMobileOpen(false)} // Close on mobile click
                className={`
                  flex items-center gap-4 p-3 rounded-xl transition-all duration-200 font-medium group whitespace-nowrap
                  ${isActive 
                    ? "bg-sky-600 text-white shadow-md shadow-sky-900/20" 
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"}
                  ${collapsed ? "justify-center" : ""}
                `}
              >
                <span className="text-xl">{item.icon}</span>
                {!collapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* 3. FOOTER (Logout - Always at bottom) */}
        <div className="p-4 border-t border-slate-800 bg-slate-900 shrink-0">
          <button
            onClick={logout}
            className={`
              flex items-center gap-3 w-full py-3 rounded-xl justify-center transition-all duration-200 font-semibold whitespace-nowrap
              ${collapsed 
                ? "bg-rose-500/10 text-rose-500 hover:bg-rose-600 hover:text-white" 
                : "bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-900/20"}
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