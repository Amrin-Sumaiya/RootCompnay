import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import html2pdf from 'html2pdf.js';

const MakingCV = () => {
  const cvRef = useRef(null);
   const navigate = useNavigate();

  const [formData, setFormData] = useState({
    // Personal
    fullName: '',
    profession: '',
    address: '',
    phone: '',
    email: '',
    fatherName: '',
    motherName: '',
    
    // Education
    degree: '',
    university: '',
    passingYear: '',
    cgpa: '',

    // Experience
    company: '',
    jobTitle: '',
    duration: '',
    description: '',

    // Skills
    skills: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDownload = () => {
    const element = cvRef.current;
    const opt = {
      margin:       0,
      filename:     'my_cv.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true }, 
      jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };
  const handleBack = () => {
  navigate("/candidateslogin");
};


  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 flex flex-col">
      
      {/* --- Navbar (Glassmorphism) --- */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2 ">

                <button
    onClick={handleBack}
    className="flex items-center gap-3 bg-gray-300  rounded-full px-4 py-2 text-sm font-medium text-slate-900 hover:text-emerald-600 transition "
  >
    ← Back
  </button>
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">C</div>
              <h1 className="text-xl font-bold bg-linear-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                CV Builder
              </h1>
            </div>
            <button 
              onClick={handleDownload}
              className="group bg-slate-900 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 shadow-lg shadow-slate-900/20 hover:shadow-emerald-600/30 flex items-center gap-2"
            >
              <span className="group-hover:-translate-y-0.5 transition-transform duration-200">⬇</span> 
              Download PDF
            </button>
          </div>
        </div>
      </nav>

      <main className="grow max-w-7xl mx-auto w-full p-4 lg:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
          
          {/* --- LEFT SIDE: EDITOR (Scrollable Dashboard) --- */}
          <div className="lg:col-span-5 h-[calc(100vh-140px)] overflow-y-auto pr-2 custom-scrollbar space-y-6 pb-10">
            
            {/* Instruction Banner */}
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex gap-3 items-start">
              <span className="text-xl">✍️</span>
              <div>
                <h3 className="font-bold text-blue-900 text-sm">Editor Mode</h3>
                <p className="text-blue-700 text-xs">Fill in the details below. The preview on the right updates automatically.</p>
              </div>
            </div>

            {/* Personal Details Card */}
            <section className="bg-white p-6 rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-slate-100 transition hover:shadow-lg">
              <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">👤</div>
                <h2 className="text-lg font-bold text-slate-800">Personal Details</h2>
              </div>
              
              <div className="grid grid-cols-2 gap-5">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} 
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all duration-200 placeholder:text-slate-400 font-medium" 
                    placeholder="e.g. Sultan Ahmed" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Current Profession</label>
                  <input type="text" name="profession" value={formData.profession} onChange={handleChange} 
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all duration-200" 
                    placeholder="e.g. MERN Stack Developer" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Father's Name</label>
                  <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} 
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Mother's Name</label>
                  <input type="text" name="motherName" value={formData.motherName} onChange={handleChange} 
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Phone</label>
                  <input type="text" name="phone" value={formData.phone} onChange={handleChange} 
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} 
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Address</label>
                  <textarea name="address" value={formData.address} onChange={handleChange} rows="2"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all resize-none"></textarea>
                </div>
              </div>
            </section>

            {/* Education Card */}
            <section className="bg-white p-6 rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-slate-100 transition hover:shadow-lg">
              <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">🎓</div>
                <h2 className="text-lg font-bold text-slate-800">Education</h2>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Institute / University</label>
                  <input type="text" name="university" value={formData.university} onChange={handleChange} 
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Degree</label>
                  <input type="text" name="degree" value={formData.degree} onChange={handleChange} 
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Passing Year</label>
                  <input type="text" name="passingYear" value={formData.passingYear} onChange={handleChange} 
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all" />
                </div>
              </div>
            </section>

            {/* Experience Card */}
            <section className="bg-white p-6 rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-slate-100 transition hover:shadow-lg">
              <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">💼</div>
                <h2 className="text-lg font-bold text-slate-800">Experience</h2>
              </div>
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Company Name</label>
                  <input type="text" name="company" value={formData.company} onChange={handleChange} 
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all" />
                </div>
                <div className="grid grid-cols-2 gap-5">
                    <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Job Title</label>
                    <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} 
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all" />
                    </div>
                    <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Duration</label>
                    <input type="text" name="duration" value={formData.duration} onChange={handleChange} 
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all" />
                    </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Job Description</label>
                  <textarea name="description" value={formData.description} onChange={handleChange} rows="4"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all resize-none"></textarea>
                </div>
              </div>
            </section>

             {/* Skills Card */}
             <section className="bg-white p-6 rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-slate-100 transition hover:shadow-lg">
              <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">⚡</div>
                <h2 className="text-lg font-bold text-slate-800">Skills</h2>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">List your skills (comma separated)</label>
                <textarea name="skills" value={formData.skills} onChange={handleChange} rows="3" placeholder="React, Node.js, Photoshop, Team Leadership..."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"></textarea>
              </div>
            </section>

            {/* Footer Credit */}
            <div className="text-center text-slate-400 text-xs py-4">
              Designed for professional CV creation
            </div>
          </div>

          {/* --- RIGHT SIDE: PREVIEW AREA (Dark Mode Studio Look) --- */}
          <div className="lg:col-span-7 bg-slate-800 rounded-3xl overflow-hidden flex flex-col relative shadow-inner">
            
            {/* Dot Pattern Overlay */}
            <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
            
            {/* Header for Preview */}
            <div className="bg-slate-900/50 backdrop-blur-sm p-3 flex justify-between items-center text-slate-400 text-xs px-6 border-b border-slate-700/50 z-10">
              <span className="font-mono">LIVE PREVIEW</span>
              <span className="bg-slate-700 px-2 py-0.5 rounded text-white">A4 Size</span>
            </div>

            {/* Scrollable Container for Paper */}
            <div className="grow overflow-y-auto p-8 flex justify-center items-start custom-scrollbar z-10">
              
              {/* A4 Paper - Strict Hex Colors for PDF Safety 
                 Note: w-[210mm] is exactly A4 width. 
              */}
              <div ref={cvRef} className="bg-[#ffffff] w-[210mm] min-h-[297mm] shadow-[0_0_50px_rgba(0,0,0,0.25)] p-10 text-[#333333] transform scale-95 origin-top lg:scale-100 transition-transform">
                
                {/* CV Header */}
                <div className="border-b-2 border-[#333333] pb-6 mb-8 flex flex-col justify-between h-auto">
                  <div>
                    <h1 className="text-5xl font-extrabold uppercase tracking-tight mb-2 text-[#000000] leading-tight">
                      {formData.fullName || 'YOUR NAME'}
                    </h1>
                    <p className="text-2xl text-[#1029b9] font-medium tracking-wide">
                      {formData.profession || 'Professional Title'}
                    </p>
                  </div>
                  
                  <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm text-[#555555]">
                    {formData.phone && <span className="flex items-center gap-1">📞 {formData.phone}</span>}
                    {formData.email && <span className="flex items-center gap-1">📧 {formData.email}</span>}
                    {formData.address && <span className="flex items-center gap-1">📍 {formData.address}</span>}
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-10">
                  
                  {/* Main Left Column */}
                  <div className="col-span-8 space-y-10">
                    
                    {/* Experience Section */}
                    <div>
                      <h3 className="text-lg font-bold uppercase border-b-2 border-[#e5e5e5] pb-2 mb-5 text-[#000000] tracking-wider">Experience</h3>
                      {formData.company ? (
                          <div className="mb-6 group">
                              <div className="flex justify-between items-baseline mb-1">
                                <h4 className="font-bold text-xl text-[#000000]">{formData.jobTitle}</h4>
                                <span className="text-[#1037b9] font-bold text-xs bg-[#ecfdf5] px-2 py-1 rounded">{formData.duration}</span>
                              </div>
                              <div className="text-[#666666] font-semibold text-sm mb-3">{formData.company}</div>
                              <p className="text-[#444444] leading-relaxed text-sm whitespace-pre-wrap text-justify">
                                {formData.description}
                              </p>
                          </div>
                      ) : (
                          <div className="p-4 border border-dashed border-[#cccccc] rounded bg-[#f9f9f9] text-[#aaaaaa] italic text-sm text-center">
                            Start typing in the Experience section to see changes here...
                          </div>
                      )}
                    </div>

                    {/* Education Section */}
                    <div>
                      <h3 className="text-lg font-bold uppercase border-b-2 border-[#e5e5e5] pb-2 mb-5 text-[#000000] tracking-wider">Education</h3>
                      {formData.university ? (
                          <div className="flex flex-col gap-1">
                              <h4 className="font-bold text-lg text-[#000000]">{formData.degree}</h4>
                              <p className="text-[#333333] font-medium text-base">{formData.university}</p>
                              <p className="text-sm text-[#666666]">Graduated: {formData.passingYear}</p>
                          </div>
                      ) : (
                          <p className="text-[#aaaaaa] italic text-sm">Add education details...</p>
                      )}
                    </div>
                  </div>

                  {/* Right Sidebar Column */}
                  <div className="col-span-4 flex flex-col gap-8">
                    
                    {/* Personal Info Box */}
                    <div className="bg-[#f8fafc] p-5 rounded-xl border border-[#e2e8f0]">
                      <h3 className="text-sm font-bold uppercase border-b-2 border-[#10b981] pb-2 mb-4 text-[#000000] tracking-wide">
                        Personal Info
                      </h3>
                      <div className="space-y-4 text-sm">
                          <div>
                              <span className="block font-bold text-[#94a3b8] text-[10px] uppercase tracking-wider mb-1">Father's Name</span>
                              <span className="text-[#1e293b] font-semibold">{formData.fatherName || '-'}</span>
                          </div>
                          <div>
                              <span className="block font-bold text-[#94a3b8] text-[10px] uppercase tracking-wider mb-1">Mother's Name</span>
                              <span className="text-[#1e293b] font-semibold">{formData.motherName || '-'}</span>
                          </div>
                      </div>
                    </div>

                    {/* Skills Box */}
                    <div>
                      <h3 className="text-sm font-bold uppercase border-b-2 border-[#10b981] pb-2 mb-4 text-[#000000] tracking-wide">
                        Expertise
                      </h3>
                      <div className="flex flex-wrap gap-2">
                          {formData.skills ? formData.skills.split(',').map((skill, i) => (
                               <span key={i} className="bg-[#d1fae5] text-[#065f46] px-3 py-1.5 rounded-lg text-xs font-bold border border-[#a7f3d0]">
                                 {skill.trim()}
                               </span>
                          )) : (
                              <span className="text-[#aaaaaa] text-sm italic">No skills yet</span>
                          )}
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
  )
}

export default MakingCV