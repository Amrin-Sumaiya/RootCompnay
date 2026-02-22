import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from "../../api/axios";

const UpdateJobPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [degree, setDegree] = useState('');
  const [department, setDepartment] = useState('');

  const [form, setForm] = useState({
    JobTitle: '',
    JobDescription: '',
    JobResponsibilities: '',
    Qualifications: '',
    Skills: '',
    JobType: '',
    WeeklyVacation: [], // Array to match CreateJob logic
    Benefits: '',
    Experience: '',
    experienceFrom: '', // For dropdown sync
    experienceTo: '',   // For dropdown sync
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
    "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"
  ];

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/jobs/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });

        const jobData = res.data.data || res.data || {};

        // 1. Parse Experience (e.g., "1-3 Years" -> from: 1, to: 3)
        let expFrom = '';
        let expTo = '';
        if (jobData.Experience) {
          if (jobData.Experience === "Fresher") {
            expFrom = "Fresher";
          } else {
            const rangeMatch = jobData.Experience.match(/(\d+)-(\d+)/);
            if (rangeMatch) {
              expFrom = rangeMatch[1];
              expTo = rangeMatch[2];
            } else {
              const singleMatch = jobData.Experience.match(/(\d+)/);
              if (singleMatch) expFrom = singleMatch[1];
            }
          }
        }

        // 2. Parse Vacation (String to Array)
        let vacationArr = [];
        if (jobData.WeeklyVacation) {
          vacationArr = typeof jobData.WeeklyVacation === 'string' 
            ? jobData.WeeklyVacation.split(', ') 
            : jobData.WeeklyVacation;
        }

        // 3. Parse Qualifications
        if (jobData.Qualifications) {
          const parts = jobData.Qualifications.split(" - ");
          if (parts.length === 2) {
            setDegree(parts[0]);
            setDepartment(parts[1]);
          }
        }

        setForm(prev => ({
          ...prev,
          ...jobData,
          WeeklyVacation: vacationArr,
          experienceFrom: expFrom,
          experienceTo: expTo
        }));

      } catch (err) {
        console.error("Error fetching job:", err);
        alert('Failed to load job details');
        navigate(-1);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id, navigate]);

  // Logic from CreateJob
  const handleVacationChange = (day) => {
    const updatedDays = form.WeeklyVacation.includes(day)
      ? form.WeeklyVacation.filter(d => d !== day)
      : [...form.WeeklyVacation, day];

    setForm({ ...form, WeeklyVacation: updatedDays });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if ((name === "JobDescription" || name === "JobResponsibilities" || name === "Benefits") && value.length > 2000) return;

    // Formatting logic matching CreateJob
    if (name === "JobResponsibilities") {
      const lines = value.split("\n");
      const numberedLines = lines.map((line, index) => {
        const cleanLine = line.replace(/^\d+\.\s*/, "");
        return cleanLine.trim() === "" ? "" : `${index + 1}. ${cleanLine}`;
      });
      setForm({ ...form, [name]: numberedLines.join("\n") });
      return;
    }

    if (name === "Benefits") {
      const lines = value.split("\n");
      const bulletLines = lines.map((line) => {
        const cleanLine = line.replace(/^•\s*/, "");
        return cleanLine.trim() === "" ? "" : `• ${cleanLine}`;
      });
      setForm({ ...form, [name]: bulletLines.join("\n") });
      return;
    }

    setForm({ ...form, [name]: value });
  };

  const updateJob = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Construct Experience string matching CreateJob logic
      let experienceValue = "";
      if (form.experienceFrom === "Fresher") {
        experienceValue = "Fresher";
      } else if (form.experienceFrom && form.experienceTo) {
        experienceValue = `${form.experienceFrom}-${form.experienceTo} Years`;
      } else if (form.experienceFrom) {
        experienceValue = `${form.experienceFrom} Year${form.experienceFrom > 1 ? "s" : ""}`;
      }

      const qualificationValue = `${degree} - ${department}`;

      const updatedForm = {
        ...form,
        WeeklyVacation: form.WeeklyVacation.join(', '),
        Experience: experienceValue,
        Qualifications: qualificationValue
      };

      await api.put(`/jobs/${id}`, updatedForm, { // Check if your route is /jobs/:id or /jobs/jobs/:id
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      navigate(`/company/jobs`);
    } catch (err) {
      console.error(err);
      alert('Update failed');
    } finally {
      setSaving(false);
    }
  };

  const inputClass = "w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500 outline-none transition-all";
  const labelClass = "block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wider";
  const sectionHeaderClass = "text-lg font-bold text-gray-800 border-b pb-2 mb-4 mt-2 flex items-center gap-2";

  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="h-screen py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg overflow-hidden flex flex-col max-h-[95vh] sm:max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-blue-900 px-6 py-4 flex justify-between items-center flex-none z-10">
          <div>
            <h2 className="text-xl font-bold text-white">Update Job</h2>
            <p className="text-green-100 text-sm">Refine your job posting.</p>
          </div>
          <button type="button" onClick={() => navigate(-1)} className="text-black bg-sky-100 rounded-full py-3 px-4 text-sm font-medium underline">
            Cancel & Go Back
          </button>
        </div>

        <form onSubmit={updateJob} className="p-6 overflow-y-auto custom-scrollbar flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* LEFT COLUMN */}
            <div className="lg:col-span-8 space-y-6">
              <section>
                <h3 className={sectionHeaderClass}>📝 Job Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className={labelClass}>Job Title *</label>
                    <input name="JobTitle" value={form.JobTitle} onChange={handleChange} className={inputClass} required />
                  </div>
                  
                  <div>
                    <label className={labelClass}>Job Type</label>
                    <select name="JobType" value={form.JobType} onChange={handleChange} className={inputClass}>
                      <option value="">Select Type</option>
                      <option value="Full Time">Full Time</option>
                      <option value="Part Time">Part Time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>Experience</label>
                    <div className="flex gap-2">
                      <select name="experienceFrom" value={form.experienceFrom} onChange={handleChange} className={inputClass}>
                        <option value="">From</option>
                        <option value="Fresher">Fresher</option>
                        {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} Year{n > 1 ? 's' : ''}</option>)}
                      </select>
                      <select name="experienceTo" value={form.experienceTo} onChange={handleChange} className={inputClass}>
                        <option value="">To</option>
                        {[...Array(30)].map((_, i) => <option key={i+1} value={i+1}>{i+1} Years</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              </section>

              {/* Descriptions */}
              <section className="space-y-4">
                <div>
                  <label className={labelClass}>Job Description</label>
                  <textarea name="JobDescription" rows="3" value={form.JobDescription} onChange={handleChange} className={inputClass} maxLength={2000} />
                  <div className="text-xs text-gray-400 mt-1">{form.JobDescription.length}/2000</div>
                </div>
                
                <div>
                  <label className={labelClass}>Key Responsibilities</label>
                  <textarea name="JobResponsibilities" rows="3" value={form.JobResponsibilities} onChange={handleChange} className={inputClass} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Qualifications</label>
                    <div className="flex gap-2">
                      <select value={degree} onChange={(e) => setDegree(e.target.value)} className={inputClass}>
                        <option value="">Degree</option>
                        <option value="BSc">BSc</option><option value="MSc">MSc</option><option value="BBA">BBA</option>
                      </select>
                      <select value={department} onChange={(e) => setDepartment(e.target.value)} className={inputClass}>
                        <option value="">Dept</option>
                        <option value="Software">Software</option><option value="Marketing">Marketing</option><option value="IT">IT</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Benefits</label>
                    <textarea name="Benefits" rows="3" value={form.Benefits} onChange={handleChange} className={inputClass} />
                  </div>
                </div>
              </section>
            </div>

            {/* RIGHT COLUMN */}
            <div className="lg:col-span-4 space-y-6 bg-gray-50 p-4 rounded-lg border border-gray-100 h-fit">
              <section>
                <h3 className={sectionHeaderClass}>📍 Location</h3>
                <div className="space-y-3">
                  <select name="JobLocation" value={form.JobLocation} onChange={handleChange} className={inputClass}>
                    <option value="">Category...</option>
                    <option value="Onsite">Onsite</option><option value="Remote">Remote</option><option value="Hybrid">Hybrid</option>
                  </select>
                  <input name="Address" value={form.Address} onChange={handleChange} placeholder="Address" className={inputClass} />
                  <div className="grid grid-cols-2 gap-2">
                    <input name="City" value={form.City} onChange={handleChange} placeholder="City" className={inputClass} />
                    <input name="State" value={form.State} onChange={handleChange} placeholder="State" className={inputClass} />
                  </div>
                </div>
              </section>

              <section>
                <h3 className={sectionHeaderClass}>💰 Salary & Vacation</h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <input type="number" name="SalaryFrom" value={form.SalaryFrom} onChange={handleChange} placeholder="Min" className={inputClass} />
                    <input type="number" name="SalaryTo" value={form.SalaryTo} onChange={handleChange} placeholder="Max" className={inputClass} />
                  </div>
                  
                  <div>
                    <label className={labelClass}>Weekly Vacation</label>
                    <div className="grid grid-cols-2 gap-2 p-2 border rounded bg-white">
                      {weekDays.map((day) => (
                        <label key={day} className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={form.WeeklyVacation.includes(day)}
                            onChange={() => handleVacationChange(day)}
                            className="w-4 h-4 text-green-600 border-gray-300 rounded"
                          />
                          {day}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t flex justify-end gap-3">
            <button type="submit" disabled={saving} className="px-8 py-2.5 rounded-lg bg-green-600 text-white font-bold hover:bg-green-700 disabled:opacity-50 text-sm shadow-md">
              {saving ? 'Updating...' : 'Update Job'}
            </button>
          </div>
        </form>
      </div>
      
      <style>{`.custom-scrollbar::-webkit-scrollbar { width: 8px; } .custom-scrollbar::-webkit-scrollbar-thumb { background: #888; border-radius: 4px; }`}</style>
    </div>
  );
};

export default UpdateJobPost;