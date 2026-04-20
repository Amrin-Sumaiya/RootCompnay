import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../../api/axios";
import { toast } from 'react-toastify';
import axios from 'axios';

const CreateJob = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [degree, setDegree] = useState('');
  const [department, setDepartment] = useState('');
  const [universities, setUniversities] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState([]); 
  const [universityType, setUniversityType] = useState('');
  const [countries, setCountries] = useState([]);

  const [form, setForm] = useState({
    JobTitle: '',
    JobDescription: '',
    JobResponsibilities: '',
    Qualifications: '',
    Skills: '',
    JobType: '',
    WeeklyVacation: [],
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

  useEffect(() => {
  const fetchCompany = async () => {
    try {
      const res = await api.get('/company/dashboard', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      setForm(prev => ({
        ...prev,
        Address: res.data.Address || '',
        City: res.data.City || '',
        State: res.data.State || ''
      }));

    } catch (err) {
      console.error(err);
    }
  };

  fetchCompany();
}, []);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const res = await api.get('/admin/universities');
        setUniversities(res.data);
      } catch (err) {
        console.error("Error fetching universities:", err);
      }
    };
    fetchUniversities();
  }, []);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all?fields=name");
        const sortedCountries = response.data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        setCountries(sortedCountries);
      } catch (err) {
        console.error("Error fetching countries:", err);
      }
    };
    fetchCountries();
  }, []);

  const handleUniversitySelect = (uniName) => {
    if (!uniName) return;
    setSelectedUniversity(prev =>
      prev.includes(uniName)
        ? prev.filter(u => u !== uniName)
        : [...prev, uniName]
    );
  };

  const weekDays = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  // UPDATED: Limit to 2 days
  const handleVacationChange = (day) => {
    const isAlreadySelected = form.WeeklyVacation.includes(day);

    if (!isAlreadySelected && form.WeeklyVacation.length >= 2) {
      toast.warning("Maximum 2 vacation days allowed");
      return;
    }

    const updatedDays = isAlreadySelected
      ? form.WeeklyVacation.filter(d => d !== day)
      : [...form.WeeklyVacation, day];

    setForm({ ...form, WeeklyVacation: updatedDays });
  };

  const toRoman = (num) => {
    const roman = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
    return roman[num - 1] || num;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "JobDescription" || name === "JobResponsibilities" || name === "Benefits") {
      if (value.length > 2000) return;
      const lines = value.split("\n");
      const formattedLines = lines.map((line, index) => {
        const regex = name === "Benefits" ? /^(•|\d+\.|[IVXLC]+\.)\s*/ : /^[IVXLC\d]+\.\s*/;
        const cleanLine = line.replace(regex, "");
        if (cleanLine.trim() === "") return "";
        return `${toRoman(index + 1)}. ${cleanLine}`;
      });
      setForm({ ...form, [name]: formattedLines.join("\n") });
      return;
    }
    setForm({ ...form, [name]: value });
  };


  const validateForm = () => {
  const requiredFields = [
    { key: "JobTitle", label: "Job Title" },
    { key: "JobDescription", label: "Job Description" },
    { key: "JobType", label: "Job Type" },
    { key: "Skills", label: "Skills" },
    { key: "JobLocation", label: "Job Location" },
    { key: "Country", label: "Country" },
    { key: "SalaryFrom", label: "Minimum Salary" },
    { key: "SalaryTo", label: "Maximum Salary" }
  ];

  for (let field of requiredFields) {
    if (!form[field.key] || form[field.key].toString().trim() === "") {
      toast.error(`${field.label} is required`);
      return false;
    }
  }

  // Extra validations
  if (form.WeeklyVacation.length === 0) {
    toast.error("Please select at least one weekly vacation day");
    return false;
  }

  if (!degree || !department) {
    toast.error("Please complete qualifications (degree & department)");
    return false;
  }

  return true;
};
  

  const submitJob = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
     if (!validateForm()) {
  setLoading(false);
  return;
} 

      let experienceValue = "";
      if (form.experienceFrom === "Fresher") {
        experienceValue = "Fresher";
      } else if (form.experienceFrom && form.experienceTo) {
        experienceValue = `${form.experienceFrom}-${form.experienceTo} Years`;
      } else if (form.experienceFrom) {
        experienceValue = `${form.experienceFrom} Year${form.experienceFrom > 1 ? "s" : ""}`;
      }

      const qualificationValue = [
        degree,
        department,
        selectedUniversity.join(", "),
        universityType
      ].filter(Boolean).join(" - ");

      const updatedForm = {
        ...form,
        WeeklyVacation: form.WeeklyVacation.join(', '),
        Experience: experienceValue,
        Qualifications: qualificationValue
      };

      await api.post('/jobs/jobs', updatedForm, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      toast.success("Job created successfully 🎉");
      navigate(`/company/jobs`);
    } catch (err) {
      const message = err.response?.data?.message || "Job creation failed";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500 outline-none transition-all";
  const labelClass = "block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wider";
  const sectionHeaderClass = "text-lg font-bold text-gray-800 border-b pb-2 mb-4 mt-2 flex items-center gap-2";

  return (
    <div className="h-screen py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg overflow-hidden flex flex-col max-h-[95vh] sm:max-h-[90vh]">

        <div className="bg-blue-900 px-6 py-4 flex justify-between items-center flex-wrap gap-2 flex-none z-10">
          <div>
            <h2 className="text-xl font-bold text-white">Post a New Job</h2>
            <p className="text-green-100 text-sm">Find your next great hire.</p>
          </div>
          <button type="button" onClick={() => navigate(-1)} className="text-black bg-sky-100 rounded-full py-3 px-4 hover:text-green-100 text-sm font-medium underline">
            Cancel & Go Back
          </button>
        </div>

        <form onSubmit={submitJob} className="p-6 overflow-y-auto custom-scrollbar flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            <div className="lg:col-span-8 space-y-6">
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
                    <div className="flex gap-2">
                      <select name="experienceFrom" onChange={handleChange} className={inputClass}>
                        <option value="">From</option>
                        <option value="Fresher">Fresher</option>
                        {[1, 2, 3, 4, 5].map(v => <option key={v} value={v}>{v} Year{v > 1 ? 's' : ''}</option>)}
                      </select>
                      <select name="experienceTo" onChange={handleChange} className={inputClass}>
                        <option value="">To</option>
                        {[...Array(30)].map((_, i) => <option key={i + 1} value={i + 1}>{i + 1} Years</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <div>
                  <label className={labelClass}>Job Description</label>
                  <textarea name="JobDescription" rows="3" onChange={handleChange} value={form.JobDescription} maxLength={2000} className={inputClass} />
                </div>

                <div>
                  <label className={labelClass}>Key Responsibilities</label>
                  <textarea name="JobResponsibilities" rows="3" onChange={handleChange} value={form.JobResponsibilities} maxLength={2000} className={inputClass} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className={labelClass}>Qualifications</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <select value={degree} onChange={(e) => setDegree(e.target.value)} className={inputClass}>
                        <option value="">Select Degree</option>
                        <option value="BA">BA</option><option value="BBA">BBA</option><option value="BCom">BCom</option>
                        <option value="BSc">BSc</option><option value="BTech">BTech</option><option value="Associate Degree">Associate Degree</option>
                        <option value="MA">MA</option><option value="MBA">MBA</option><option value="MCom">MCom</option>
                        <option value="MSc">MSc</option><option value="MTech">MTech</option><option value="PGD">PGD</option>
                        <option value="PhD">PhD</option><option value="DBA">DBA</option><option value="EdD">EdD</option>
                        <option value="MD">MD</option><option value="Diploma">Diploma</option>
                      </select>

                      <select value={department} onChange={(e) => setDepartment(e.target.value)} className={inputClass}>
                        <option value="">Select Dept</option>
                        <option value="Software">Software</option><option value="Marketing">Marketing</option>
                        <option value="Engineering">Engineering</option><option value="Sales">Sales</option>
                        <option value="Accounting">Accounting</option><option value="Management">Management</option>
                        <option value="Human Resource">Human Resource</option><option value="IT">IT</option>
                        <option value="Customer Care">Customer Care</option><option value="Graphics">Graphics</option>
                        <option value="Others">Others</option>
                      </select>

                      <div className="space-y-2">
                        <select
                          value=""
                          onChange={(e) => handleUniversitySelect(e.target.value)}
                          className={inputClass}
                        >
                          <option value="">Select Universities (Multiple)</option>
                          {universities.map((uni) => (
                            <option key={uni.id} value={uni.name}>
                              {uni.name}
                            </option>
                          ))}
                        </select>
                        <div className="flex flex-wrap gap-1">
                          {selectedUniversity.map(uni => (
                            <span key={uni} className="bg-blue-100 text-blue-700 text-[10px] px-2 py-1 rounded-full flex items-center gap-1">
                              {uni}
                              <button type="button" onClick={() => handleUniversitySelect(uni)} className="font-bold hover:text-red-500">×</button>
                            </span>
                          ))}
                        </div>
                      </div>

                      <select value={universityType} onChange={(e) => setUniversityType(e.target.value)} className={inputClass}>
                        <option value="">University Type</option>
                        <option value="Public">Public</option>
                        <option value="Private">Private</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className={labelClass}>Benefits</label>
                    <textarea name="Benefits" rows="3" onChange={handleChange} value={form.Benefits} maxLength={2000} className={inputClass} />
                  </div>
                </div>
              </section>

              <section>
                <label className={labelClass}>Required Skills</label>
                <input name="Skills" placeholder="e.g. React, Node.js" onChange={handleChange} className={inputClass} />
              </section>
            </div>

            <div className="lg:col-span-4 space-y-6 bg-gray-50 p-4 rounded-lg border border-gray-100 h-fit">
              <section>
                <h3 className={sectionHeaderClass}>📍 Location</h3>
                <div className="space-y-3">
                  <div>
                    <label className={labelClass}>Job categories</label>
                    <select name="JobLocation" onChange={handleChange} className={inputClass}>
                      <option value="">Select...</option>
                      <option value="Onsite">Onsite / in office</option><option value="Remote">Remote</option><option value="Hybrid">Hybrid</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Country</label>
                    <select name="Country" onChange={handleChange} value={form.Country} className={inputClass}>
                      <option value="">Select Country</option>
                      {countries.map((c, index) => (
                        <option key={index} value={c.name.common}>
                          {c.name.common}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Address</label>
<input 
  name="Address"
  value={form.Address}
  onChange={handleChange}
  className={inputClass}
/>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
<input 
  name="City"
  value={form.City}
  onChange={handleChange}
  className={inputClass}
/>

<input 
  name="State"
  value={form.State}
  onChange={handleChange}
  className={inputClass}
/>
                  </div>
                </div>
              </section>

              <section>
                <h3 className={sectionHeaderClass}>💰 Salary</h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input type="number" name="SalaryFrom" placeholder="Min" onChange={handleChange} className={inputClass} />
                    <input type="number" name="SalaryTo" placeholder="Max" onChange={handleChange} className={inputClass} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <select name="Currency" value={form.Currency} onChange={handleChange} className={inputClass}>
                      <option value="USD">USD ($)</option><option value="BDT">BDT (৳)</option>
                    </select>
                    <select name="SalaryType" onChange={handleChange} className={inputClass}>
                      <option value="monthly">Monthly</option><option value="yearly">Yearly</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Weekly Vacation</label>
                    <div className={`${inputClass} py-3`}>
                      <div className="grid grid-cols-2 gap-3">
                        {weekDays.map((day) => (
                          <label key={day} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                            <input 
                              type="checkbox" 
                              checked={form.WeeklyVacation.includes(day)} 
                              onChange={() => handleVacationChange(day)} 
                              className="w-4 h-4 text-green-600" 
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

          <div className="mt-8 pt-6 border-t flex justify-end gap-3">
            <button type="button" onClick={() => navigate(-1)} className="px-5 py-2.5 rounded-lg border border-gray-300 text-sm">Cancel</button>
            <button type="submit" disabled={loading} className="px-8 py-2.5 rounded-lg bg-green-600 text-white font-bold text-sm shadow-md">
              {loading ? 'Publishing...' : 'Publish Job'}
            </button>
          </div>
        </form>
      </div>
      <style>{`.custom-scrollbar::-webkit-scrollbar { width: 8px; } .custom-scrollbar::-webkit-scrollbar-thumb { background: #888; border-radius: 4px; }`}</style>
    </div>
  );
};

export default CreateJob;