import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateJob = () => {
  // const { companyUrl } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    JobTitle: '',
    JobDescription: '',
    JobResponsibilities: '',
    Qualifications: '',
    Skills: '',
    JobType: '',
    WeeklyVacation: '',
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitJob = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
await axios.post(
  'http://localhost:5000/api/jobs/jobs',
  form,
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }
);
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

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        
        {/* Compact Header */} 
        <div className="bg-blue-900 px-6 py-4 flex justify-between items-center flex-wrap gap-2">
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

        <form onSubmit={submitJob} className="p-6">
          
          {/* GRID LAYOUT START */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* LEFT COLUMN: Main Info (8 cols on desktop) */}
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
                     <input name="Experience" placeholder="e.g. 2-3 Years" onChange={handleChange} className={inputClass} />
                  </div>
                </div>
              </section>

              {/* Descriptions */}
              <section>
                <div className="space-y-4">
                  <div>
                    <label className={labelClass}>Job Description</label>
                    <textarea name="JobDescription" rows="3" placeholder="Overview of the role..." onChange={handleChange} className={inputClass} />
                  </div>
                  
                  <div>
                    <label className={labelClass}>Key Responsibilities</label>
                    <textarea name="JobResponsibilities" rows="3" placeholder="List the daily tasks..." onChange={handleChange} className={inputClass} />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className={labelClass}>Qualifications</label>
                        <textarea name="Qualifications" rows="3" placeholder="Required degrees..." onChange={handleChange} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Benefits</label>
                        <textarea name="Benefits" rows="3" placeholder="Health, Dental..." onChange={handleChange} className={inputClass} />
                    </div>
                  </div>
                </div>
              </section>

              {/* Skills (Full Width) */}
              <section>
                 <label className={labelClass}>Required Skills</label>
                 <input name="Skills" placeholder="e.g. React, Node.js, Python (comma separated)" onChange={handleChange} className={inputClass} />
              </section>
            </div>

            {/* RIGHT COLUMN: Meta Info (4 cols on desktop) */}
            <div className="lg:col-span-4 space-y-6 bg-gray-50 p-4 rounded-lg border border-gray-100 h-fit">
              
              {/* Location */}
              <section>
                <h3 className={sectionHeaderClass}>📍 Location</h3>
                <div className="space-y-3">
                  <div>
                    <label className={labelClass}>Location Type</label>
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

              {/* Salary */}
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
                            <input name="Currency" defaultValue="USD" onChange={handleChange} className={inputClass} />
                        </div>
                        <div>
                            <label className={labelClass}>Frequency</label>
                            <select name="SalaryType" onChange={handleChange} className={inputClass}>
                            <option value="monthly">Monthly</option>
                            <option value="yearly">Yearly</option>
                            <option value="hourly">Hourly</option>
                            </select>
                        </div>
                    </div>
                    
                    <div>
                        <label className={labelClass}>Weekly Vacation</label>
                        <input name="WeeklyVacation" placeholder="e.g. Sat-Sun" onChange={handleChange} className={inputClass} />
                    </div>
                </div>
              </section>
            </div>
          </div>
          {/* GRID LAYOUT END */}

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
    </div>
  );
};

export default CreateJob;