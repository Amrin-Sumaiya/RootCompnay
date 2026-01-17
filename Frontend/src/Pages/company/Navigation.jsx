import React, { useState } from "react";
import { Link } from 'react-router-dom';

const Navigation = () => {
  const [open, setOpen] = useState(false);



  return (
    <nav className="fixed w-full z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-2">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <a
            href="#header"
            className="text-4xl font-bold text-orange-500"
          >
            Job<span className="text-2xl text-blue-800">Portal</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-7 items-center">
            <a href="#header" className="nav-link hover:text-blue-600">Home</a>
            <a href="#features" className="nav-link hover:text-blue-600">Features</a>
            <a href="#services" className="nav-link hover:text-blue-600">Services</a>
<Link to="/company/all-jobs" className="nav-link hover:text-blue-600">
  Jobs
</Link>



            <a href="#team" className="nav-link hover:text-blue-600">Team</a>
            <a href="#testimonials" className="nav-link hover:text-blue-600">Testimonials</a>
            <a href="#contact" className="nav-link hover:text-blue-600">Contact</a>

            <a
              href="#login"
              className="px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Login
            </a>
          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden text-gray-700 text-2xl"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="flex flex-col px-6 py-4 space-y-4">
            <a href="#header" onClick={() => setOpen(false)}>Home</a>
            <a href="#features" onClick={() => setOpen(false)}>Features</a>
            <a href="#services" onClick={() => setOpen(false)}>Services</a>
            <a href="#jobs" onClick={() => setOpen(false)}>Jobs</a>
            <a href="#team" onClick={() => setOpen(false)}>Team</a>
            <a href="#testimonials" onClick={() => setOpen(false)}>Testimonials</a>
            <a href="#contact" onClick={() => setOpen(false)}>Contact</a>

            <a
              href="#login"
              onClick={() => setOpen(false)}
              className="text-center px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Login
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
