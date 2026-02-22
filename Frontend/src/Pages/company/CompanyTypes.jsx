import React, { useEffect, useState } from "react";
import api from "../../api/axios";

const CompanyTypes = () => {
  const [types, setTypes] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTypes = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/company-types");
      setTypes(res.data);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      console.error("Error fetching types");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      await api.post("/admin/company-type", { name });
      setName("");
      fetchTypes();
    } catch (err) {
      alert(err.response?.data?.message || "Error creating type");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Company Types</h1>
          <p className="text-gray-500 mt-1">Manage and categorize your company types.</p>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          
          {/* Form Header */}
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Add New Category</h2>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="e.g. Technology, Healthcare..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="grow border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-700"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-lg transition-colors shadow-sm active:transform active:scale-95"
              >
                Add Type
              </button>
            </form>
          </div>

          {/* Table Section */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
                  <th className="px-6 py-4 font-semibold w-20">#</th>
                  <th className="px-6 py-4 font-semibold">Classification Name</th>
                  <th className="px-6 py-4 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {types.length > 0 ? (
                  types.map((type, index) => (
                    <tr key={type.id} className="hover:bg-blue-50/50 transition-colors group">
                      <td className="px-6 py-4 text-gray-500 font-mono text-sm">{index + 1}</td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-gray-700 group-hover:text-blue-700 transition-colors">
                          {type.name}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-6 py-10 text-center text-gray-400 italic">
                      {loading ? "Loading classifications..." : "No company types found."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Footer info */}
        <p className="text-center text-gray-400 text-xs mt-6">
          System ID: {types.length} total categories registered.
        </p>
      </div>
    </div>
  );
};

export default CompanyTypes;