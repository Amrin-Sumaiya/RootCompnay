import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../../api/axios";

const CreateJob = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [degree, setDegree] = useState('');
  const [department, setDepartment] = useState('');

  const [form, setForm] = useState({
    JobTitle: '',
    JobDescription: '',
    JobResponsibilities: '',
    Qualifications: '',
    Skills: '',
    JobType: '',
    WeeklyVacation: [], // Now stores an array of selected vacation days
    Benefits: '',
    Experience: '',
    JobLocation: '',
    Address: '',
    Country: '',
    State: '',
    City: '',
    SalaryFrom: '',
    SalaryTo: '',
    SalaryType: 'monthly',
    Currency: 'USD'
  });

  const weekDays = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday"
  ];

  // ✅ UPDATED: Logic for Radio Button (Single Selection)
const handleVacationChange = (day) => {
  const updatedDays = form.WeeklyVacation.includes(day)
    ? form.WeeklyVacation.filter(d => d !== day) // remove if already selected
    : [...form.WeeklyVacation, day]; // add if not selected

  setForm({
    ...form,
    WeeklyVacation: updatedDays
  });
};


  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "JobDescription" && value.length > 2000) return;

    if (name === "JobResponsibilities") {
      if (value.length > 2000) return;
      const lines = value.split("\n");
      const numberedLines = lines.map((line, index) => {
        const cleanLine = line.replace(/^\d+\.\s*/, "");
        if (cleanLine.trim() === "") return "";
        return `${index + 1}. ${cleanLine}`;
      });
      setForm({ ...form, [name]: numberedLines.join("\n") });
      return;
    }

    if (name === "Benefits") {
      if (value.length > 2000) return;
      const lines = value.split("\n");
      const bulletLines = lines.map((line) => {
        const cleanLine = line.replace(/^•\s*/, "");
        if (cleanLine.trim() === "") return "";
        return `• ${cleanLine}`;
      });
      setForm({ ...form, [name]: bulletLines.join("\n") });
      return;
    }

    setForm({ ...form, [name]: value });
  };

  const submitJob = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let experienceValue = "";

      if (form.experienceFrom === "Fresher") {
        experienceValue = "Fresher";
      }
      else if (form.experienceFrom && form.experienceTo) {
        experienceValue = `${form.experienceFrom}-${form.experienceTo} Years`;
      }
      else if (form.experienceFrom) {
        experienceValue = `${form.experienceFrom} Year${form.experienceFrom > 1 ? "s" : ""}`;
      }

      const qualificationValue = `${degree} - ${department}`;

      const updatedForm = {
        ...form,
        WeeklyVacation: form.WeeklyVacation.join(', '),
        Experience: experienceValue,
        Qualifications: qualificationValue
      };

      await api.post('/jobs/jobs', updatedForm, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      navigate(`/company/jobs`);
    } catch (err) {
      console.error(err);
      alert('Job creation failed');
    } finally {
      setLoading(false);
    }
  };

  // Reusable Styling Classes
  const inputClass = "w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500 outline-none transition-all";
  const labelClass = "block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wider";
  const sectionHeaderClass = "text-lg font-bold text-gray-800 border-b pb-2 mb-4 mt-2 flex items-center gap-2";
  const isDescriptionLimitReached = form.JobDescription.length >= 2000;

  return (
    <div className="h-screen  py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-center overflow-hidden">
      
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg overflow-hidden flex flex-col max-h-[95vh] sm:max-h-[90vh]">
        
        {/* Compact Header */} 
        <div className="bg-blue-900 px-6 py-4 flex justify-between items-center flex-wrap gap-2 flex-none z-10">
          <div>
            <h2 className="text-xl font-bold text-white">Post a New Job</h2>
            <p className="text-green-100 text-sm">Find your next great hire.</p>
          </div>
          <button 
            type="button" 
            onClick={() => navigate(-1)}
            className="text-black  bg-sky-100 rounded-full py-3 px-4 hover:text-green-100 text-sm font-medium underline"
          >
            Cancel & Go Back
          </button>
        </div>

        {/* Scrollable Form Container */}
        <form onSubmit={submitJob} className="p-6 overflow-y-auto custom-scrollbar flex-1">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* LEFT COLUMN */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Basic Info */}
              <section>
                <h3 className={sectionHeaderClass}>📝 Job Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className={labelClass}>Job Title *</label>
                    <input name="JobTitle" placeholder="e.g. Senior Software Engineer" onChange={handleChange} className={inputClass} required />
                  </div>
                  
                  <div>
                    <label className={labelClass}>Job Type</label>
                    <select name="JobType" onChange={handleChange} className={inputClass}>
                      <option value="">Select Type</option>
                      <option value="Full Time">Full Time</option>
                      <option value="Part Time">Part Time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>Experience</label>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <select name="experienceFrom" onChange={handleChange} className={inputClass}>
                        <option value="">From</option>
                        <option value="Fresher">Fresher</option>
                        <option value="1">1 Year</option>
                        <option value="2">2 Years</option>
                        <option value="3">3 Years</option>
                        <option value="4">4 Years</option>
                        <option value="5">5 Years</option>
                      </select>
                      <select name="experienceTo" onChange={handleChange} className={inputClass}>
                        <option value="">To</option>
                        {[...Array(30)].map((_, index) => (
                          <option key={index + 1} value={index + 1}>{index + 1} Years</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </section>

              {/* Descriptions */}
              <section>
                <div className="space-y-4">
                  <div>
                    <label className={labelClass}>Job Description</label>
                    <textarea 
                      name="JobDescription"
                      rows="3"
                      placeholder="Overview of the role..."
                      onChange={handleChange}
                      value={form.JobDescription}
                      maxLength={2000}
                      className={`${inputClass} ${isDescriptionLimitReached ? "border-red-500 focus:ring-red-500 focus:border-red-500" : ""}`}
                    />
                    <div className={`text-xs mt-1 ${isDescriptionLimitReached ? "text-red-500 font-semibold" : "text-gray-400"}`}>
                      {form.JobDescription.length}/2000 characters
                    </div>
                  </div>
                  
                  <div>
                    <label className={labelClass}>Key Responsibilities</label>
                    <textarea
                      name="JobResponsibilities"
                      rows="3"
                      placeholder="List the daily tasks..."
                      onChange={handleChange}
                      value={form.JobResponsibilities}
                      maxLength={2000}
                      className={`${inputClass} ${form.JobResponsibilities.length >= 2000 ? "border-red-500 focus:ring-red-500 focus:border-red-500" : ""}`}
                    />
                    <div className={`text-xs mt-1 ${form.JobResponsibilities.length >= 2000 ? "text-red-500 font-semibold" : "text-gray-400"}`}>
                      {form.JobResponsibilities.length}/2000 characters
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Qualifications</label>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <select value={degree} onChange={(e) => setDegree(e.target.value)} className={inputClass}>
                          <option value="">Select Degree</option>
                          <option value="BSc">BSc</option>
                          <option value="MSc">MSc</option>
                          <option value="BBA">BBA</option>
                          <option value="MBA">MBA</option>
                          <option value="Diploma">Diploma</option>
                        </select>
                        <select value={department} onChange={(e) => setDepartment(e.target.value)} className={inputClass}>
                          <option value="">Select Department</option>
                          <option value="Software">Software</option>
                          <option value="Marketing">Marketing</option>
                          <option value="Engineering">Engineering</option>
                          <option value="Sales">Sales</option>
                          <option value="Accounting">Accounting</option>
                          <option value="Management">Management</option>
                          <option value="Human Resource">Human Resource</option>
                          <option value="IT">IT</option>
                          <option value="Customer Care">Customer Care</option>
                          <option value="Graphics">Graphics</option>
                          <option value="Others">Others</option>
                        </select>
                      </div>
                    </div>

                    <div>
                        <label className={labelClass}>Benefits</label>
                        <textarea 
                          name="Benefits"
                          rows="3"
                          placeholder="Health insurance, Paid leave..."
                          onChange={handleChange}
                          value={form.Benefits}
                          maxLength={2000}
                          className={`${inputClass} ${form.Benefits.length >= 2000 ? "border-red-500 focus:ring-red-500 focus:border-red-500" : ""}`}
                        />
                    </div>
                  </div>
                </div>
              </section>

              {/* Skills */}
              <section>
                  <label className={labelClass}>Required Skills</label>
                  <input name="Skills" placeholder="e.g. React, Node.js, Python (comma separated)" onChange={handleChange} className={inputClass} />
              </section>
            </div>

            {/* RIGHT COLUMN */}
            <div className="lg:col-span-4 space-y-6 bg-gray-50 p-4 rounded-lg border border-gray-100 h-fit">
              
              {/* Location */}
              <section>
                <h3 className={sectionHeaderClass}>📍 Location</h3>
                <div className="space-y-3">
                  <div>
                    <label className={labelClass}>Job categories</label>
                    <select name="JobLocation" onChange={handleChange} className={inputClass}>
                        <option value="">Select...</option>
                        <option value="Onsite">Onsite</option>
                        <option value="Remote">Remote</option>
                        <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Address</label>
                    <input name="Address" placeholder="1234 Main St" onChange={handleChange} className={inputClass} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className={labelClass}>City</label>
                        <input name="City" placeholder="City" onChange={handleChange} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>State</label>
                        <input name="State" placeholder="State" onChange={handleChange} className={inputClass} />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Country</label>
                    <input name="Country" placeholder="Country" onChange={handleChange} className={inputClass} />
                  </div>
                </div>
              </section>

              {/* Salary & Vacation */}
              <section>
                <h3 className={sectionHeaderClass}>💰 Salary</h3>
                <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className={labelClass}>Min</label>
                            <input type="number" name="SalaryFrom" placeholder="0" onChange={handleChange} className={inputClass} />
                        </div>
                        <div>
                            <label className={labelClass}>Max</label>
                            <input type="number" name="SalaryTo" placeholder="0" onChange={handleChange} className={inputClass} />
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={labelClass}>Currency</label>
                        <select name="Currency" value={form.Currency} onChange={handleChange} className={inputClass}>
                          <option value="USD">USD ($)</option>
                          <option value="BDT">BDT (৳)</option>
                        </select>
                      </div>
                        <div>
                            <label className={labelClass}>Frequency</label>
                            <select name="SalaryType" onChange={handleChange} className={inputClass}>
                              <option value="yearly">Yearly</option>
                              <option value="monthly">Monthly</option>
                              <option value="daily">Daily</option>
                              <option value="hourly">Hourly</option>
                            </select>
                        </div>
                    </div>
                    
                    {/* ✅ UPDATED: Weekly Vacation (Radio Buttons) */}
                    <div>
                      <label className={labelClass}>Weekly Vacation</label>
                      <div className={`${inputClass} py-3`}>
                        <div className="grid grid-cols-2 gap-3">
                          {weekDays.map((day) => (
                            <label
                              key={day}
                              className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-50 rounded px-1"
                            >
                              <input
                                type="checkbox"
                                name="vacation_day" // Ensures only one can be selected
                                value={day}
                                checked={form.WeeklyVacation.includes(day)}
                                onChange={() => handleVacationChange(day)}
                                className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500 cursor-pointer"
                              />
                              {day}
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                </div>
              </section>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="mt-8 pt-6 border-t flex justify-end gap-3">
            <button 
                type="button" 
                onClick={() => navigate(-1)}
                className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium transition-colors text-sm"
            >
                Cancel
            </button>
            <button 
                type="submit" 
                disabled={loading}
                className="px-8 py-2.5 rounded-lg bg-green-600 text-white font-bold hover:bg-green-700 focus:ring-4 focus:ring-green-200 transition-all disabled:opacity-50 text-sm shadow-md"
            >
                {loading ? 'Publishing...' : 'Publish Job'}
            </button>
          </div>

        </form>
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
};

export default CreateJob;