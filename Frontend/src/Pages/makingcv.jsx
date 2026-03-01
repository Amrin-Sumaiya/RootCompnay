import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import html2pdf from 'html2pdf.js';
import api from "../api/axios";

const DEGREE_SEQUENCE = ['PSC', 'JSC', 'SSC', 'HSC', 'BSc', 'MSc', 'PhD'];

function MakingCV() {
  const cvRef = useRef(null);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // State for raw data from APIs
  const [allSchoolData, setAllSchoolData] = useState([]);
  const [publicUniData, setPublicUniData] = useState([]);
  const [privateUniData, setPrivateUniData] = useState([]);
  
  // Selection state for Public/Private toggle
  const [uniType, setUniType] = useState('public');

  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [courseOptions, setCourseOptions] = useState([]);

 const [upazilas, setUpazilas] = useState([]);

  // Search states for institutions
  const [schoolSearchTerm, setSchoolSearchTerm] = useState('');
  const [uniSearchTerm, setUniSearchTerm] = useState('');
  const [filteredSchools, setFilteredSchools] = useState([]);
  const [filteredUnis, setFilteredUnis] = useState([]);
  const [showSchoolDropdown, setShowSchoolDropdown] = useState(false);
  const [showUniDropdown, setShowUniDropdown] = useState(false);
  const schoolDropdownRef = useRef(null);
  const uniDropdownRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: '',
    profession: '',
    address: '',
    phone: '',
    email: '',
    fatherName: '',
    motherName: '',
    division: '',
    district: '',
    upazila: '',
    education: [{ institute: '', degree: '', passingYear: '' }],
    company: '',
    jobTitle: '',
    duration: '',
    description: '',
    skills: '',
    professionalCourses: [],
    photo: null // new field for photo
  });

  //fetc h course options
  useEffect(() => {
  const fetchCourses = async () => {
    try {
      const res = await api.get('/common/professional-courses');
      setCourseOptions(res.data);
    } catch (err) {
      console.error('Failed to fetch courses', err);
    }
  };
  fetchCourses();
}, []);


  // Fetch all institution data from your provided HTTP endpoints
  

  useEffect(() => {
  const fetchInstitutions = async () => {
    try {
      const schoolRes = await api.get('/admin/schools');
      setAllSchoolData(schoolRes.data);
      setFilteredSchools(schoolRes.data);

      const uniRes = await api.get('/admin/universities');
     setPublicUniData(uniRes.data);
setPrivateUniData(uniRes.data);  // we will use this
      setFilteredUnis(uniRes.data);
    } catch (err) {
      console.error("Failed to fetch institutions", err);
    }
  };

  fetchInstitutions();
}, []);

  // Filter schools based on search term
  useEffect(() => {
    if (schoolSearchTerm.trim() === '') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFilteredSchools(allSchoolData);
    } else {
      const filtered = allSchoolData.filter(school => 
        school.name.toLowerCase().includes(schoolSearchTerm.toLowerCase())
      );
      setFilteredSchools(filtered);
    }
  }, [schoolSearchTerm, allSchoolData]);

  // Filter universities based on search term
  useEffect(() => {
    const currentUniData = uniType === 'public' ? publicUniData : privateUniData;
    if (uniSearchTerm.trim() === '') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFilteredUnis(currentUniData);
    } else {
      const filtered = currentUniData.filter(uni => 
        uni.name.toLowerCase().includes(uniSearchTerm.toLowerCase())
      );
      setFilteredUnis(filtered);
    }
  }, [uniSearchTerm, uniType, publicUniData, privateUniData]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (schoolDropdownRef.current && !schoolDropdownRef.current.contains(event.target)) {
        setShowSchoolDropdown(false);
      }
      if (uniDropdownRef.current && !uniDropdownRef.current.contains(event.target)) {
        setShowUniDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //professional course handlers
//   const handleCourseChange = (e) => {
//   const selected = Array.from(e.target.selectedOptions).map(
//     opt => opt.value
//   );

//   setFormData(prev => ({
//     ...prev,
//     professionalCourses: selected
//   }));
// };


  // Education Helpers based on your specific requirements
  function getAllowedDegrees(index) {
    if (index === 0) return DEGREE_SEQUENCE;
    const prevDegree = formData.education[index - 1]?.degree;
    const prevIndex = DEGREE_SEQUENCE.indexOf(prevDegree);
    return prevIndex >= 0 ? DEGREE_SEQUENCE.slice(prevIndex + 1) : [];
  }

const getInstitutesByDegree = (degree) => {
  if (!degree) return [];

  if (['PSC', 'JSC', 'SSC', 'HSC'].includes(degree)) {
    return allSchoolData.map(item => item.name);
  }

  if (['BSc', 'MSc', 'PhD'].includes(degree)) {
    return publicUniData.map(item => item.name);
  }

  return [];
};

  const handleEducationChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...formData.education];
    updated[index][name] = value;

    if (name === 'degree') {
      updated[index].institute = '';
    }
    setFormData(prev => ({ ...prev, education: updated }));
  };

  const handleInstituteSelect = (index, instituteName) => {
    const updated = [...formData.education];
    updated[index].institute = instituteName;
    setFormData(prev => ({ ...prev, education: updated }));
    setShowSchoolDropdown(false);
    setShowUniDropdown(false);
    setSchoolSearchTerm('');
    setUniSearchTerm('');
  };

  const addEducation = () => {
    const lastEdu = formData.education[formData.education.length - 1];
    if (!lastEdu.degree) return alert('Please select a degree first');
    
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, { institute: '', degree: '', passingYear: '' }]
    }));
  };

  const removeEducation = (index) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

//professional course
const getCourseNameById = (id) =>
  courseOptions.find(c => String(c.id) === String(id))?.name || '';


  // Helper function to format number
  const formatBDNumber = (value) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 5) return digits;
    if (digits.length <= 8) return `${digits.slice(0, 5)} ${digits.slice(5)}`;
    return `${digits.slice(0, 5)} ${digits.slice(5, 8)} ${digits.slice(8, 11)}`;
  };

  const getDivisionName = () => divisions.find(d => d.id === formData.division)?.name || '';
  const getDistrictName = () => districts.find(d => d.id === formData.district)?.name || '';
 const getUpazilaName = () => upazilas.find(u => u.id === formData.upazila)?.name || '';
  // Location Logic
useEffect(() => {
  const fetchDivisions = async () => {
    try {
      const res = await api.get('/locations/divisions');
      setDivisions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  fetchDivisions();
}, []);

useEffect(() => {
  if (formData.division) {
    api.get(`/locations/districts/${formData.division}`)
      .then(res => {
        setDistricts(res.data);
        setFormData(prev => ({ ...prev, district: '', upazila: '' }));
      })
      .catch(err => console.error(err));
  }
}, [formData.division]);

useEffect(() => {
  if (formData.district) {
    api.get(`/locations/upazilas/${formData.district}`)
      .then(res => {
        setUpazilas(res.data);
        setFormData(prev => ({ ...prev, upazila: '' }));
      })
      .catch(err => console.error(err));
  }
}, [formData.district]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const formattedValue = formatBDNumber(value);
      if (formattedValue.length <= 13) {
        setFormData(prev => ({ ...prev, [name]: formattedValue }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // photo upload handler
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = () => {
    const element = cvRef.current;
    const opt = {
      margin: 0,
      filename: 'my_cv.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  };

  const handleSave = async () => {
    try {
      await api.post('/candidate/profile', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Profile saved successfully ✅');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save profile');
    }
  };


//myprofile fetching existing profile data on component mount
useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await api.get('/candidate/profile', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (res.data) {
        setFormData(prev => ({
          ...prev,
          ...res.data
        }));
      }
    } catch (err) {
      console.error('Failed to load profile', err);
    }
  };

  fetchProfile();
}, []);

//logout section
const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  navigate("/candidateslogin", { replace: true });
};



  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 flex flex-col">
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2 ">
              <button onClick={() => navigate("/candidateslogin")} className="flex items-center gap-3 bg-gray-300 rounded-full px-4 py-2 text-sm font-medium text-slate-900 hover:text-emerald-600 transition ">← Back</button>
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">C</div>
              <h1 className="text-xl font-bold bg-linear-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">CV Builder</h1>
            </div>
            <div className="flex gap-3">
                <button
    onClick={() => navigate("/candidate/my-profile")}
    className="bg-purple-800 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-full text-sm font-medium"
  >
    👤 My Profile
  </button>
              <button onClick={handleSave} className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-full text-sm font-medium">💾 Save</button>
              <button onClick={handleDownload} className="bg-slate-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-medium">⬇ Download PDF</button>
                <button
    onClick={handleLogout}
    className="bg-rose-800 hover:bg-rose-700 text-white px-5 py-2.5 rounded-full text-sm font-medium"
  >
     Logout
  </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="grow max-w-7xl mx-auto w-full p-4 lg:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
          <div className="lg:col-span-5 pr-2 space-y-6 pb-10">
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex gap-3 items-start">
              <span className="text-xl">✍️</span>
              <div>
                <h3 className="font-bold text-blue-900 text-sm">Editor Mode</h3>
                <p className="text-blue-700 text-xs">Fill in the details below.</p>
              </div>
            </div>

            {/* Personal Details Section */}
            <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 transition hover:shadow-lg">
              <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">👤</div>
                <h2 className="text-lg font-bold text-slate-800">Personal Details</h2>
              </div>
              <div className="grid grid-cols-2 gap-5">
                {/* Photo Upload Field */}
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Candidate Photo</label>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full border-2 border-dashed border-slate-300 bg-slate-50 flex items-center justify-center overflow-hidden">
                      {formData.photo ? (
                        <img src={formData.photo} alt="preview" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-3xl text-slate-400">📷</span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current.click()}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                    >
                      Upload Photo
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handlePhotoUpload}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all duration-200" placeholder="e.g. Sultan Ahmed" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Current Profession</label>
                  <input type="text" name="profession" value={formData.profession} onChange={handleChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all duration-200" placeholder="e.g. MERN Stack Developer" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Father's Name</label>
                  <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Mother's Name</label>
                  <input type="text" name="motherName" value={formData.motherName} onChange={handleChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Mobile</label>
                  <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500 transition-all">
                    <div className="flex items-center gap-2 px-3 py-2.5 border-r border-slate-200 bg-slate-100">
                      <span className="text-lg leading-none">🇧🇩</span>
                      <span className="text-slate-400">▼</span>
                    </div>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="grow px-4 py-2.5 bg-transparent outline-none placeholder:text-slate-300"
                      placeholder="01873 920 873" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">E-mail</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Division</label>
                  <select name="division" value={formData.division} onChange={handleChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all">
                    <option value="">Select Division</option>
                    {divisions.map((div) => (<option key={div.id} value={div.id}>{div.name}</option>))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">District</label>
                  <select name="district" value={formData.district} onChange={handleChange} disabled={!formData.division} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all">
                    <option value="">Select District</option>
                    {districts.map((dis) => (<option key={dis.id} value={dis.id}>{dis.name}</option>))}
                  </select>
                </div>

<div>
  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
    Thana / Upazila
  </label>

  <select
    name="upazila"
    value={formData.upazila}
    onChange={handleChange}
    disabled={!formData.district}
    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all disabled:bg-slate-100 disabled:cursor-not-allowed"
  >
    <option value="">Select Upazila</option>
    {upazilas.map((up) => (
      <option key={up.id} value={up.id}>
        {up.name}
      </option>
    ))}
  </select>
</div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Village / Road Address</label>
                  <textarea name="address" value={formData.address} onChange={handleChange} rows="2" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all resize-none"></textarea>
                </div>
              </div>
            </section>

            {/* Education Section */}
      <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
  <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">🎓</div>
      <h2 className="text-lg font-bold text-slate-800">Education</h2>
    </div>
    <button 
      onClick={addEducation} 
      className="bg-blue-600 hover:bg-blue-700 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-sm transition-transform active:scale-95"
    >
      +
    </button>
  </div>

  <div className="space-y-6">
    {formData.education.map((edu, index) => {
      const allowedDegrees = getAllowedDegrees(index);
      const isUniDegree = ['BSc', 'MSc', 'PhD'].includes(edu.degree);
      const isSchoolDegree = ['PSC', 'JSC', 'SSC', 'HSC'].includes(edu.degree);

      return (
        <div key={index} className="relative p-5 bg-slate-50 rounded-xl border border-slate-200 transition-all hover:border-blue-200 hover:shadow-md group">
          {formData.education.length > 1 && (
            <button 
              onClick={() => removeEducation(index)} 
              className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white w-6 h-6 rounded-full text-[10px] flex items-center justify-center shadow-md z-10"
            >
              ✕
            </button>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Degree Selection */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Degree</label>
              <select 
                name="degree" 
                value={edu.degree} 
                onChange={(e) => handleEducationChange(index, e)} 
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
              >
                <option value="">Select Degree</option>
                {allowedDegrees.map(d => (<option key={d} value={d}>{d}</option>))}
              </select>
            </div>

            {/* Passing Year */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Passing Year</label>
              <input 
                type="text" 
                name="passingYear" 
                placeholder="YYYY"
                value={edu.passingYear} 
                onChange={(e) => handleEducationChange(index, e)} 
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm" 
              />
            </div>

            {/* University Type Toggle (Conditional) */}
            {isUniDegree && (
              <div className="md:col-span-2">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">University Type</label>
                <div className="flex gap-2 p-1.5 bg-white border border-slate-200 rounded-lg w-fit">
                  <button
                    type="button"
                    onClick={() => { setUniType('public'); setUniSearchTerm(''); setFilteredUnis(publicUniData); handleEducationChange(index, {target: {name: 'institute', value: ''}}); }}
                    className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${uniType === 'public' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
                  >
                    Public
                  </button>
                  <button
                    type="button"
                    onClick={() => { setUniType('private'); setUniSearchTerm(''); setFilteredUnis(privateUniData); handleEducationChange(index, {target: {name: 'institute', value: ''}}); }}
                    className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${uniType === 'private' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
                  >
                    Private
                  </button>
                </div>
              </div>
            )}

            {/* Institute Selection with Search */}
            <div className="md:col-span-2" ref={isSchoolDegree ? schoolDropdownRef : isUniDegree ? uniDropdownRef : null}>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Institute</label>
              
              {isSchoolDegree && (
                <div className="relative">
                  <input
                    type="text"
                    value={edu.institute || schoolSearchTerm}
                    onChange={(e) => {
                      setSchoolSearchTerm(e.target.value);
                      setShowSchoolDropdown(true);
                    }}
                    onFocus={() => setShowSchoolDropdown(true)}
                    disabled={!edu.degree}
                    placeholder="Search school/college..."
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm ${!edu.degree ? 'bg-slate-100 cursor-not-allowed border-slate-200' : 'bg-white border-slate-200'}`}
                  />
                  {showSchoolDropdown && edu.degree && (
                    <div className="absolute z-20 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {filteredSchools.length > 0 ? (
                        filteredSchools.map((school, i) => (
                          <div
                            key={i}
                            onClick={() => handleInstituteSelect(index, school.name)}
                            className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm border-b border-slate-100 last:border-b-0"
                          >
                            {school.name}
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-3 text-sm text-slate-500">No institutes found</div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {isUniDegree && (
                <div className="relative">
                  <input
                    type="text"
                    value={edu.institute || uniSearchTerm}
                    onChange={(e) => {
                      setUniSearchTerm(e.target.value);
                      setShowUniDropdown(true);
                    }}
                    onFocus={() => setShowUniDropdown(true)}
                    disabled={!edu.degree}
                    placeholder="Search university..."
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm ${!edu.degree ? 'bg-slate-100 cursor-not-allowed border-slate-200' : 'bg-white border-slate-200'}`}
                  />
                  {showUniDropdown && edu.degree && (
                    <div className="absolute z-20 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {filteredUnis.length > 0 ? (
                        filteredUnis.map((uni, i) => (
                          <div
                            key={i}
                            onClick={() => handleInstituteSelect(index, uni.name)}
                            className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm border-b border-slate-100 last:border-b-0"
                          >
                            {uni.name}
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-3 text-sm text-slate-500">No universities found</div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {!isSchoolDegree && !isUniDegree && (
                <select 
                  name="institute" 
                  value={edu.institute} 
                  disabled={!edu.degree} 
                  onChange={(e) => handleEducationChange(index, e)} 
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm ${!edu.degree ? 'bg-slate-100 cursor-not-allowed border-slate-200' : 'bg-white border-slate-200'}`}
                >
                  <option value="">Select Institute</option>
                  {getInstitutesByDegree(edu.degree).map((name, i) => (<option key={i} value={name}>{name}</option>))}
                </select>
              )}
            </div>
          </div>
        </div>
      );
    })}
  </div>
</section>

            {/* Experience Section */}
            <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">💼</div>
                <h2 className="text-lg font-bold text-slate-800">Experience</h2>
              </div>
              <div className="space-y-5">
                <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Company Name" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg" />
                <div className="grid grid-cols-2 gap-5">
                  <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} placeholder="Job Title" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg" />
                  <input type="text" name="duration" value={formData.duration} onChange={handleChange} placeholder="Duration" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg" />
                </div>
                <textarea name="description" value={formData.description} onChange={handleChange} rows="4" placeholder="Description" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg resize-none"></textarea>
              </div>
            </section>

            {/* Skills Section */}
            <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">⚡</div>
                <h2 className="text-lg font-bold text-slate-800">Skills</h2>
              </div>
              <textarea name="skills" value={formData.skills} onChange={handleChange} rows="3" placeholder="React, Node.js, Photoshop..." className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg"></textarea>
            </section>

            {/* Professional Course Section */}
{/* Professional Course Section */}
<section className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
  <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">🎯</div>
    <h2 className="text-lg font-bold text-slate-800">Professional Courses</h2>
  </div>

  {/* NEW: Professional Toggle Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-2 custom-scrollbar">
    {courseOptions.map((course) => {
      const isSelected = formData.professionalCourses.includes(String(course.id));
      return (
        <button
          key={course.id}
          onClick={() => {
            const idStr = String(course.id);
            setFormData(prev => ({
              ...prev,
              professionalCourses: isSelected
                ? prev.professionalCourses.filter(id => id !== idStr)
                : [...prev.professionalCourses, idStr]
            }));
          }}
          className={`flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all duration-200 text-left ${
            isSelected 
              ? "border-emerald-500 bg-emerald-50 text-emerald-900 shadow-sm" 
              : "border-slate-100 bg-slate-50 text-slate-600 hover:border-slate-300"
          }`}
        >
          <span className="text-xs font-bold uppercase tracking-tight">{course.name}</span>
          <div className={`w-5 h-5 rounded-full flex items-center justify-center border-2 transition-colors ${
            isSelected ? "bg-emerald-500 border-emerald-500" : "bg-white border-slate-200"
          }`}>
            {isSelected && (
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
        </button>
      );
    })}
  </div>
  
  <p className="text-[10px] text-slate-400 mt-4 italic">
    Click on the certificates you have earned to include them in your CV.
  </p>
</section>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-7 bg-slate-800 rounded-3xl overflow-hidden flex flex-col shadow-inner h-fit sticky top-20">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            <div className="bg-slate-900/50 backdrop-blur-sm p-3 flex justify-between items-center text-slate-400 text-xs px-6 border-b border-slate-700/50 z-10">
              <span className="font-mono">LIVE PREVIEW</span>
              <span className="bg-slate-700 px-2 py-0.5 rounded text-white">A4 Size</span>
            </div>
            <div className="grow overflow-y-auto p-8 flex justify-center items-start z-10">
              <div ref={cvRef} className="bg-[#ffffff] w-[210mm] min-h-[297mm] shadow-[0_0_50px_rgba(0,0,0,0.25)] p-10 text-[#333333] transform scale-95 origin-top lg:scale-100 transition-transform">
                <div className="border-b-2 border-[#333333] pb-6 mb-8 flex flex-row justify-between items-start">
                  <div className="flex-1">
                    <h1 className="text-5xl font-extrabold  tracking-tight mb-2 text-[#000000] leading-tight">{formData.fullName || 'YOUR NAME'}</h1>
                    <p className="text-2xl text-[#1029b9] font-medium tracking-wide">{formData.profession || 'Professional Title'}</p>
                    <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm text-[#555555]">
                      {formData.phone && <span className="flex items-center gap-1">📞 {formData.phone}</span>}
                      {formData.email && <span className="flex items-center gap-1">📧 {formData.email}</span>}
{(formData.upazila || formData.district || formData.division) && (
  <span className="flex items-center gap-1">
    📍 
    {formData.address && `${formData.address}, `}
    {getUpazilaName() && `${getUpazilaName()}, `}
    {getDistrictName() && `${getDistrictName()}, `}
    {getDivisionName()}
  </span>
)}
                    </div>
                  </div>
                  {/* Candidate Photo in Preview */}
                  <div className="ml-6 w-38 h-38 rounded-full border-4 border-black overflow-hidden bg-slate-100 flex-shrink-0">
                    {formData.photo ? (
                      <img src={formData.photo} alt="candidate" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl text-slate-400">📷</div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-10">
                  <div className="col-span-8 space-y-10">
                    <div>
                      <h3 className="text-lg font-bold uppercase border-b-2 border-[#e5e5e5] pb-2 mb-5 text-[#000000] tracking-wider">Experience</h3>
                      {formData.company ? (
                        <div className="mb-6 group">
                          <div className="flex justify-between items-baseline mb-1">
                            <h4 className="font-bold text-xl text-[#000000]">{formData.jobTitle}</h4>
                            <span className="text-[#1037b9] font-bold text-xs bg-[#ecfdf5] px-2 py-1 rounded">{formData.duration}</span>
                          </div>
                          <div className="text-[#666666] font-semibold text-sm mb-3">{formData.company}</div>
                          <p className="text-[#444444] leading-relaxed text-sm whitespace-pre-wrap text-justify">{formData.description}</p>
                        </div>
                      ) : (
                        <div className="p-4 border border-dashed border-[#cccccc] rounded bg-[#f9f9f9] text-[#aaaaaa] italic text-sm text-center">Experience details...</div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold uppercase border-b-2 border-[#e5e5e5] pb-2 mb-5 text-[#000000] tracking-wider">Education</h3>
                      {formData.education.some(e => e.institute) ? (
                        formData.education.map((edu, i) => (
                          <div key={i} className="flex flex-col gap-1 mb-4">
                            <h4 className="font-bold text-lg text-[#000000]">{edu.degree}</h4>
                            <p className="text-[#333333] font-medium text-base">{edu.institute}</p>
                            <p className="text-sm text-[#666666]">Graduated: {edu.passingYear}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-[#aaaaaa] italic text-sm">Add education details...</p>
                      )}
                    </div>
                  </div>

                  <div className="col-span-4 flex flex-col gap-8">
                    <div className="bg-[#f8fafc] p-5 rounded-xl border border-[#e2e8f0]">
                      <h3 className="text-sm font-bold uppercase border-b-2 border-[#10b981] pb-2 mb-4 text-[#000000] tracking-wide">Personal Info</h3>
                      <div className="space-y-4 text-sm">
                        <div>
                          <span className="block font-bold text-[#94a3b8] text-[10px] uppercase mb-1">Father's Name</span>
                          <span className="text-[#1e293b] font-semibold">{formData.fatherName || '-'}</span>
                        </div>
                        <div>
                          <span className="block font-bold text-[#94a3b8] text-[10px] uppercase mb-1">Mother's Name</span>
                          <span className="text-[#1e293b] font-semibold">{formData.motherName || '-'}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold uppercase border-b-2 border-[#10b981] pb-2 mb-4 text-[#000000] tracking-wide">Expertise</h3>
                      <div className="flex flex-wrap gap-2">
                        {formData.skills ? formData.skills.split(',').map((skill, i) => (
                          <span key={i} className="bg-[#d1fae5] text-[#065f46] px-3 py-1.5 rounded-lg text-xs font-bold border border-[#a7f3d0]">{skill.trim()}</span>
                        )) : (<span className="text-[#aaaaaa] text-sm italic">No skills yet</span>)}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold uppercase border-b-2 border-[#10b981] pb-2 mb-4 text-[#000000] tracking-wide">Professional Course</h3>
                      <div className="flex flex-wrap gap-2">
{formData.professionalCourses.map((courseId, i) => (
  <span
    key={i}
    className="bg-[#eff6ff] text-[#1e40af] px-3 py-1.5 rounded-lg text-xs font-bold border border-[#dbeafe]"
  >
    {getCourseNameById(courseId)}
  </span>
))}


                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MakingCV;