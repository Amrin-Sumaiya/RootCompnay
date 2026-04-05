import React, { useEffect, useState } from "react";
import api from "../api/axios";

const PackagesList = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPackages = async () => {
    try {
      const res = await api.get("/admin/packages");
      setPackages(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []); 

  if (loading) { 
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    ); 
  }

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-extrabold text-indigo-800 tracking-tight">
          All Packages Offer
        </h2>
        <p className="mt-4 text-slate-400 text-lg">
          Choose the perfect package to scale your hiring process.
        </p> 
      </div>   

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="group relative bg-slate-600 border border-slate-800 p-8 rounded-2xl shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/50"
          >
            {/* Header */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-yellow-500 mb-2 group-hover:text-blue-400 transition-colors">
                {pkg.name}
              </h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white">${pkg.price}</span>
                <span className="text-slate-500 text-sm">/{pkg.package_duration_days} days</span>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed mb-6 min-h-[48px]">
              {pkg.description}
            </p>

            {/* Features List */}
            <ul className="space-y-4 mb-8 border-t border-slate-800 pt-6">
              <li className="flex items-center text-sm text-slate-300">
                <span className="mr-3 text-green-500">✓</span>
                <span className="font-medium">{pkg.job_limit} Job Posts Included</span>
              </li>
              <li className="flex items-center text-sm text-slate-300">
                <span className="mr-3 text-green-500">✓</span>
                <span>{pkg.credit} Premium Credits</span>
              </li>
              <li className="flex items-center text-sm text-slate-300">
                <span className="mr-3 text-green-500">✓</span>
                <span>{pkg.package_duration_days} Days Validity</span>
              </li>
            </ul>

            {/* Action Button */}
            <button className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg shadow-blue-900/20">
              Get Started
            </button>
            
            {/* Subtle Gradient Glow */}
            <div className="absolute inset-0 rounded-2xl transition-opacity opacity-0 group-hover:opacity-10 pointer-events-none bg-gradient-to-br from-blue-400 to-purple-600"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackagesList;