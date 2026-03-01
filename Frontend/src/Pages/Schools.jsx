import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { PlusCircle, Search, School, Loader2, GraduationCap } from "lucide-react"; // Using lucide-react for icons

const Universities = () => {
  const [universities, setUniversities] = useState([]);
  const [name, setName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/schools");
      setUniversities(res.data);
    } catch (err) {
      console.error("Failed to fetch:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      setIsSubmitting(true);
      await api.post("/admin/schools", { name });
      setName("");
      await fetchData();
    } catch (err) {
      console.error("Failed to add:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredUniversities = universities.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto p-8 bg-gray-50 min-h-screen font-sans text-slate-900">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight flex items-center gap-3">
            <School className="text-indigo-600 w-8 h-8" />
            Add School & College 
          </h2>
          <p className="text-slate-500 mt-1">Manage and register educational partners in the system.</p>
        </div>
        
        {/* Search Bar */}
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors w-4 h-4" />
          <input 
            type="text"
            placeholder="Search institutions..."
            className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl w-full md:w-64 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar: Add Form */}
        <aside className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm sticky top-8">
            <h3 className="text-lg font-semibold mb-4 text-slate-800">Registration</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">University Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Harvard University"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>
              <button 
                disabled={isSubmitting}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-100 active:scale-[0.98]"
              >
                {isSubmitting ? <Loader2 className="animate-spin w-5 h-5" /> : <PlusCircle className="w-5 h-5" />}
                Register School
              </button>
            </form>
          </div>
        </aside>

        {/* Main: Directory List */}
        <main className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <span className="text-sm font-medium text-slate-500">{filteredUniversities.length} Universities Found</span>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                <Loader2 className="w-10 h-10 animate-spin mb-2" />
                <p className="animate-pulse">Loading directory...</p>
              </div>
            ) : filteredUniversities.length > 0 ? (
              <ul className="divide-y divide-slate-100">
                {filteredUniversities.map((u) => (
                  <li key={u.id} className="p-6 hover:bg-indigo-50/30 transition-colors flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-indigo-500 group-hover:border-indigo-200 transition-colors">
                        <GraduationCap className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 uppercase tracking-tight">{u.name}</h4>
                        <span className="text-xs text-slate-400">ID: {u.id}</span>
                      </div>
                    </div>
                    <button className="text-slate-300 hover:text-red-500 transition-colors text-sm font-medium">
                      Details
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-20 bg-white">
                <p className="text-slate-400 italic">No institutions found matching "{searchTerm}"</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Universities;