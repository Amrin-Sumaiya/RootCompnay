/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from 'react';
import { Search, MapPin, Building2, Briefcase, Globe } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [location, setLocation] = useState('');
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalCompanies: 0,
    selfRegistered: 0,
    adminCreated: 0,
    totalJobs: 0,
    totalCandidates: 0
  });

  useEffect(() => {
    if (location.length < 2) {
      setLocationSuggestions([]);
      setShowLocationSuggestions(false);
      return;
    }

    const delayDebounce = setTimeout(() => {
      fetch(`https://backendjob.chulkani.com/api/company/location-search?location=${location}`)
        .then(res => res.json())
        .then(data => {
          setLocationSuggestions(data);
          setShowLocationSuggestions(true);
        })
        .catch(err => console.error(err));
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [location]);

  const highlightMatch = (text, keyword) => {
    if (!text) return "";

    const regex = new RegExp(`(${keyword})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, i) =>
      part.toLowerCase() === keyword.toLowerCase()
        ? <span key={i} className="text-blue-600 font-bold">{part}</span>
        : part
    );
  };

  useEffect(() => {
    if (searchTerm.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const delayDebounce = setTimeout(() => {
    fetch(`https://backendjob.chulkani.com/api/company/search?keyword=${searchTerm}&location=${location}`)
        .then(res => res.json())
        .then(data => {
          setSuggestions(data);
          setShowSuggestions(true);
        })
        .catch(err => console.error(err));
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  useEffect(() => {
    fetch("https://backendjob.chulkani.com/api/company/stats")
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error(err));

    fetch("https://backendjob.chulkani.com/api/jobs/stats")
      .then(res => res.json())
      .then(data =>
        setStats(prev => ({ ...prev, totalJobs: data.totalJobs }))
      )
      .catch(err => console.error(err));

    fetch("https://backendjob.chulkani.com/api/candidate/stats")
      .then(res => res.json())
      .then(data =>
        setStats(prev => ({ ...prev, totalCandidates: data.totalCandidates }))
      )
      .catch(err => console.error(err));
  }, []);

  const bgImage = "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&q=80&w=1200";

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-center items-center">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-linear-to-b from-gray-900/90 via-green-900/80 to-gray-900/90"></div>
      </div>

      <div className="relative z-10 w-full max-w-5xl px-6 text-center pt-10">
        <br />
        <div className="bg-white p-1 rounded-full shadow-2xl max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-1 transform transition-all hover:scale-[1.01] relative">
          <br />
          
          <div className="relative flex items-center w-full md:w-5/12 px-6 py-3 border-b md:border-b-0 md:border-r border-gray-100">
            <Search className="text-blue-500 mr-3 shrink-0" size={22} />
            <input
              type="text"
              placeholder="Job title, or company"
              className="w-full outline-none text-gray-700 placeholder-gray-400 font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => searchTerm.length >= 3 && setShowSuggestions(true)}
              onBlur={() => {
                setTimeout(() => setShowSuggestions(false), 200);
              }}
            />

            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute left-0 top-full mt-2 w-full bg-gray-300 rounded-2xl shadow-2xl border border-gray-200 max-h-40 overflow-y-auto z-50">
                {suggestions.map((item) => (
                  <div
                    key={item.JobID}
onClick={() => {
  setShowSuggestions(false);

  navigate(`/company/all-jobs?keyword=${item.JobTitle}`);
}}
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-all border-b border-gray-100 last:border-none group"
                  >
                    <p className="text-gray-800 font-semibold group-hover:text-blue-600">
                      {item.JobTitle}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <Building2 size={14} className="text-gray-800" />
                      <p className="text-green-800 font-bold text-sm">
                        {item.CompanyName}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="relative flex items-center w-full md:w-4/12 px-6 py-3">
            <MapPin className="text-blue-500 mr-3 shrink-0" size={22} />
            <input
              type="text"
              placeholder="City, State, or Zip"
              className="w-full outline-none text-gray-700 placeholder-gray-400 font-medium"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onFocus={() => location.length >= 2 && setShowLocationSuggestions(true)}
              onBlur={() => setTimeout(() => setShowLocationSuggestions(false), 200)}
            />

            {showLocationSuggestions && locationSuggestions.length > 0 && (
              <div className="absolute left-0 top-full mt-2 w-full bg-gray-200  shadow-2xl border border-gray-200 py-2 max-h-20 overflow-y-auto z-50">
                {locationSuggestions.map((item, index) => (
                  <div
                    key={index}
onClick={() => {
  const selectedLocation = item.City || item.State || item.Address;

  setShowLocationSuggestions(false);

  navigate(`/company/all-jobs?location=${selectedLocation}`);
}}
                    className="px-5 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-50 last:border-none transition-colors"
                  >
                    <p className="text-gray-800 font-semibold text-sm">
                      {highlightMatch(item.City || item.Address, location)}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5 font-medium uppercase tracking-wide">
                      {item.State}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="w-full md:w-3/12 p-1">
            <button     onClick={() => {
    navigate(`/company/all-jobs?keyword=${searchTerm}&location=${location}`);
  }} className="w-full bg-green-900 hover:bg-blue-700 text-white font-bold py-3 rounded-full transition duration-300 shadow-lg shadow-blue-500/30">
              Search Jobs
            </button>
          </div>
        </div>
        <br /><br /><br />
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
          Let's Find Your <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-300">
            Dream Job
          </span>
        </h1>
        <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto font-light">
          Connecting the world's best talent with top-tier companies.
          Start your career journey today.
        </p>
      </div>

      <div className="relative z-10 w-full max-w-6xl pb-4 mt-10 md:mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl flex items-center gap-5 hover:bg-white/15 transition-all duration-300 group">
            <div className="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center group-hover:bg-blue-500 transition-colors">
              <Building2 className="text-blue-300 group-hover:text-white" size={28} />
            </div>
            <div className="text-left">
              <h3 className="text-3xl font-bold text-white">{stats.totalCompanies}</h3>
              <p className="text-gray-300 text-sm font-medium">Total Companies</p>
              <p className="text-xs text-gray-400 mt-1">
                {stats.selfRegistered} Registered | {stats.adminCreated} Admin Created
              </p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl flex items-center gap-5 hover:bg-white/15 transition-all duration-300 group">
            <div className="w-14 h-14 bg-emerald-500/20 rounded-xl flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
              <Briefcase className="text-emerald-300 group-hover:text-white" size={28} />
            </div>
            <div className="text-left">
              <h3 className="text-3xl font-bold text-white">{stats.totalJobs}</h3>
              <p className="text-gray-300 text-sm font-medium">Live Job Vacancies</p>
              <p className="text-xs text-gray-400 mt-1">Posted By Various Companies</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl flex items-center gap-5 hover:bg-white/15 transition-all duration-300 group">
            <div className="w-14 h-14 bg-purple-500/20 rounded-xl flex items-center justify-center group-hover:bg-purple-500 transition-colors">
              <Globe className="text-purple-300 group-hover:text-white" size={28} />
            </div>
            <div className="text-left">
              <h3 className="text-3xl font-bold text-white">{stats.totalCandidates}</h3>
              <p className="text-gray-300 text-sm font-medium">Registered Candidates</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header;