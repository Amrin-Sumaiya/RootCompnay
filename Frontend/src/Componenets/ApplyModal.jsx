import { useState } from "react";
import axios from "axios";

const ApplyModal = ({ isOpen, onClose, job }) => {
  // --- HOOKS MUST BE AT THE TOP ---
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    about: "",
    cv: null,
  });

  const [errors, setErrors] = useState({
    phone: "",
    about: "",
    cv: ""
  });

  // --- NOW WE CHECK IF OPEN ---
  if (!isOpen || !job) return null;

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
            // Allow typing, but show error if not exactly 11 yet
            if (cleanNumber.length > 0 && cleanNumber.length < 11) {
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

  // --- SUBMIT HANDLER ---
  const handleSubmit = async (e) => {
    e.preventDefault();

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
    
        // Use props 'job' here
        data.append("jobId", job.JobID);
        data.append("jobTitle", job.JobTitle);
        data.append("companyName", job.CompanyName);
        data.append("companyUrl", job.Company_URL);
    
        const res = await axios.post("http://localhost:5000/api/job/apply", data, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        alert(res.data.message);
        onClose(); // Close modal on success
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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose} 
      />

      <div className="relative bg-white max-w-lg w-full rounded-xl max-h-[90vh] overflow-y-auto">
        
        {/* --- HEADER WITH CLOSE BUTTON --- */}
        <div className="flex justify-between items-center p-4 sticky top-0 bg-white z-10 border-b">
            <h2 className="text-xl font-semibold">
              Apply for <span className="font-bold text-2xl text-blue-800 ">{job.JobTitle}</span>
            </h2>
            
            {/* Close Button */}
            <button 
                onClick={onClose} 
                className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-gray-100"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
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

                {/* --- PHONE FIELD (Strict BD 11 Digits & Flag Design) --- */}
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
                      placeholder="01XXXXXXXX"
                      // Restored pl-20
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
                    <span className={`text-xs ${formData.about.trim().split(/\s+/).filter(Boolean).length >= 120 ? 'text-red-500' : 'text-gray-600'}`}>
                       {formData.about.trim().split(/\s+/).filter(Boolean).length}/120 words
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
                    // Restored original file styling
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

          <button className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition-colors">
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyModal;