import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    about: "",
    cv: null,
  });

  // Validation Error State
  const [errors, setErrors] = useState({
    phone: "",
    about: "",
    cv: ""
  });

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

  // --- STRICT VALIDATION HANDLER ---
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    let newErrors = { ...errors };
    let shouldUpdateState = true;

    // 1. Phone Validation (Hard Stop > 11 digits)
    if (name === "phone") {
        const cleanNumber = value.replace(/\D/g, ''); // Count digits only
        
        if (cleanNumber.length > 11) {
            // STOP TYPING if trying to exceed 11
            shouldUpdateState = false; 
            newErrors.phone = "Invalid number (Max 11 digits)";
        } else {
            // Allow typing, but show error if not exactly 11 yet (optional, or check on submit)
            // Here we clear error if it is valid length, otherwise we can leave it empty until submit
            if (cleanNumber.length > 0 && cleanNumber.length < 11) {
                 // You can show "Invalid number" while typing if you want, 
                 // or just wait for submit. User asked for "Invalid number" under field.
                 newErrors.phone = "Invalid number"; 
            } else {
                 newErrors.phone = "";
            }
        }
    }

    // 2. About Validation (Hard Stop > 120 words)
    if (name === "about") {
        const wordCount = value.trim().split(/\s+/).filter(Boolean).length;
        const currentWordCount = formData.about.trim().split(/\s+/).filter(Boolean).length;

        // If trying to add more words beyond 120
        if (wordCount > 120 && wordCount > currentWordCount) {
             shouldUpdateState = false; // STOP TYPING
             newErrors.about = "Cross word limitation";
        } else {
             if (wordCount > 120) {
                 newErrors.about = "Cross word limitation";
             } else {
                 newErrors.about = "";
             }
        }
    }

    // 3. CV Validation (PDF Only)
    if (name === "cv" && files) {
        if (files[0] && files[0].type !== "application/pdf") {
            newErrors.cv = "Only pdf file accepted";
            e.target.value = null; // Reset input
            shouldUpdateState = false; // Don't store invalid file
        } else {
            newErrors.cv = "";
        }
    }

    setErrors(newErrors);

    // Only update form data if strict checks pass
    if (shouldUpdateState) {
        if (files) {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedJob) return;

    // Final Validation Check
    if (formData.phone.replace(/\D/g, '').length !== 11) {
        setErrors(prev => ({...prev, phone: "Invalid number"}));
        alert("Phone number must be exactly 11 digits");
        return;
    }
    if (errors.cv || errors.about) {
        alert("Please fix the errors before submitting.");
        return;
    }

    try {
      const data = new FormData();
      data.append("firstName", formData.firstName);
      data.append("lastName", formData.lastName);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("about", formData.about);
      data.append("cv", formData.cv);
      data.append("jobId", selectedJob.JobID);
      data.append("jobTitle", selectedJob.JobTitle);
      data.append("companyName", selectedJob.CompanyName);
      data.append("companyUrl", selectedJob.Company_URL);

      const res = await axios.post("http://localhost:5000/api/job/apply", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert(res.data.message);
      setShowModal(false);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        about: "",
        cv: null,
      });
      setErrors({ phone: "", about: "", cv: "" });
    } catch (err) {
      console.error(err);
      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert("Something went wrong!");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
       
      {/* --- 1. Background Banner --- */}
      <div className="bg-linear-to-r from-slate-900 to-blue-900 py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-500 opacity-10 blur-3xl"></div>
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
          <button className="hidden sm:block bg-blue-900 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transition-colors duration-200">
            Search
          </button>
        </div>
      </div>

      {/* --- 3. Job Grid --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex justify-between items-end mb-6">
           <h2 className="text-2xl font-bold text-gray-800">Latest Opportunities</h2>
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
  // We use .replace(/^\//, "") to remove the leading '/' if it exists in the DB data
  to={`/jobs/${job.Company_URL.replace(/^\//, "")}/${job.JobSlug}`} 
  className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors"
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
                  className="w-full mt-4 bg-gray-900 text-white font-medium py-2.5 rounded-lg hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- 4. Apply Modal --- */}
      {showModal && selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div 
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" 
              onClick={() => setShowModal(false)}
          ></div>
           
          <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden transform transition-all flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between text-center  ">
              <div>
                  <h2 className="text-lg font-bold text-gray-900 ">Application Form</h2>
                  <p className="text-2xl text-blue-600 font-medium ">{selectedJob.JobTitle}</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto custom-scrollbar">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    required
                  />
                </div>

                {/* --- PHONE FIELD (Strict BD 11 Digits) --- */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
                  <div className="relative">
                    {/* BD Flag & +880 */}
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <img 
                        src="https://flagcdn.com/w20/bd.png" 
                        srcSet="https://flagcdn.com/w40/bd.png 2x" 
                        width="20" 
                        alt="Bangladesh Flag" 
                      />
                      <span className="text-gray-500 pl-1 text-sm">+88</span>
                    </div>
                    
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="1XXXXXXXXX"
                      className={`w-full pl-20 px-4 py-2 border rounded-lg focus:ring-2 outline-none transition-all ${
                        errors.phone 
                          ? "border-red-500 focus:ring-red-500 focus:border-red-500" 
                          : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                      required
                    />
                  </div>
                  {/* Error Message */}
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* --- ABOUT FIELD (Strict 120 Words) --- */}
                <div>
                  <div className="flex justify-between">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">About Yourself</label>
                    <span className={`text-xs ${formData.about.trim().split(/\s+/).filter(Boolean).length >= 150 ? 'text-red-500' : 'text-gray-600'}`}>
                       {formData.about.trim().split(/\s+/).filter(Boolean).length}/150 words
                    </span>
                  </div>
                  <textarea
                    name="about"
                    value={formData.about}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none transition-all h-24 resize-none ${
                        errors.about 
                          ? "border-red-500 focus:ring-red-500 focus:border-red-500" 
                          : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                    required
                  ></textarea>
                  {/* Error Message */}
                  {errors.about && (
                    <p className="text-red-500 text-xs mt-1">{errors.about}</p>
                  )}
                </div>

                {/* --- CV FIELD (Strict PDF) --- */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Upload CV / Resume</label>
                  <input
                    type="file"
                    name="cv"
                    accept=".pdf"
                    onChange={handleChange}
                    className="block w-full text-sm text-slate-500
                      file:mr-65 file:py-2.5 file:px-4
                      file:rounded-lg file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100 cursor-pointer
                      border border-gray-200 rounded-lg"
                    required
                  />
                  {/* Static Instruction Text */}
                  <p className="text-green-800 text-xs font-semibold mt-1">Only pdf file accepted</p>
                  
                  {/* Error Message */}
                  {errors.cv && (
                     <p className="text-red-500 text-xs mt-1">{errors.cv}</p>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllJobs;