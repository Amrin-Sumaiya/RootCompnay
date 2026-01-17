import React from "react";

const Header = () => {
  return (
    <header
      id="header"
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 "></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl text-center px-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight">
          Let’s Find Your <span className="text-blue-200">Dream Job</span>
        </h1>

        <p className="mt-6 text-base sm:text-lg md:text-xl text-yellow-300">
          Explore thousands of job opportunities from top companies worldwide.
          Build your future with confidence and the right career path.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#jobs"
            className="px-8 py-3 rounded-lg bg-blue-400 text-white text-lg font-semibold hover:bg-blue-700 transition"
          >
            Browse Jobs
          </a>

          <a
            href="#contact"
            className="px-8 py-3 rounded-lg border border-white text-white text-lg font-semibold hover:bg-white hover:text-black transition"
          >
            Contact Us
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
