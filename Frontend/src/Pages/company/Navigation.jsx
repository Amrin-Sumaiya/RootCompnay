/* eslint-disable react-hooks/static-components */
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loginDropdown, setLoginDropdown] = useState(false); // State for the new dropdown
  const dropdownRef = useRef(null); // Ref to close dropdown when clicking outside
  const navigate = useNavigate();
  const location = useLocation();

  // Add shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close login dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setLoginDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const scrollToSection = (id) => {
    if (location.pathname !== "/" && location.pathname !== "/") {
      navigate("/");
    }
    
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 150);
    setOpen(false);
  };

  const NavLink = ({ label, target }) => (
    <button
      onClick={() => scrollToSection(target)}
      className="text-gray-600 hover:text-green-600 font-medium transition-colors duration-200 text-sm lg:text-base relative group"
    >
      {label}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all group-hover:w-full duration-300"></span>
    </button>
  );

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-md py-2"
          : "bg-white py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          
          {/* Logo area */}
          <button
            onClick={() => scrollToSection("/")}
            className="flex items-center gap-1 group"
          >
            <div className="text-2xl md:text-3xl font-extrabold tracking-tighter text-gray-900 group-hover:opacity-80 transition-opacity">
              <span className="text-red-600">IGL</span>
              <span className="text-green-700"> Web Ltd.</span>
            </div>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <NavLink label="Home" target="/" />
            <button
              onClick={() => navigate("/aboutpage")}
              className="font-semibold text-sm text-gray-700 hover:text-green-600 hidden md:flex space-x-8 items-center"
            >
              About
            </button>
            <NavLink label="Features" target="features" />
            <NavLink label="Contact" target="contact" />

            {/* Divider */}
            <div className="h-6 w-px bg-gray-300 mx-2"></div>

            <button
              onClick={() => navigate("/company/all-jobs")}
              className="text-gray-700 font-semibold hover:text-green-600 transition-colors flex items-center gap-1"
            >
              Browse Jobs
            </button>

            {/* UPDATED LOGIN DROPDOWN */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setLoginDropdown(!loginDropdown)}
                className="text-gray-700 px-4 py-1 hover:text-red-700 font-medium transform hover:-translate-y-0.5 transition-all duration-100 flex items-center gap-1"
              >
                Login <span>{loginDropdown ? "▴" : "▾"}</span>
              </button>

              {loginDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-lg shadow-xl py-2 z-50">
                  <button
                    onClick={() => { navigate("/company/login"); setLoginDropdown(false); }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-700 transition-colors font-medium"
                  >
                    Company Login
                  </button>
                  <button
                    onClick={() => { navigate("/candidateslogin"); setLoginDropdown(false); }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-700 transition-colors font-medium"
                  >
                    Candidates Login
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setOpen(!open)}
              className="text-gray-600 hover:text-green-600 focus:outline-none p-2"
            >
              {open ? (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl transition-all duration-300 ease-in-out origin-top ${
          open ? "opacity-100 scale-y-100 visible" : "opacity-0 scale-y-0 invisible"
        }`}
      >
        <div className="flex flex-col px-6 py-6 space-y-4">
          <button onClick={() => scrollToSection("hero")} className="text-left text-lg font-medium text-gray-700 hover:text-green-600">Home</button>
          <button onClick={() => scrollToSection("about")} className="text-left text-lg font-medium text-gray-700 hover:text-green-600">About</button>
          <button onClick={() => scrollToSection("features")} className="text-left text-lg font-medium text-gray-700 hover:text-green-600">Features</button>
          <button onClick={() => scrollToSection("contact")} className="text-left text-lg font-medium text-gray-700 hover:text-green-600">Contact</button>
          <hr className="border-gray-100 my-2" />
          <button 
            onClick={() => { navigate("/company/all-jobs"); setOpen(false); }}
            className="text-left text-lg font-bold text-green-800 flex items-center gap-2"
          >
            Find a Job <span>→</span>
          </button>
          
          {/* Mobile Login Dropdown/Buttons */}
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => { navigate("/admin/login"); setOpen(false); }}
              className="w-full bg-gray-100 text-gray-700 text-center py-2 rounded-lg font-medium"
            >
              Company Login
            </button>
            <button
              onClick={() => { navigate("/candidateslogin"); setOpen(false); }}
              className="w-full bg-green-700 text-white text-center py-3 rounded-lg font-bold shadow-md active:scale-95 transition-transform"
            >
              Candidate Login / Sign Up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;