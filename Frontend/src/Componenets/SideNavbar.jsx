import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronLeft, ChevronRight } from "lucide-react";
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

  return (
    <>
      {/* Mobile Toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-900 text-white rounded-lg"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X /> : <Menu />}
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static z-50 top-0 left-0 h-screen bg-gray-900 text-white transition-all duration-300
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
        ${collapsed ? "w-20" : "w-64"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {!collapsed && <img src={Logo} className="h-10" />}
          <button
            className="hidden md:block p-2 hover:bg-gray-700 rounded"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </button>
        </div>

        {/* Nav */}
        <nav className="p-3 space-y-2">
          <Link
            to="/"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg
            ${isActive("/") ? "bg-blue-300" : "hover:bg-gray-700"}`}
            onClick={() => setMobileOpen(false)}
          >
            🏠 {!collapsed && "Dashboard"}
          </Link>

          <Link
            to="/read"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg
            ${isActive("/read") ? "bg-blue-300" : "hover:bg-gray-700"}`}
            onClick={() => setMobileOpen(false)}
          >
            📋 {!collapsed && "Company List"}
          </Link>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full bg-red-300 hover:bg-red-600 py-2 rounded-lg"
          >
            🔓 {!collapsed && "Logout"}
          </button>
        </div>
      </aside>
    </>
  );
};

export default SideNavbar;
