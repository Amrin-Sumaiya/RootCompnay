import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    navigate("/hero");
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
      });
    }, 150);
    setOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <button
            onClick={() => scrollToSection("hero")}
            className="text-4xl font-bold text-orange-500"
          >
            Job<span className="text-2xl text-blue-800">Portal</span>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-7 items-center">
            <button onClick={() => scrollToSection("hero")}>Home</button>
            <button onClick={() => scrollToSection("about")}>About</button>
            <button onClick={() => scrollToSection("features")}>Features</button>
            <button onClick={() => scrollToSection("contact")}>Contact</button>

            <button
              onClick={() => navigate("/company/all-jobs")}
              className="hover:text-blue-600"
            >
              Jobs
            </button>

            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 text-gray-900 hover:text-blue-600 "
            >
              Login
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl"
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
            <button onClick={() => scrollToSection("hero")}>Home</button>
            <button onClick={() => scrollToSection("about")}>About</button>
            <button onClick={() => scrollToSection("features")}>Features</button>
            <button onClick={() => scrollToSection("contact")}>Contact</button>

            <button onClick={() => navigate("/company/all-jobs")}>
              Jobs
            </button>

            <button
              onClick={() => navigate("/login")}
              className="text-blue-600 hover:text-white  rounded-full"
            >
              Login
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
