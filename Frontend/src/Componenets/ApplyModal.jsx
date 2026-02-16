import { useState } from "react";
import api from "../api/axios";

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
// 1. Phone Validation (Bangladesh Format)
if (name === "phone") {
    const cleanNumber = value.replace(/\D/g, '');

    // Stop if more than 11 digits
    if (cleanNumber.length > 11) {
        shouldUpdateState = false;
        newErrors.phone = "Phone number must be 11 digits";
    } else {
        // Check BD format only when 11 digits entered
        if (cleanNumber.length === 11) {
            const bdRegex = /^01[3-9]\d{8}$/;

            if (!bdRegex.test(cleanNumber)) {
                newErrors.phone = "Invalid Bangladesh mobile number";
            } else {
                newErrors.phone = "";
            }
        } else if (cleanNumber.length > 0) {
            newErrors.phone = "Phone number must be 11 digits";
        } else {
            newErrors.phone = "";
        }
    }
}


    // 2. About Validation (Hard Stop > 120 words)
    if (name === "about") {
        const wordCount = value.trim().split(/\s+/).filter(Boolean).length;
        const currentWordCount = formData.about.trim().split(/\s+/).filter(Boolean).length;

        if (wordCount > 120 && wordCount > currentWordCount) {
             shouldUpdateState = false; 
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
            e.target.value = null; 
            shouldUpdateState = false; 
        } else {
            newErrors.cv = "";
        }
    }

    setErrors(newErrors);

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

// Bangladesh phone validation
const cleanPhone = formData.phone.replace(/\D/g, '');
const bdRegex = /^01[3-9]\d{8}$/;

if (!bdRegex.test(cleanPhone)) {
    setErrors(prev => ({ ...prev, phone: "Invalid Bangladesh mobile number" }));
    alert("Please enter a valid Bangladesh mobile number (01XXXXXXXXX)");
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
        data.append("jobId", job.JobID);
        data.append("jobTitle", job.JobTitle);
        data.append("companyName", job.CompanyName);
        data.append("companyUrl", job.Company_URL);
    
        const res = await api.post("/job/apply", data, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        alert(res.data.message);
        onClose(); 
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white max-w-lg w-full rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col">
        
        {/* --- HEADER --- */}
        <div className="flex justify-between items-center p-5 border-b bg-gray-50/50">
            <h2 className="text-lg font-semibold text-gray-800">
              Apply for <span className="text-blue-700 font-bold">{job.JobTitle}</span>
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto">
            
            {/* --- PHONE FIELD (NOW AT TOP) --- */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Phone Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none border-r border-gray-200 pr-2 my-2">
                  <img 
                    src="https://flagcdn.com/w20/bd.png" 
                    srcSet="https://flagcdn.com/w40/bd.png 2x" 
                    width="20" 
                    alt="Bangladesh Flag" 
                  />
                  <span className="text-gray-500 pl-2 text-sm font-medium">+88</span>
                </div>
                
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="01XXXXXXXX"
                  className={`w-full pl-24 px-4 py-2.5 border rounded-lg focus:ring-2 outline-none transition-all ${
                    errors.phone 
                      ? "border-red-500 focus:ring-red-100" 
                      : "border-gray-300 focus:ring-blue-100 focus:border-blue-500"
                  }`}
                  required
                />
              </div>
              {errors.phone && <p className="text-red-500 text-xs mt-1 font-medium">{errors.phone}</p>}
            </div>

            {/* --- NAME FIELDS --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
                  required
                />
              </div>
            </div>

            {/* --- EMAIL --- */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
                required
              />
            </div>

            {/* --- ABOUT --- */}
            <div>
              <div className="flex justify-between mb-1">
                <label className="block text-sm font-semibold text-gray-700">About Yourself</label>
                <span className={`text-xs font-medium ${formData.about.trim().split(/\s+/).filter(Boolean).length >= 120 ? 'text-red-500' : 'text-gray-400'}`}>
                   {formData.about.trim().split(/\s+/).filter(Boolean).length}/120 words
                </span>
              </div>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none transition-all h-28 resize-none ${
                    errors.about 
                      ? "border-red-500 focus:ring-red-100" 
                      : "border-gray-300 focus:ring-blue-100 focus:border-blue-500"
                  }`}
                required
              ></textarea>
              {errors.about && <p className="text-red-500 text-xs mt-1 font-medium">{errors.about}</p>}
            </div>

            {/* --- CV FIELD --- */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Upload CV / Resume</label>
              <input
                type="file"
                name="cv"
                accept=".pdf"
                onChange={handleChange}
                className="block w-full text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-bold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100 cursor-pointer"
                required
              />
              <p className="text-emerald-700 text-[11px] font-bold mt-2 uppercase tracking-tight">Only PDF file accepted</p>
              {errors.cv && <p className="text-red-500 text-xs mt-1 font-medium">{errors.cv}</p>}
            </div>

          <button className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-[0.99]">
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyModal;