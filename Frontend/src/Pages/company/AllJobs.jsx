import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import ApplyModal from "../../Componenets/ApplyModal";

// --- Icons ---
const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block mr-1"><path d="M20 10c0 6-9 13-9 13s-9-7-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
);
const BuildingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block mr-1"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="9" y1="22" x2="9" y2="22.01"></line><line x1="15" y1="22" x2="15" y2="22.01"></line><line x1="12" y1="22" x2="12" y2="22.01"></line><line x1="12" y1="2" x2="12" y2="22"></line><line x1="20" y1="22" x2="20" y2="22.01"></line><line x1="4" y1="22" x2="4" y2="22.01"></line></svg>
);
const MoneyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block mr-1"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
);
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
);

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
    
  // New State for Search
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/company/all-jobs");
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Filter Logic
  const filteredJobs = jobs.filter((job) => {
    const term = searchTerm.toLowerCase();
    return (
      job.JobTitle?.toLowerCase().includes(term) ||
      job.Company_URL?.toLowerCase().includes(term) ||
      job.City?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
        
      {/* --- 1. Background Banner --- */}
      <div className="bg-linear-to-r from-green-900 to-green-900 py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-green-500 opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-indigo-500 opacity-10 blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto text-center z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Find Your Dream Job
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Browse through hundreds of open positions and take the next step in your career.
          </p>
        </div>
      </div>

      {/* --- 2. Search Bar Section --- */}
      <div className="max-w-4xl mx-auto px-4 relative z-20 -mt-8">
        <div className="bg-white rounded-xl shadow-lg p-3 flex items-center border border-gray-100">
          <div className="pl-3">
            <SearchIcon />
          </div>
          <input 
            type="text" 
            placeholder="Search by job title, company, or city..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none text-lg"
          />
          <button className="hidden sm:block bg-red-800 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transition-colors duration-200">
            Search
          </button>
        </div>
      </div>

      {/* --- 3. Job Grid --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex justify-between items-end mb-6">
           <h2 className="text-2xl font-bold text-green-800">Latest Opportunities</h2>
           <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full border shadow-sm">
             {filteredJobs.length} Jobs Found
           </span>
        </div>

        {filteredJobs.length === 0 ? (
          <div className="text-center py-20">
             <div className="inline-block p-4 rounded-full bg-gray-100 mb-4">
                <SearchIcon />
             </div>
             <h3 className="text-xl font-medium text-gray-900">No jobs found</h3>
             <p className="text-gray-500 mt-2">Try adjusting your search terms.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <div
                key={job.JobID}
                className="group relative flex flex-col justify-between bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                    <Link
                      to={`/jobs/${job.Company_URL.replace(/^\//, "")}/${job.JobSlug}`} 
                      className="text-xl font-bold text-green-700 group-hover:text-red-600 transition-colors"
                    >
                      {job.JobTitle}
                    </Link>

                      <div className="flex items-center mt-1 text-sm text-gray-500 font-medium">
                          <BuildingIcon />
                          <Link
                              to={`/company/${job.Company_URL.replace("/", "")}/dashboard`}
                              className="hover:underline hover:text-blue-600 ml-1"
                          >
                              {job.Company_URL}
                          </Link>
                      </div>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                      {job.SalaryType}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <p className="flex items-center text-sm text-gray-600">
                      <MapPinIcon />
                      {job.City}, {job.Country}
                    </p>
                    <p className="flex items-center text-sm text-gray-600">
                      <MoneyIcon />
                      {job.SalaryFrom} - {job.SalaryTo} <span className="text-xs ml-1 uppercase font-semibold">{job.Currency}</span>
                    </p>
                    {job.Address && (
                        <p className="text-xs text-gray-400 mt-2 truncate">
                           {job.Address}
                        </p>
                    )}
                  </div>

                  {job.JobDescription && (
                    <p className="text-sm text-gray-600 line-clamp-3 mb-6 leading-relaxed">
                      {job.JobDescription}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => {
                    setSelectedJob(job);
                    setShowModal(true);
                  }}
                  className="w-full mt-4 bg-green-900 text-white font-medium py-2.5 rounded-lg hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Apply Now  
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- MOVED MODAL HERE (Outside the Loop) --- */}
      <ApplyModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        job={selectedJob}
      />
    </div>
  );
};

export default AllJobs;