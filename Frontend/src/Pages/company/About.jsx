import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, ArrowRight, Building2, ChevronRight, Briefcase, Users, Award } from "lucide-react";

const About = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/company/public-with-jobs")
      .then((res) => res.json())
      .then((data) => setCompanies(data))
      .catch((err) => console.error(err));
  }, []);

  const bgImage = "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80";

  return (
    <section id="about" className="relative w-full py-24 overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      > 
        <div className="absolute inset-0 bg-linear-to-b from-gray-900/90 via-green-900/80 to-gray-900/90"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* ================= 1. FEATURED COMPANIES GRID ================= */}
        <div className="mb-24">
          <div className="mb-10">
            <div className="inline-block px-4 py-1.5 mb-4 border border-blue-400/30 rounded-full bg-blue-500/10 backdrop-blur-sm">
              <span className="text-blue-200 text-xs font-bold uppercase tracking-widest">Top Partners</span>
            </div>
            <h3 className="text-4xl md:text-5xl font-bold text-white">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Companies</span>
            </h3>
          </div>

          <div className="relative w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {companies.map((company) => (
              <div
                key={company.CompanyID}
                className="hover:z-50 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-5 hover:bg-white/15 transition-all duration-300 group flex flex-col relative"
              >
                {/* 1. Header: Company Name */}
                <div className="border-b border-white/10 pb-3 mb-4">
                  <h4 className="text-lg font-bold text-center text-white truncate leading-tight">
                    {company.CompanyName}
                  </h4>
                </div>

                {/* 2. Content Body */}
                <div className="flex gap-4 grow">
                  {/* Left Side: Logo */}
                  <div className="shrink-0">
                    <div className="w-20 h-20 rounded-full overflow-hidden bg-white flex items-center justify-center group-hover:scale-105 transition-transform">
                      {company.logo ? (
                        <img
                          src={`http://localhost:5000${company.logo}`}
                          alt={company.CompanyName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Building2 className="text-blue-300" size={24} />
                      )}
                    </div>
                  </div>

                  {/* Right Side: Job Titles & View More */}
                  <div className="flex flex-col grow min-w-0">
                    <div className="space-y-2 mb-4 grow">
                      {company.jobs.slice(0, 3).map((job, index) => (
                        <div 
                          key={job.JobID} 
                          // ADDED: Navigation when clicking specific job texts in the card
                          onClick={() => navigate(`/jobs/${company.Company_URL.replace("/", "")}/${job.JobSlug}`)}
                          className="text-xs group/job flex items-start gap-1 cursor-pointer"
                        >
                          <span className="font-bold text-blue-300">{index + 1}.</span>
                          <span className="text-gray-300 truncate group-hover/job:text-white group-hover/job:underline transition-all">
                            {job.JobTitle}
                          </span>
                        </div>
                      ))}
                      {company.jobs.length === 0 && (
                        <p className="text-gray-200 text-[10px] italic">No active jobs</p>
                      )}
                    </div>

                    {/* View More Button Section - Only shows if jobs > 3 */}
                    {company.jobs.length > 3 && (
                      <div className="relative mt-auto flex justify-end">
                        <button
                          onClick={() => setOpenDropdownId(openDropdownId === company.CompanyID ? null : company.CompanyID)}
                          className="bg-green-700 backdrop-blur-sm border border-white/30 hover:bg-green-600 hover:border-green-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg transition-all duration-300 flex items-center gap-1 group"
                        >
                          {openDropdownId === company.CompanyID ? 'Close' : 'View More'} 
                          <ArrowRight size={8} className={`${openDropdownId === company.CompanyID ? 'rotate-90' : ''} transition-transform`} />
                        </button>

                        {/* Dropdown List */}
                        {openDropdownId === company.CompanyID && (
                          <div className="absolute top-full left-0 w-full mt-2 z-50 bg-gray-900/95 backdrop-blur-xl border border-white/20 rounded-xl p-3 shadow-2xl animate-in fade-in zoom-in duration-200">
                            <button 
                              onClick={() => {
                                  setSelectedCompany(company);
                                  setOpenDropdownId(null);
                              }}
                              className="w-full text-left flex justify-between items-center text-[10px] font-bold text-blue-300 uppercase tracking-widest mb-2 border-b border-white/10 pb-1 hover:text-white transition-colors"
                            >
                              <span>More Jobs</span>
                              <ChevronRight size={10} />
                            </button>
                            
                            <div className="space-y-1.5 max-h-40 overflow-y-auto custom-scrollbar">
                              {company.jobs.slice(3).map((job, index) => (
                                <div
                                  key={job.JobID} 
                                  onClick={() => navigate(`/jobs/${company.Company_URL.replace("/", "")}/${job.JobSlug}`)}
                                  className="flex items-center gap-2 py-1 hover:bg-white/5 rounded px-1 transition-colors cursor-pointer group/item"
                                >
                                  <span className="text-gray-200 text-[10px] truncate group-hover/item:text-white">
                                    <span className="font-bold text-blue-300">{index + 4}.</span> {job.JobTitle}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {selectedCompany && (
        <div className="fixed inset-0 flex items-center justify-center z-[100] px-4">
          <div 
            className="absolute inset-0 bg-gray-900/80 backdrop-blur-md" 
            onClick={() => setSelectedCompany(null)}
          ></div>
          <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] p-8 w-full max-w-xl shadow-2xl animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setSelectedCompany(null)} 
              className="absolute top-5 right-5 text-white/60 hover:text-white"
            >
              ✕
            </button>
            <div className="flex items-center gap-5 mb-8">
              <div className="shrink-0 w-14 h-14 rounded-2xl overflow-hidden bg-white flex items-center justify-center">
                {selectedCompany?.logo ? (
                  <img
                    src={`http://localhost:5000${selectedCompany.logo}`}
                    alt={selectedCompany.CompanyName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Building2 className="text-blue-300" size={28} />
                )}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{selectedCompany.CompanyName}</h3>
                <p className="text-blue-300 font-semibold">{selectedCompany.jobs.length} Open Positions</p>
              </div>
            </div>
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
              {selectedCompany.jobs.map((job) => (
                <div
                  key={job.JobID}
                  onClick={() =>
                    navigate(`/jobs/${selectedCompany.Company_URL.replace("/", "")}/${job.JobSlug}`)
                  }
                  className="flex justify-between items-center p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Award size={20} className="text-gray-400" />
                    <span className="font-semibold text-white">{job.JobTitle}</span>
                  </div>
                  <ChevronRight className="text-gray-500" size={20} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.2); border-radius: 10px; }
      `}</style>
    </section>
  );
};

export default About;