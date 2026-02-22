import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";

import { 
  FaBuilding, FaMapMarkerAlt, FaMoneyBillWave, 
  FaBriefcase, FaArrowLeft, FaClock, FaGlobe, FaCheck 
} from "react-icons/fa";

// 1. IMPORT THE MODAL
import ApplyModal from "../../Componenets/ApplyModal"; 


const JobDetails = () => {
  const { companyUrl, jobSlug } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  // 2. STATE FOR MODAL VISIBILITY
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        // Clean the companyUrl in case of double slashes logic
        const cleanCompanyUrl = companyUrl.replace(/^\//, "");
        const res = await api.get(
          `/jobs/public/${cleanCompanyUrl}/${jobSlug}`
        );
        setJob(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [companyUrl, jobSlug]);

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!job) return (
    <div className="min-h-screen flex items-center justify-center text-slate-500">
      Job not found
    </div>
  );

  // Helper to remove slash for display links
  const cleanCompanyUrl = job.Company_URL ? job.Company_URL.replace(/^\//, "") : "";

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4 flex justify-center items-start">
      
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        
        {/* --- COMPACT HEADER --- */}
        <div className="bg-gray-200 p-6 md:p-8 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
<button
  onClick={() => navigate("/company/all-jobs")}
  className="text-black  bg-gray-400 rounded-full px-3 py-3 hover:text-white text-sm flex items-center gap-2 mb-3 transition-colors"
>
  <FaArrowLeft /> Back to Jobs
</button>

            
            <div className="flex items-center gap-3 mb-2">
                <div className="bg-blue-600 p-2 rounded-lg">
                    <FaBuilding className="text-white text-lg"/>
                </div>
                <Link to={`/company/${cleanCompanyUrl}/dashboard`} className="font-bold text-3xl text-blue-900 hover:text-white transition-colors">
                    {cleanCompanyUrl}
                </Link>
            </div>

            <h1 className="text-2xl md:text-2xl text-black  font-bold leading-tight">{job.JobTitle}</h1>
            
            <div className="flex flex-wrap gap-4 mt-3 text-sm text-slate-900">
                <span className="flex items-center gap-1"><FaMapMarkerAlt/> {job.City}, {job.Country}</span>
                <span className="flex items-center gap-1"><FaBriefcase/> {job.JobType}</span>
                <span className="flex items-center gap-1"><FaClock/> Posted recently</span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2 min-w-50">
             <div className="text-right">
                <span className="block text-xs text-slate-400 uppercase font-bold">Salary</span>
                <span className="text-xl font-bold text-green-900">
                    {job.SalaryFrom} - {job.SalaryTo} <span className="text-sm">{job.Currency}</span>
                </span>
             </div>
             
             {/* 3. BUTTON CLICK HANDLER (DESKTOP) */}
             <button 
                onClick={() => setShowModal(true)}
                className="bg-white text-slate-900 hover:bg-blue-50 px-6 py-2 rounded-lg font-bold text-sm transition-colors shadow-sm w-full md:w-auto"
             >
                Apply Now
             </button>
          </div>
        </div>

        {/* --- BODY CONTENT --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0 md:gap-8">
            
            {/* LEFT: Main Text (8 Cols) */}
            <div className="md:col-span-8 p-6 md:p-8 space-y-6">
                
                {/* Description */}
                <div>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide border-b pb-2 mb-3">Job Description</h3>
                    <p className="text-slate-600 text-sm leading-6 whitespace-pre-line">
                        {job.JobDescription}
                    </p>
                </div>

                {/* Responsibilities */}
                <div>
                      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide border-b pb-2 mb-3">Responsibilities</h3>
                      <div className="text-slate-600 text-sm leading-6 whitespace-pre-line">
                        {job.JobResponsibilities}
                      </div>
                </div>

                {/* Qualifications */}
                <div>
                      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide border-b pb-2 mb-3">Requirements</h3>
                      <p className="text-slate-600 text-sm leading-6 whitespace-pre-line">
                        {job.Qualifications || "Not specified"}

                      </p>
                </div>

            </div>

            {/* RIGHT: Sidebar (4 Cols) */}
            <div className="md:col-span-4 bg-slate-50 p-6 md:p-8 border-l border-slate-100 h-full">
                
                {/* Skills */}
                <div className="mb-6">
                    <h4 className="font-bold text-slate-800 text-sm mb-3">Required Skills</h4>
                    <div className="flex flex-wrap gap-2">
                        {job.Skills?.split(",").map((skill, i) => (
                            <span key={i} className="px-2 py-1 bg-white border border-slate-200 rounded text-xs text-slate-600 font-medium">
                                {skill.trim()}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Job Overview List */}
                <div className="mb-6">
                    <h4 className="font-bold text-slate-800 text-sm mb-3">Overview</h4>
                    <ul className="space-y-3 text-sm text-slate-600">
                        <li className="flex justify-between">
                            <span className="text-slate-400">Experience:</span>
                            <span className="font-medium text-right">{job.Experience}</span>
                        </li>
                        <li className="flex justify-between">
                            <span className="text-slate-400">Location:</span>
                            <span className="font-medium text-right">{job.JobLocation}</span>
                        </li>
                        <li className="flex justify-between">
                            <span className="text-slate-400">Vacation:</span>
                            <span className="font-medium text-right">{job.WeeklyVacation}</span>
                        </li>
                        <li className="flex justify-between items-center">
                            <span className="text-slate-400">Website:</span>
                            <a href={job.Company_URL} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                                <FaGlobe />
                            </a>
                        </li>
                    </ul>
                </div>

                 {/* Benefits */}
                 {job.Benefits && (
                    <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                        <h4 className="font-bold text-green-800 text-xs uppercase mb-2 flex items-center gap-2">
                            <FaCheck /> Benefits
                        </h4>
                        <p className="text-xs text-green-700 leading-5">
                            {job.Benefits}
                        </p>
                    </div>
                )}

                {/* 3. BUTTON CLICK HANDLER (MOBILE) */}
                <button 
                    onClick={() => setShowModal(true)}
                    className="w-full mt-6 bg-blue-600 text-white font-bold py-3 rounded-lg md:hidden shadow-lg shadow-blue-500/30"
                >
                    Apply Now
                </button>

            </div>
        </div>
      </div>

      {/* 4. RENDER THE MODAL COMPONENT */}
      <ApplyModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        job={job} 
      />

    </div>
  );
};

export default JobDetails;