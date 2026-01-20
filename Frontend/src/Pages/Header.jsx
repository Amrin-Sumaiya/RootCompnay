import React from "react";
import { useNavigate } from "react-router-dom";
import { Search, ArrowRight, Briefcase, Users, Globe } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="relative min-h-screen flex items-center justify-center overflow-hidden">
      
      {/* Background Image with Parallax-like feel */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Dark Gradient Overlay for Readability */}
      <div className="absolute inset-0 z-0 " />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-sm font-medium mb-6 animate-fade-in-up">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-800 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-400"></span>
          </span>
          #1 Job Platform
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 drop-shadow-lg">
          Let’s Find Your <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-emerald-400">
            Dream Job
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-300 mb-10 leading-relaxed">
          Unlock your potential with thousands of career opportunities from top technology companies and startups worldwide.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => navigate("/company/all-jobs")}
            className="group relative px-8 py-4 bg-blue-600 text-white font-semibold rounded-full shadow-lg shadow-blue-500/30 hover:bg-blue-500 hover:shadow-blue-500/50 transition-all duration-300 flex items-center gap-2"
          >
            <Search size={20} />
            Browse Jobs
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            // Add your contact navigation logic here if needed
            className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300"
          >
            Contact Us
          </button>
        </div>

        {/* Floating Stats / Social Proof */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { icon: Briefcase, label: "Live Jobs", value: "12k+" },
            { icon: Users, label: "Companies", value: "850+" },
            { icon: Globe, label: "Countries", value: "40+" },
          ].map((stat, index) => (
            <div 
              key={index} 
              className="flex items-center justify-center gap-4 p-4 rounded-2xl bg-sky-50 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors cursor-default"
            >
              <div className="p-3 rounded-full bg-blue-100/20 text-blue-800">
                <stat.icon size={24} />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-black">{stat.value}</p>
                <p className="text-sm text-gray-600 uppercase tracking-wider">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </header>
  );
};

export default Header;