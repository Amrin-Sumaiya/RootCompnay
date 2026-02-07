import { useEffect, useState } from 'react';
import api from '../../api/axios';
// Adding icons to give the real "Dashboard" feel
import { FaGlobe, FaCalendarAlt, FaBuilding, FaChartPie } from 'react-icons/fa';

const CompanyDashboard = () => {
  const [company, setCompany] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get('/company/dashboard', {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Option 1: format date here before saving
        if (res.data.FoundedDate) {
          res.data.FoundedDate = res.data.FoundedDate.split('T')[0]; // "YYYY-MM-DD"
        }

        setCompany(res.data);
      } catch (err) {
        console.error('Error fetching company dashboard:', err);
      }
    };

    fetchDashboard();
  }, []);

  if (!company) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
            <p className="text-gray-500 font-medium">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50/50 p-6 md:p-8 font-sans">
      
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
            Dashboard Overview
          </h2>
          <p className="text-gray-500 mt-1 flex items-center gap-2">
            Welcome back, <span className="font-semibold text-indigo-600">{company.CompanyName}</span>
          </p>
        </div>
        
        {/* Optional Dashboard Action Button (Visual only) */}
        <div className="hidden md:block">
            <span className="bg-white border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium shadow-sm">
                {new Date().toDateString()}
            </span>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Card 1: Company Name / Profile */}
        <div className="bg-red-100 p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-indigo-50 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
            
            <div className="flex items-center justify-between relative z-10">
                <div>
                    <p className="text-sm font-semibold text-gray-800 uppercase tracking-wider">Organization</p>
                    <h3 className="text-xl font-bold text-black mt-1 truncate">{company.CompanyName}</h3>
                </div>
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                    <FaBuilding size={24} />
                </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-green-600 ">
                <span>● Active Status</span>
            </div>
        </div>

        {/* Card 2: Website URL */}
        <div className="bg-green-100  p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-50 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
            
            <div className="flex items-center justify-between relative z-10">
                <div className="overflow-hidden">
                    <p className="text-sm font-semibold text-gray-800 uppercase tracking-wider">Website</p>
                    <a 
                        href={company.Company_URL} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-lg font-bold text-blue-600 hover:text-blue-800 hover:underline mt-1 block truncate transition-colors"
                    >
                        {company.Company_URL}
                    </a>
                </div>
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl shrink-0 ml-4">
                    <FaGlobe size={24} />
                </div>
            </div>
             <div className="mt-4 text-xs text-gray-400">
                Click link to visit portal
            </div>
        </div>

        {/* Card 3: Founded Date */}
        <div className="bg-purple-100  p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-orange-50 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
            
            <div className="flex items-center justify-between relative z-10">
                <div>
                    <p className="text-sm font-semibold text-gray-800 uppercase tracking-wider">Established</p>
                    <h3 className="text-xl font-bold text-gray-800 mt-1">{company.FoundedDate}</h3>
                </div>
                <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
                    <FaCalendarAlt size={24} />
                </div>
            </div>
             <div className="mt-4 text-xs text-gray-400">
                Founding date record
            </div>
        </div>
      </div>

      {/* Decorative 'Analytics' Section (Visual Placeholder to complete Dashboard look) */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col items-center justify-center text-center">
          <div className="bg-gray-50 p-4 rounded-full mb-3">
             <FaChartPie className="text-gray-300 text-3xl" />
          </div>
          <h3 className="text-gray-800 font-semibold">Activity Overview</h3>
          <p className="text-gray-400 text-sm mt-1 max-w-md">
            More detailed analytics and job performance metrics will appear here as your company activity grows.
          </p>
      </div>

    </div>
  );
};

export default CompanyDashboard;