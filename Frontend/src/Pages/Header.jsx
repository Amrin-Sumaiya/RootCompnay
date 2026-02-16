import React, { useState } from 'react';
import { Search, MapPin, Building2, Briefcase, Globe } from 'lucide-react';

const Header = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');

  // Professional Office Background Image
  const bgImage = "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&q=80&w=1200";

  return (
    <div className="relative w-full min-h-162.5 flex flex-col justify-center items-center">
      
      {/* 1. Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      > 
        {/* Dark Blue/Black Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-linear-to-b from-gray-900/90 via-green-900/80 to-gray-900/90"></div>
      </div>

      {/* 2. Main Content */}
      <div className="relative z-10 w-full max-w-5xl px-6 text-center pt-10">
        
        {/* Badge */}
        <div className="inline-block px-4 py-1 mb-6 border border-blue-400/30 rounded-full bg-blue-500/10 backdrop-blur-sm">
          <span className="text-blue-200 text-sm font-semibold tracking-wide uppercase">
            #1 Job Portal Platform
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
          Let's Find Your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            Dream Job
          </span>
        </h1>

        <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto font-light">
          Connecting the world's best talent with top-tier companies. 
          Start your career journey today.
        </p>

        {/* Search Bar */}
        <div className="bg-white p-2 rounded-full shadow-2xl max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-2 transform transition-all hover:scale-[1.01]">
          {/* Job Title Input */}
          <div className="flex items-center w-full md:w-5/12 px-6 py-3 border-b md:border-b-0 md:border-r border-gray-100">
            <Search className="text-blue-500 mr-3" size={22} />
            <input 
              type="text" 
              placeholder="Job title, skills, or company" 
              className="w-full outline-none text-gray-700 placeholder-gray-400 font-medium"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </div>

          {/* Location Input */}
          <div className="flex items-center w-full md:w-4/12 px-6 py-3">
            <MapPin className="text-blue-500 mr-3" size={22} />
            <input 
              type="text" 
              placeholder="City, State, or Zip" 
              className="w-full outline-none text-gray-700 placeholder-gray-400 font-medium"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          {/* Search Button */}
          <div className="w-full md:w-3/12 p-1">
            <button className="w-full bg-green-900 hover:bg-blue-700 text-white font-bold py-3 rounded-full transition duration-300 shadow-lg shadow-blue-500/30">
              Search Jobs
            </button>
          </div>
        </div>
      </div>

      {/* 3. Stats Cards (Floating at Bottom) */}
      <div className="relative z-10 w-full max-w-6xl pb-8 mt-10 md:mt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Companies */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl flex items-center gap-5 hover:bg-white/15 transition-all duration-300 group">
            <div className="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center group-hover:bg-blue-500 transition-colors">
              <Building2 className="text-blue-300 group-hover:text-white" size={28} />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white">12,500+</h3>
              <p className="text-gray-300 text-sm font-medium">Top Companies</p>
            </div>
          </div>

          {/* Card 2: Vacancies */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl flex items-center gap-5 hover:bg-white/15 transition-all duration-300 group">
            <div className="w-14 h-14 bg-emerald-500/20 rounded-xl flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
              <Briefcase className="text-emerald-300 group-hover:text-white" size={28} />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white">250k+</h3>
              <p className="text-gray-300 text-sm font-medium">Live Job Vacancies</p>
            </div>
          </div>

          {/* Card 3: Countries */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl flex items-center gap-5 hover:bg-white/15 transition-all duration-300 group">
            <div className="w-14 h-14 bg-purple-500/20 rounded-xl flex items-center justify-center group-hover:bg-purple-500 transition-colors">
              <Globe className="text-purple-300 group-hover:text-white" size={28} />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white">45+</h3>
              <p className="text-gray-300 text-sm font-medium">Countries Worldwide</p>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Header