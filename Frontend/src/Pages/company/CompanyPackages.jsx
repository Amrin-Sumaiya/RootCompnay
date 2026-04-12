import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { toast } from "react-toastify"; // npm install react-toastify

const CompanyPackages = () => {
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


  

  const buyPackage = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.post(
        "/company/buy-package",
        { packageId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Purchase failed");
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-96">
       <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen  py-6 px-4 sm:px-6 lg:px-8">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-br from-indigo-600 to-purple-700 -z-10 clip-path-slant" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 70%, 0 100%)' }}></div>

      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-16">
          <h2 className="text-indigo-800 text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Package's Offer
          </h2>
          <p className=" text-lg max-w-2xl mx-auto">
            Choose a package that fits your company's growth. Flexible options for teams of all sizes.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {packages.map((pkg, idx) => (
            <div 
              key={pkg.id} 
              className="relative group flex flex-col bg-white rounded-3xl shadow-xl shadow-slate-200/60 overflow-hidden border border-slate-100 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
            >
              {/* Top Accent Bar */}
              <div className={`h-3 w-full ${idx === 1 ? 'bg-indigo-500' : 'bg-slate-200'}`}></div>

              <div className="p-8 flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-yellow-600">{pkg.name}</h3>
                    <span className="inline-block mt-2 px-3 py-1 text-xs font-semibold text-indigo-600 bg-indigo-50 rounded-full uppercase tracking-wider">
                      {pkg.package_duration_days} Days Access
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-5xl font-black text-slate-900">${pkg.price}</span>
                    <span className="ml-2 text-slate-400 font-medium">/total</span>
                  </div>
                  <p className="mt-4 text-slate-500 text-sm leading-relaxed italic">
                    "{pkg.description}"
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-8 ">
                  <div className="flex items-center text-slate-700">
                    <div className="p-1 bg-green-100 rounded-full mr-2 text-green-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <span className="font-medium">{pkg.job_limit} Job Postings</span>
                  </div>
                  <div className="flex items-center text-slate-700">
                    <div className="p-1 bg-green-100 rounded-full mr-3 text-green-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <span>{pkg.credit} Platform Credits</span>
                  </div>
                  <div className="flex items-center text-slate-700 opacity-60">
                    <div className="p-1 bg-slate-100 rounded-full mr-3 text-slate-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <span>Full Analytics Dashboard</span>
                  </div>
                </div>

                <button
                  onClick={() => buyPackage(pkg.id)}
                  className={`group relative w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 overflow-hidden ${
                    idx === 1 
                    ? 'bg-indigo-800 text-white hover:bg-slate-800 shadow-lg shadow-indigo-200' 
                    : ' bg-indigo-800 text-white hover:bg-slate-800'
                  }`}
                >
                  <span className="relative z-10">Buy Package</span>
                  <div className="absolute inset-0 bg-white/10 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0"></div>
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <footer className="mt-16 text-center text-slate-400 text-sm italic">
          * Secure payment processing via Stripe or PayPal. Taxes may apply.
        </footer>
      </div>
    </div>
  );
};

export default CompanyPackages;