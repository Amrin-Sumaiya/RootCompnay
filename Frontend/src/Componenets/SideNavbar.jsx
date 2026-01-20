import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// Importing specific icons for a cleaner look
import { 
  Menu, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  LayoutDashboard, 
  Building2, 
  LogOut 
} from "lucide-react";
import Logo from "../assets/igl.png";

const SideNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Common class for nav items to reduce repetition
  const navItemClass = (path) => `
    flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group font-medium
    ${isActive(path) 
      ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/20" 
      : "text-slate-400 hover:bg-slate-800 hover:text-white"}
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
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static z-50 top-0 left-0 h-screen bg-slate-900 text-slate-100 
          transition-all duration-300 border-r border-slate-800 flex flex-col shadow-2xl
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          ${collapsed ? "w-20" : "w-72"}
        `}
      >
        {/* Header / Logo Area */}
        <div className={`flex items-center p-6 border-b border-slate-800 ${collapsed ? "justify-center" : "justify-between"}`}>
          {!collapsed && (
            <div className="flex items-center gap-2 overflow-hidden">
               {/* Ensure logo fits well */}
               <img src={Logo} alt="Logo" className="h-8 object-contain" />
            </div>
          )}
          
          {/* Desktop Collapse Toggle */}
          <button
            className={`hidden md:flex p-1.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors ${collapsed ? "" : "ml-auto"}`}
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-2 mt-2 overflow-y-auto">
          <Link
            to="/"
            className={navItemClass("/")}
            onClick={() => setMobileOpen(false)}
            title={collapsed ? "Dashboard" : ""}
          >
            <LayoutDashboard size={22} className={isActive("/") ? "text-white" : "text-slate-500 group-hover:text-white transition-colors"} />
            {!collapsed && <span>Dashboard</span>}
          </Link>

          <Link
            to="/read"
            className={navItemClass("/read")}
            onClick={() => setMobileOpen(false)}
            title={collapsed ? "Company List" : ""}
          >
            <Building2 size={22} className={isActive("/read") ? "text-white" : "text-slate-500 group-hover:text-white transition-colors"} />
            {!collapsed && <span>Company List</span>}
          </Link>
        </nav>

        {/* Footer / Logout */}
        <div className="p-4 border-t border-slate-800 bg-slate-900">
          <button
            onClick={handleLogout}
            className={`
              flex items-center w-full rounded-xl transition-all duration-200 font-medium
              ${collapsed 
                ? "justify-center p-3 text-rose-500 hover:bg-rose-500/10" 
                : "gap-3 px-4 py-3 bg-slate-800 text-slate-300 hover:bg-rose-600 hover:text-white hover:shadow-lg hover:shadow-rose-900/20"}
            `}
            title="Logout"
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