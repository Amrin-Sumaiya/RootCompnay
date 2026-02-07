import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ApplyModal from "../../Componenets/ApplyModal"; 

// --- Icons (Expanded for the new design) ---
const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block mr-1 text-gray-400"><path d="M20 10c0 6-9 13-9 13s-9-7-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
);
const BuildingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block mr-1 text-gray-400"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="9" y1="22" x2="9" y2="22.01"></line><line x1="15" y1="22" x2="15" y2="22.01"></line><line x1="12" y1="22" x2="12" y2="22.01"></line><line x1="12" y1="2" x2="12" y2="22"></line><line x1="20" y1="22" x2="20" y2="22.01"></line><line x1="4" y1="22" x2="4" y2="22.01"></line></svg>
);
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
);
const FilterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
);
const ChevronDown = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
);

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // --- Pagination State ---
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 3;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/jobs/all-jobs");
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // --- Filter Logic ---
  const filteredJobs = jobs.filter((job) => {
    const term = searchTerm.toLowerCase();
    return (
      job.JobTitle?.toLowerCase().includes(term) ||
      job.Company_URL?.toLowerCase().includes(term) ||
      job.CompanyName?.toLowerCase().includes(term) ||
      job.City?.toLowerCase().includes(term)
    );
  });

  // --- Pagination Logic ---
  // 1. Get current posts
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  // 2. Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  // 3. Handle Next/Prev
  const nextPage = () => {
      if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
      if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="min-h-screen bg-slate-200 text-slate-800 font-sans">
      
      {/* Top Decoration Line */}
      <div className="h-1 bg-linear-to-r from-green-900 to-purple-600"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-gray-100 pb-4">
            <div>
                <h1 className="text-2xl font-bold text-slate-800">
                    <span className="text-green-900">{filteredJobs.length} Jobs</span> 
                    <span className="text-gray-400 font-normal mx-2">|</span> 
                    <span className="text-slate-500 text-lg">Looking for talent?</span>
                </h1>
            </div>
            <div className="mt-4 md:mt-0 text-sm text-gray-500">
                Home / Jobs / Search
            </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
            
            {/* --- LEFT SIDEBAR (Updated with Shadow Bar Design) --- */}
            <aside className="w-full lg:w-1/4">
                
                {/* UPDATED: Wrapped the entire sidebar content in a single container 
                    with bg-white, shadow-xl, and rounded-xl to create the "Shadow Bar" look.
                */}
                <div className="bg-white p-6 rounded-xl shadow-xl border border-gray-200 space-y-6">

                    {/* Search Box within Sidebar */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-1">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <SearchIcon />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-2 bg-transparent rounded-md leading-5 placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
                                placeholder="Search for Jobs..."
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1); // Reset to page 1 on search
                                }}
                            />
                        </div>
                    </div>

                    {/* Quick Filter Header */}
                    <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                            <div className="bg-green-900 p-1 rounded text-white"><FilterIcon /></div> 
                            Quick Filter
                        </h3>
                        <button className="text-green-900 hover:underline text-xs" onClick={() => {setSearchTerm(""); setCurrentPage(1)}}>Clear</button>
                    </div>

                    {/* Salary Range */}
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm font-medium text-slate-700">
                            <span>Salary Range</span>
                        </div>
                        <input type="range" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-900" />
                        <div className="flex justify-between text-xs text-gray-500">
                            <span>$0</span>
                            <span>$10k+</span>
                        </div>
                    </div>

                    {/* Experience Range */}
                    <div className="space-y-3 pt-2">
                         <div className="flex justify-between text-sm font-medium text-slate-700">
                            <span>Experience</span>
                        </div>
                        <input type="range" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-900" />
                         <div className="flex justify-between text-xs text-gray-500">
                            <span>0 yr</span>
                            <span>10 yr+</span>
                        </div>
                    </div>

                    {/* Checkbox Filters */}
                    <div className="pt-2">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input type="checkbox" className="form-checkbox text-green-900 rounded border-gray-300 h-4 w-4" />
                            <span className="text-sm text-gray-600">Fresher</span>
                        </label>
                    </div>

                    {/* Accordion Filters */}
                    <div className="space-y-2">
                        {['Category/Industry', 'Location', 'Posted/Deadline', 'Other Filters'].map((filter, idx) => (
                            <div key={idx} className="border-t border-gray-100 py-3 first:border-t-0">
                                <button className="flex justify-between items-center w-full text-left group">
                                    <span className="text-sm font-medium text-slate-700 group-hover:text-green-900 transition-colors">{filter}</span>
                                    <span className="text-gray-400 group-hover:text-green-900"><ChevronDown /></span>
                                </button>
                            </div>
                        ))}
                    </div>

                     <button className="w-full mt-2 bg-gray-50 border border-green-900 text-green-900 font-medium py-2.5 rounded-lg hover:bg-green-900 hover:text-white transition-all shadow-sm">
                        Clear All Filters
                     </button>

                </div>
                {/* End of Shadow Bar Container */}

            </aside>


            {/* --- RIGHT CONTENT (Job List) --- */}
            <main className="w-full lg:w-3/4">
                
                {filteredJobs.length === 0 ? (
                    <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                         <div className="inline-block p-4 rounded-full bg-white mb-4 shadow-sm">
                            <SearchIcon />
                         </div>
                         <h3 className="text-xl font-medium text-gray-900">No jobs found</h3>
                         <p className="text-gray-500 mt-2">Try adjusting your search terms.</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {currentJobs.map((job) => {
                            // --- SAFETY LOGIC ---
if (!job.Company_URL) return null;

const safeCompanyUrl = job.Company_URL.replace(/^\/+/, "").trim();

                            const safeCompanyName = (job.CompanyName || "Company").replace("/", "");

                            return (
                                <div key={job.JobID} className="group flex flex-col md:flex-row bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:border-blue-200 transition-all duration-300">
                                    
                                    {/* Job Content */}
                                    <div className="flex-1 pr-0 md:pr-6 ">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <Link 
                                                    to={`/jobs/${safeCompanyUrl}/${job.JobSlug}`}
                                                    className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors block mb-1"
                                                >
                                                    {job.JobTitle}
                                                </Link>
                                                
                                                <div className="flex items-center text-sm text-gray-500 mb-3 gap-3">
                                                    <span className="flex items-center hover:text-blue-600 transition-colors">
                                                        <BuildingIcon />
                                                        <Link to={`/company/${safeCompanyName}/dashboard`}>
                                                            {job.CompanyName || "N/A"}
                                                        </Link>
                                                    </span>
                                                    <span className="flex items-center">
                                                        <MapPinIcon />
                                                        {job.City}, {job.Country}
                                                    </span>
                                                </div>
                                            </div>
                                            
                                            {/* Badge */}
                                            <span className="hidden sm:inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                                                {job.JobType || "Full Time"}
                                            </span>
                                        </div>

                                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                            {job.JobDescription}
                                        </p>
                                        
                                        {/* Tags/Salary */}
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded border border-gray-200 font-medium">
                                                {job.Experience || "Exp: N/A"}
                                            </span>
                                            <span className="px-2 py-1 bg-blue-50 text-green-900 text-xs rounded border border-blue-100 font-bold">
                                                {job.SalaryFrom} - {job.SalaryTo} {job.Currency}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <div className="mt-4 md:mt-0 md:w-48 flex flex-col justify-center border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">

                                        <button 
                                            onClick={() => {
                                                setSelectedJob(job);
                                                setShowModal(true);
                                            }}
                                            className="w-full bg-green-900 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 text-sm shadow-md shadow-blue-200"
                                        >
                                            Apply Now
                                        </button>
                                        <p className="text-xs text-gray-400 text-center mt-2">
                                            Deadline: {job.Deadline ? new Date(job.Deadline).toLocaleDateString() : "Open"}
                                        </p>
                                    </div>

                                </div>
                            );
                        })}
                    </div>
                )}

                {/* --- Pagination Controls --- */}
                {filteredJobs.length > 0 && (
                    <div className="mt-8 flex justify-center items-center gap-2">
                        <button 
                            onClick={prevPage}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 rounded-md border text-sm font-medium transition-colors ${currentPage === 1 ? 'bg-gray-50 text-gray-300 border-gray-200 cursor-not-allowed' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                        >
                            Previous
                        </button>
                        
                        {/* Page Numbers */}
                        <div className="flex gap-1">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                                <button
                                    key={number}
                                    onClick={() => paginate(number)}
                                    className={`w-10 h-10 rounded-md border text-sm font-medium transition-colors ${
                                        currentPage === number 
                                        ? 'bg-green-900 text-white border-blue-600 shadow-sm' 
                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                    }`}
                                >
                                    {number}
                                </button>
                            ))}
                        </div>

                        <button 
                            onClick={nextPage}
                            disabled={currentPage === totalPages}
                            className={`px-4 py-2 rounded-md border text-sm font-medium transition-colors ${currentPage === totalPages ? 'bg-gray-50 text-gray-300 border-gray-200 cursor-not-allowed' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                        >
                            Next
                        </button>
                    </div>
                )}
            </main>

        </div>
      </div>

      <ApplyModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        job={selectedJob}
      />
    </div>
  );
};

export default AllJobs;