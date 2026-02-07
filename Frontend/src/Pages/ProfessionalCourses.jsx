import React, { useEffect, useState } from "react";
import api from "../api/axios";

// Standard Feather-style icons using SVG for better performance/no extra deps
const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);

const ProfessionalCourses = () => {
  const [courseName, setCourseName] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCourses = async () => {
    try {
      const res = await api.get("/common/professional-courses");
      setCourses(res.data);
    } catch (err) {
      console.error("Failed to fetch courses", err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleCreate = async () => {
    if (!courseName.trim()) return alert("Course name is required");

    try {
      setLoading(true);
      await api.post(
        "/admin/professional-course",
        { name: courseName.trim() },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setCourses((prev) => [...prev, { id: Date.now(), name: courseName.trim() }]);
      setCourseName("");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-700 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            🎓 Professional Courses
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">
            Configure the educational database for candidate CVs
          </p>
        </div>
        <div className="flex items-center bg-indigo-50 dark:bg-indigo-900/30 px-4 py-2 rounded-full border border-indigo-100 dark:border-indigo-800">
          <span className="text-indigo-700 dark:text-indigo-300 text-sm font-bold">
            {courses.length} Active Courses
          </span>
        </div>
      </div>

      {/* Action Card */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="p-6 md:p-8">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Add New Program</h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                placeholder="Enter course name (e.g. Graphic Design Masterclass)"
                className="w-full pl-4 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all dark:text-white"
              />
            </div>
            <button
              onClick={handleCreate}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/20 transition-all active:scale-95 disabled:opacity-70 disabled:pointer-events-none"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <PlusIcon />
                  <span>Add Course</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Grid Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 px-1">
          <div className="w-1.5 h-6 bg-indigo-500 rounded-full"></div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200">
            Current Course Catalog
          </h2>
        </div>

        {courses.length === 0 ? (
          <div className="bg-slate-50 dark:bg-slate-900/50 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center">
            <div className="bg-white dark:bg-slate-800 w-16 h-16 rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-slate-400">📁</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              No courses found in the repository. <br />
              <span className="text-sm">Start by adding your first professional course above.</span>
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map((c) => (
              <div
                key={c.id}
                className="group p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-slate-100 dark:bg-slate-700 group-hover:bg-indigo-500 transition-colors"></div>
                <div className="flex justify-between items-start">
                  <span className="text-slate-700 dark:text-slate-200 font-bold leading-tight uppercase text-sm tracking-tight">
                    {c.name}
                  </span>
                  <span className="opacity-0 group-hover:opacity-100 text-indigo-500 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfessionalCourses;