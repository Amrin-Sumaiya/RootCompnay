import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { PlusCircle, GraduationCap, School, Loader2, Search, X } from "lucide-react";

const Universities = () => {
  const [universities, setUniversities] = useState([]);
  const [name, setName] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // State for search
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/universities");
      setUniversities(res.data);
    } catch (error) {
      console.error("Error fetching data", error);
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
      await api.post("/admin/universities", { name });
      setName("");
      fetchData();
    } catch (error) {
      console.error("Error adding institution", error);
    }
  };

  // Logic to filter the list based on search term
  const filteredUniversities = universities.filter((u) =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen font-sans">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Universities List
          </h2>
          <p className="text-gray-500 text-sm">Register and filter institutional records.</p>
        </div>
        <div className="bg-indigo-600 p-3 rounded-xl shadow-lg shadow-indigo-200">
          <School className="text-white w-6 h-6" />
        </div>
      </div>

      {/* Add New University Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Add New Record</h3>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
          <div className="relative grow">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Stanford University"
              className="w-full pl-4 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
            />
          </div>
          <button 
            type="submit"
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-md hover:shadow-indigo-200 active:scale-95"
          >
            <PlusCircle size={18} />
            Add
          </button>
        </form>
      </div>

      {/* Directory & Search Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-white space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h3 className="font-bold text-gray-800 text-lg">
              University Directory
            </h3>
            
            {/* SEARCH INPUT */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-10 py-2 text-sm bg-gray-100 border-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
            <p className="mt-4 text-gray-500 font-medium">Loading records...</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-50">
            {filteredUniversities.length > 0 ? (
              filteredUniversities.map((u) => (
                <li 
                  key={u.id} 
                  className="group flex items-center justify-between p-5 hover:bg-indigo-50/40 transition-all cursor-default"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-indigo-50 group-hover:bg-white p-2.5 rounded-xl transition-colors">
                      <GraduationCap className="text-indigo-400 group-hover:text-indigo-600 w-5 h-5" />
                    </div>
                    <div>
                      <span className="block font-semibold text-gray-700 group-hover:text-indigo-900 transition-colors uppercase tracking-tight">
                        {u.name}
                      </span>
                     <span className="text-xs text-gray-400">
  Added by: {u.created_by_email}
</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-gray-100 text-gray-500 text-[10px] font-bold rounded-full uppercase">
                      ID: {u.id}
                    </span>
                  </div>
                </li>
              ))
            ) : (
              <li className="p-12 text-center">
                <div className="inline-flex p-4 rounded-full bg-gray-50 mb-4">
                  <Search className="w-8 h-8 text-gray-300" />
                </div>
                <p className="text-gray-500 font-medium">No universities match "{searchTerm}"</p>
                <button 
                  onClick={() => setSearchTerm("")}
                  className="text-indigo-600 text-sm font-semibold mt-2 hover:underline"
                >
                  Clear search
                </button>
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Universities;