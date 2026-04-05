import React, { useState } from "react";
import api from "../../api/axios";
import { Package, DollarSign, List, FileText, Zap, Calendar, CreditCard } from "lucide-react"; // npm install lucide-react

const CreatePackage = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    benefits: "",
    features: "",
    price: "",
    credit: "",
    job_limit: "",
    job_duration_days: "",
    package_duration_days: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/admin/package", formData);
      alert(res.data.message);
      setFormData({
        name: "", description: "", benefits: "", features: "",
        price: "", credit: "", job_limit: "", job_duration_days: "", package_duration_days: "",
      });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error creating package");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = "w-full pl-10 pr-4 py-2.5 bg-slate-200/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none placeholder:text-slate-500";
  const labelStyle = "block text-sm font-medium text-white mb-1.5 ml-1";
  const iconStyle = "absolute left-3 top-10 text-slate-500 w-4 h-4";

  return (
    <div className="min-h-screen  p-4 md:p-8 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-slate-500 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header Section */}
        <div className="px-8 py-6 border-b border-slate-700 bg-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-300/20 rounded-xl">
              <Package className="text-indigo-400 w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Create New Package</h2>
              <p className="text-slate-200 text-sm">Define pricing and limitations for your service tiers.</p>
            </div>
          </div>
        </div>  

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          
          {/* Section: Basic Information */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">Basic Details</h3>
            
            <div className="relative">
              <label className={labelStyle}>Package Name</label>
              <Package className={iconStyle} />
              <input name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Premium Monthly" required className={inputStyle} />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative">
                <label className={labelStyle}>Description</label>
                <FileText className={iconStyle} />
                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Short overview..." required className={`${inputStyle} h-24 resize-none pl-10`} />
              </div>
              <div className="relative">
                <label className={labelStyle}>Features</label>
                <List className={iconStyle} />
                <textarea name="features" value={formData.features} onChange={handleChange} placeholder="One feature per line..." className={`${inputStyle} h-24 resize-none pl-10`} />
              </div>
            </div>
          </div>

          <hr className="border-slate-300" />

          {/* Section: Pricing & Limits */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-indigo-400">Economics & Limitations</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <label className={labelStyle}>Price ($)</label>
                <DollarSign className={iconStyle} />
                <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="0.00" required className={inputStyle} />
              </div>
              <div className="relative">
                <label className={labelStyle}>Credits</label>
                <CreditCard className={iconStyle} />
                <input name="credit" type="number" value={formData.credit} onChange={handleChange} placeholder="100" className={inputStyle} />
              </div>
              <div className="relative">
                <label className={labelStyle}>Job Limit</label>
                <Zap className={iconStyle} />
                <input name="job_limit" type="number" value={formData.job_limit} onChange={handleChange} placeholder="20" className={inputStyle} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <label className={labelStyle}>Job Duration (Days)</label>
                <Calendar className={iconStyle} />
                <input name="job_duration_days" type="number" value={formData.job_duration_days} onChange={handleChange} placeholder="30" className={inputStyle} />
              </div>
              <div className="relative">
                <label className={labelStyle}>Package Expiry (Days)</label>
                <Calendar className={iconStyle} />
                <input name="package_duration_days" type="number" value={formData.package_duration_days} onChange={handleChange} placeholder="365" className={inputStyle} />
              </div>
            </div>
          </div>

          {/* Submit Area */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-700 hover:bg-indigo-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white py-3 rounded-xl font-bold text-lg shadow-lg shadow-indigo-900/20 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                "Create Package Tier"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePackage;