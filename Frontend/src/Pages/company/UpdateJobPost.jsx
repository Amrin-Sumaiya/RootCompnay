import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft, FaSave } from 'react-icons/fa';

const UpdateJobPost = () => {
  const { id, companyUrl } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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

  // 🔹 Load job data
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/company/jobs/${id}`,
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
        setForm(res.data);
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        alert('Failed to load job details');
        navigate(-1);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id, navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // 🔹 Update job
  const updateJob = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.put(
        `http://localhost:5000/api/company/jobs/${id}`,
        form,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      navigate(`/company/${companyUrl}/jobs`);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      alert('Update failed');
    } finally {
      setSaving(false);
    }
  };

  // Reusable Styling Classes
  const inputClass = "w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all";
  const labelClass = "block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wider";
  const sectionHeaderClass = "text-lg font-bold text-gray-800 border-b pb-2 mb-4 mt-2 flex items-center gap-2";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        
        {/* Header */}
        <div className="bg-indigo-600 px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
               Edit Job Details
            </h2>
            <p className="text-indigo-100 text-sm opacity-90">Update information for: {form.JobTitle}</p>
          </div>
          <button 
            onClick={() => navigate(-1)}
            className="text-white hover:bg-white/10 p-2 rounded-full transition-colors"
            title="Go Back"
          >
            <FaArrowLeft />
          </button>
        </div>

        <form onSubmit={updateJob} className="p-6">
          
          {/* GRID LAYOUT */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* LEFT COLUMN: Content (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Basic Info */}
              <section>
                <h3 className={sectionHeaderClass}>📝 Job Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className={labelClass}>Job Title</label>
                    <input name="JobTitle" value={form.JobTitle} onChange={handleChange} className={inputClass} required />
                  </div>
                  
                  <div>
                    <label className={labelClass}>Job Type</label>
                    <select name="JobType" value={form.JobType} onChange={handleChange} className={inputClass}>
                      <option value="Full Time">Full Time</option>
                      <option value="Part Time">Part Time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>

                  <div>
                     <label className={labelClass}>Experience</label>
                     <input name="Experience" value={form.Experience} onChange={handleChange} className={inputClass} />
                  </div>
                </div>
              </section>

              {/* Descriptions */}
              <section>
                <div className="space-y-4">
                  <div>
                    <label className={labelClass}>Job Description</label>
                    <textarea name="JobDescription" rows="4" value={form.JobDescription} onChange={handleChange} className={inputClass} />
                  </div>
                  
                  <div>
                    <label className={labelClass}>Key Responsibilities</label>
                    <textarea name="JobResponsibilities" rows="4" value={form.JobResponsibilities} onChange={handleChange} className={inputClass} />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className={labelClass}>Qualifications</label>
                        <textarea name="Qualifications" rows="3" value={form.Qualifications} onChange={handleChange} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Benefits</label>
                        <textarea name="Benefits" rows="3" value={form.Benefits} onChange={handleChange} className={inputClass} />
                    </div>
                  </div>
                </div>
              </section>

              <section>
                 <label className={labelClass}>Skills</label>
                 <input name="Skills" value={form.Skills} onChange={handleChange} className={inputClass} />
              </section>
            </div>

            {/* RIGHT COLUMN: Meta Info (4 cols) */}
            <div className="lg:col-span-4 space-y-6 bg-gray-50 p-5 rounded-lg border border-gray-100 h-fit">
              
              {/* Location */}
              <section>
                <h3 className={sectionHeaderClass}>📍 Location</h3>
                <div className="space-y-3">
                  <div>
                    <label className={labelClass}>Location Type</label>
                    <select name="JobLocation" value={form.JobLocation} onChange={handleChange} className={inputClass}>
                        <option value="Onsite">Onsite</option>
                        <option value="Remote">Remote</option>
                        <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>Address</label>
                    <input name="Address" value={form.Address} onChange={handleChange} className={inputClass} />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className={labelClass}>City</label>
                        <input name="City" value={form.City} onChange={handleChange} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>State</label>
                        <input name="State" value={form.State} onChange={handleChange} className={inputClass} />
                    </div>
                  </div>
                  
                  <div>
                    <label className={labelClass}>Country</label>
                    <input name="Country" value={form.Country} onChange={handleChange} className={inputClass} />
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
                            <input type="number" name="SalaryFrom" value={form.SalaryFrom} onChange={handleChange} className={inputClass} />
                        </div>
                        <div>
                            <label className={labelClass}>Max</label>
                            <input type="number" name="SalaryTo" value={form.SalaryTo} onChange={handleChange} className={inputClass} />
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className={labelClass}>Currency</label>
                            <input name="Currency" value={form.Currency} onChange={handleChange} className={inputClass} />
                        </div>
                        <div>
                            <label className={labelClass}>Frequency</label>
                            <select name="SalaryType" value={form.SalaryType} onChange={handleChange} className={inputClass}>
                                <option value="monthly">Monthly</option>
                                <option value="yearly">Yearly</option>
                                <option value="hourly">Hourly</option>
                            </select>
                        </div>
                    </div>
                    
                    <div>
                        <label className={labelClass}>Weekly Vacation</label>
                        <input name="WeeklyVacation" value={form.WeeklyVacation} onChange={handleChange} className={inputClass} />
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
                disabled={saving}
                className="flex items-center gap-2 px-8 py-2.5 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 transition-all disabled:opacity-70 disabled:cursor-not-allowed text-sm shadow-md"
            >
                {saving ? (
                    <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Saving...
                    </>
                ) : (
                    <>
                        <FaSave /> Save Changes
                    </>
                )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default UpdateJobPost;