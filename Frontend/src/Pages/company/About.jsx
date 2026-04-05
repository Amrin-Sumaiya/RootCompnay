import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, ArrowRight, Building2, ChevronRight, Briefcase, Users, Award } from "lucide-react";

const About = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  // Track which company is currently hovered for the "View More" list
  const [hoveredCompanyId, setHoveredCompanyId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/company/public-with-jobs")
      .then((res) => res.json())
      .then((data) => setCompanies(data))
      .catch((err) => console.error(err));
  }, []);

  const aboutData = {
    paragraph: "Welcome to JobPortal! We help you discover amazing career opportunities and connect with top companies worldwide. Whether you're starting your career or looking for a new challenge, we've got you covered.",
    points: [
      "Instant Job Alerts for new opportunities",
      "Easy One-Click Applications",
      "Connect with Verified Companies",
      "Personalized Skill-Based Job Matching",
      "Save time with smart search filters",
      "Get recommendations tailored to your profile",
    ],
  };

  const bgImage = "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80";

  return (
    <section id="about" className="relative w-full py-24 overflow-hidden">
      {/* Background Image with Overlay */}
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

          <div className="relative w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
            {companies.map((company) => (
              <div
                key={company.CompanyID}
                className=" hover:z-50 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-2 hover:bg-white/15 transition-all duration-300 group flex flex-col relative"
              >
                {/* Company Logo & Name */}
                <div className="flex items-start gap-4 mb-3">
                  <div className="shrink-0 w-18 h-18 rounded-full overflow-hidden bg-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    {company.logo ? (
                      <img
                        src={`http://localhost:5000${company.logo}`}
                        alt={company.CompanyName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Building2 className="text-blue-300" size={28} />
                    )}
                  </div>
                  
                  <div className="overflow-hidden">
                    <h4 className="text-xl font-bold text-white truncate leading-tight">
                      {company.CompanyName}
                    </h4>
                    <span className="text-blue-300 text-xs font-semibold flex items-center gap-1 mt-1">
                      <Briefcase size={12} /> {company.jobs.length} Openings
                    </span>
                  </div>
                </div>
                <div></div>

                {/* Minimum 3 Jobs List (Always Visible) */}
{/* Minimum 3 Jobs List (Always Visible) */}
<div className="space-y-3 mb-6 grow">
  {company.jobs.slice(0, 3).map((job, index) => (
    <div key={job.JobID} className="flex items-center justify-end text-sm group/job">
      
      <div className="flex items-center gap-2 max-w-45">
        <span className="text-gray-300 truncate group-hover/job:text-white transition-colors text-right w-full">
         <span className="font-bold text-blue-200"> {index + 1}. </span>  {job.JobTitle}
        </span>


      </div>

    </div>
  ))}

  {company.jobs.length === 0 && (
    <p className="text-gray-500 text-xs italic text-right">No active listings</p>
  )}
</div>       {/* View More Button with Hover List Logic */}
                <div 
                  className="relative"
                  onMouseEnter={() => setHoveredCompanyId(company.CompanyID)}
                  onMouseLeave={() => setHoveredCompanyId(null)}
                >
                  <button
                    onClick={() => setSelectedCompany(company)}
                    className=" bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-green-600 hover:border-green-600 text-white font-semibold px-2 py-1 rounded-xl transition-all duration-300 flex items-center gap-1 group ml-auto"
                  >
                    View More <ArrowRight size={6} className="group-hover:translate-x-1 transition-transform" />
                  </button>

                  {/* Absolute Hover List: Covers following content without moving cards */}
                  {hoveredCompanyId === company.CompanyID && company.jobs.length > 0 && (
                    <div className="absolute top-full left-0 w-full mt-0 z-50 bg-gray-900/95 backdrop-blur-xl border border-white/20 rounded-2xl p-3 shadow-2xl animate-in fade-in zoom-in duration-200">
                      <p className="text-[10px] font-bold text-blue-300 uppercase tracking-widest mb-3 border-b border-white/10 pb-2">All Available Positions</p>
                      <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
{company.jobs.map((job) => (
  <div
    key={job.JobID} 
onClick={() => {
  if (!job.JobSlug) {
    console.error("JobSlug missing", job);
    return;
  }

  navigate(`/jobs/${company.Company_URL.replace("/", "")}/${job.JobSlug}`);
}}
    className="flex items-center gap-2 py-1.5 hover:bg-white/5 rounded-lg px-2 transition-colors cursor-pointer group/item"
  >
                            <ChevronRight size={12} className="text-green-400 group-hover/item:translate-x-1 transition-transform" />
                            <span className="text-gray-200 text-xs truncate group-hover/item:text-white">{job.JobTitle}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= 2. ABOUT US SECTION ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-500/10 backdrop-blur-sm rounded-full"></div>
            <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-green-500/10 backdrop-blur-sm rounded-full"></div>
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80"
              alt="About Job Portal"
              className="rounded-[2.5rem] shadow-2xl w-full object-cover h-[500px]"
            />
            <div className="absolute -bottom-8 -right-4 md:right-10 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <Users className="text-blue-300" size={24} />
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">10K+</p>
                  <p className="text-gray-300 text-sm font-medium">Jobs Posted</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:pl-10">
            <div className="inline-block px-4 py-1.5 mb-6 border border-blue-400/30 rounded-full bg-blue-500/10 backdrop-blur-sm">
              <span className="text-blue-200 text-xs font-bold uppercase tracking-widest">Why Choose Us?</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              We help you find your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Perfect Career Match
              </span>
            </h2>
            <p className="mt-8 text-gray-300 text-lg leading-relaxed">{aboutData.paragraph}</p>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
              {aboutData.points.map((item, index) => (
                <div key={index} className="flex items-start gap-3 group">
                  <div className="bg-green-500/20 p-1 rounded-full group-hover:bg-green-500/30 transition-colors mt-0.5">
                    <CheckCircle className="text-green-300" size={16} />
                  </div>
                  <p className="text-gray-300 text-sm">{item}</p>
                </div>
              ))}
            </div>
            <button className="mt-12 bg-green-700 hover:bg-blue-700 text-white font-bold px-10 py-4 rounded-full transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-xl transform hover:-translate-y-0.5">
              Get Started Now
            </button>
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