import { useEffect, useState } from 'react';
import api from '../../api/axios';
import { FaGlobe, FaCalendarAlt, FaBuilding, FaCloudUploadAlt, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const CompanyDashboard = () => {
  const [company, setCompany] = useState(null);
  const [logo, setLogo] = useState(null);
  const [packages, setPackages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await api.get('/company/dashboard', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.FoundedDate) {
        res.data.FoundedDate = res.data.FoundedDate.split('T')[0];
      }
      setCompany(res.data);
    } catch (err) {
      console.error('Error fetching company dashboard:', err);
    }
  };

  const fetchPackages = async () => {
    try {
      const token = localStorage.getItem("token");
     const res = await api.get("/company/my-packages", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPackages(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDashboard();
    fetchPackages();
  }, []);

  const uploadLogo = async () => {
    if (!logo) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("logo", logo);
    const token = localStorage.getItem("token");

    try {
      await api.post("/company/upload-logo", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });
      window.location.reload();
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setUploading(false);
    }
  };

  if (!company) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-500 font-medium tracking-wide">Loading your workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-50 p-4 md:p-10 font-sans text-slate-900">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            Company Dashboard
          </h1>
          <p className="text-slate-500 mt-2 flex items-center gap-2">
            Workspace for <span className="font-semibold text-indigo-600">{company.CompanyName}</span>
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white p-2 px-4 rounded-xl shadow-sm border border-slate-200">
           <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
           <span className="text-sm font-medium text-slate-600">{new Date().toDateString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- LEFT COLUMN: INFO & UPLOAD --- */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-red-100 p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center mb-4">
                <FaBuilding size={20} />
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Organization</p>
              <h3 className="text-lg font-bold text-slate-800 truncate">{company.CompanyName}</h3>
            </div>

            <div className="bg-green-100 p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                <FaGlobe size={20} />
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Website</p>
              <a href={company.Company_URL} target="_blank" rel="noreferrer" className="text-indigo-600 font-semibold hover:underline block truncate">
                {company.Company_URL?.replace(/(^\w+:|^)\/\//, '')}
              </a>
            </div>

            <div className="bg-orange-100 p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center mb-4">
                <FaCalendarAlt size={20} />
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Established</p>
              <h3 className="text-lg font-bold text-slate-800">{company.FoundedDate}</h3>
            </div>
          </div>

          {/* Packages Section */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-800">Subscription Plans</h3>
              <span className="text-xs font-bold py-1 px-3 bg-indigo-100 text-indigo-700 rounded-full">ACTIVE</span>
            </div>
            <div className="p-6">
              {packages.length === 0 ? (
                <div className="text-center py-10">
                  <FaExclamationCircle className="mx-auto text-slate-300 mb-3" size={40} />
                  <p className="text-slate-500">No active packages found.</p>
                  <button className="mt-4 text-indigo-600 font-semibold">View Pricing</button>
                </div>
              ) : (
                <div className="grid gap-6">
                  {packages.map((pkg) => (
                    <div key={pkg.id} className="relative p-5 rounded-xl border border-slate-100 bg-slate-50/50">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                        <div>
                          <h4 className="text-lg font-bold text-indigo-900">{pkg.name}</h4>
                          <p className="text-sm text-slate-500 italic">Renewal Status: {pkg.status}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-black text-slate-800">${pkg.price}</span>
                        </div>
                      </div>
                      
                      {/* Job Limit Progress Bar */}
                      <div className="mt-2">
                        <div className="flex justify-between text-xs font-bold mb-1 uppercase tracking-tighter">
                          <span>Job Listings Used</span>
                          <span>{pkg.job_limit - pkg.remaining_jobs} / {pkg.job_limit}</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div 
                            className="bg-indigo-600 h-2 rounded-full transition-all duration-500" 
                            style={{ width: `${((pkg.job_limit - pkg.remaining_jobs) / pkg.job_limit) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: BRANDING --- */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Company Branding</h3>
            
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl p-8 bg-slate-50 group hover:border-indigo-300 transition-colors">
              {company.Logo ? (
                 <img src={company.Logo} alt="Logo" className="w-24 h-24 object-contain mb-4 rounded-lg shadow-sm" />
              ) : (
                <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center mb-4">
                  <FaBuilding className="text-slate-400" size={30} />
                </div>
              )}
              
              <label className="cursor-pointer text-center">
                <span className="block text-sm font-semibold text-indigo-600 hover:text-indigo-700">
                  {logo ? logo.name : "Select new logo"}
                </span>
                <input 
                  type="file" 
                  className="hidden" 
                  onChange={(e) => setLogo(e.target.files[0])} 
                  accept="image/*"
                />
                <p className="text-xs text-slate-400 mt-1">PNG, JPG up to 2MB</p>
              </label>

              {logo && (
                <button 
                  onClick={uploadLogo}
                  disabled={uploading}
                  className="mt-6 w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-2 px-4 rounded-lg font-bold text-sm hover:bg-indigo-700 transition-all disabled:opacity-50"
                >
                  <FaCloudUploadAlt />
                  {uploading ? "Uploading..." : "Confirm Upload"}
                </button>
              )}
            </div>
          </div>

          <div className="bg-indigo-900 rounded-2xl p-6 text-white shadow-xl shadow-indigo-200">
             <h4 className="font-bold flex items-center gap-2 mb-2">
               <FaCheckCircle className="text-emerald-400" /> Professional Tips
             </h4>
             <p className="text-indigo-100 text-sm leading-relaxed">
               Keeping your profile updated increases visibility to top talent by up to 40%. Ensure your URL and logo are current.
             </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CompanyDashboard;