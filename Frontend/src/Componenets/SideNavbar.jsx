import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Building2,
  GraduationCap,
  Settings,
  Briefcase,
  LogOut,
} from "lucide-react";
import Logo from "../assets/igl.png";

const SideNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  // Active route checker (supports nested routes)
  const isActive = (path) => location.pathname.startsWith(path);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/admin/login");
  };

  const navItemClass = (path) => `
    flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group font-medium shrink-0
    ${
      isActive(path)
        ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/20"
        : "text-slate-400 hover:bg-slate-800 hover:text-white"
    }
    ${collapsed ? "justify-center" : ""}
  `;

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2.5 bg-sky-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar - Changed md:static to md:sticky so it doesn't scroll away */}
      <aside
        className={`
          fixed md:sticky z-50 top-0 left-0 h-screen bg-slate-900 text-slate-100 
          transition-all duration-300 border-r border-slate-800 flex flex-col shadow-2xl
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          ${collapsed ? "w-20" : "w-72"}
        `}
      >
        {/* Logo */}
        <div
          className={`flex items-center p-6 border-b border-slate-800 shrink-0 ${
            collapsed ? "justify-center" : "justify-between"
          }`}
        >
          {!collapsed && (
            <div className="flex items-center gap-2">
              <img src={Logo} alt="Logo" className="h-8 object-contain" />
            </div>
          )}

          <button
            className="hidden md:flex p-1.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Navigation - Added custom scrollbar styles here */}
        <nav 
          className="flex-1 p-4 space-y-2 mt-2 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-600 transition-colors"
        >
          <Link
            to="/admin/dashboard"
            className={navItemClass("/admin/dashboard")}
            onClick={() => setMobileOpen(false)}
          >
            <LayoutDashboard size={22} />
            {!collapsed && <span>Dashboard</span>}
          </Link>

          <Link
            to="/admin/read"
            className={navItemClass("/admin/read")}
            onClick={() => setMobileOpen(false)}
          >
            <Building2 size={22} />
            {!collapsed && <span>Company List</span>}
          </Link>

          <Link
            to="/admin/professional-courses"
            className={navItemClass("/admin/professional-courses")}
            onClick={() => setMobileOpen(false)}
          >
            <GraduationCap size={22} />
            {!collapsed && <span>Professional Courses</span>}
          </Link>

          <Link
            to="/admin/otp-settings"
            className={navItemClass("/admin/otp-settings")}
            onClick={() => setMobileOpen(false)}
          >
            <Settings size={22} />
            {!collapsed && <span>OTP Settings</span>}
          </Link>

{/* Replace your old link with this new one */}
<Link
  to="/admin/company-types"
  className={navItemClass("/admin/company-types")}
  onClick={() => setMobileOpen(false)}
>
  <Briefcase size={22} />
  {!collapsed && <span>Company Types</span>}
</Link>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-slate-800 shrink-0">
          <button
            onClick={handleLogout}
            className={`
              flex items-center w-full rounded-xl transition-all font-medium
              ${
                collapsed
                  ? "justify-center p-3 text-rose-500 hover:bg-rose-500/10"
                  : "gap-3 px-4 py-3 bg-slate-800 text-slate-300 hover:bg-rose-600 hover:text-white"
              }
            `}
          >
            <LogOut size={20} />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default SideNavbar;