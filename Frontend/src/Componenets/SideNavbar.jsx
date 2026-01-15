import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/igl.png"; // replace with your logo

const SideNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate(); // for programmatic navigation
  const [isOpen, setIsOpen] = useState(true);

  const isActive = (path) => location.pathname.includes(path);

  const handleLogout = () => {
    localStorage.removeItem("token"); // remove JWT
    navigate("/login"); // redirect to login
  };

  return (
    <div className="flex">
      {/* Toggle Button for mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 rounded text-white shadow"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "✕" : "☰"}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white shadow-md transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:translate-x-0 md:static flex flex-col`}
      >
        {/* Logo */}
        <div className="p-6 flex justify-center border-b border-gray-700">
          <img src={Logo} alt="Logo" className="h-12 w-auto object-contain" />
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <Link
            to="/"
            className={`block px-4 py-2 rounded hover:bg-blue-700 transition ${
              isActive("/") && !isActive("/read") ? "bg-blue-600" : ""
            }`}
          >
            Dashboard
          </Link>
          <Link
            to="/read"
            className={`block px-4 py-2 rounded hover:bg-blue-700 transition ${
              isActive("/read") ? "bg-blue-600" : ""
            }`}
          >
            Company's List
          </Link>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-700 mt-auto">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-red-400 rounded hover:bg-red-700 transition text-white"
          >
            Logout
          </button>
          <p className="text-gray-400 text-center mt-2">© 2026</p>
        </div>
      </div>
    </div>
  );
};

export default SideNavbar;
