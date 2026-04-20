/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { Building2, User, Mail, Phone, Lock, ArrowRight, CheckCircle2, ShieldCheck, MapPin, Globe, Map } from "lucide-react";

const CompanyRegister = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [companyTypes, setCompanyTypes] = useState([]);
  const [phoneError, setPhoneError] = useState(""); // Added state for validation
  
  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const res = await api.get("/admin/company-types");
        setCompanyTypes(res.data);
      } catch (err) {
        console.error("Failed to load company types");
      }
    };
    fetchTypes();
  }, []);

  const [formData, setFormData] = useState({
    companyName: "",
    personName: "",
    companyType: "",
    email: "",
    phone: "",
    password: "",
    Address: "",
    City: "",
    State: ""
  });

  const [otpData, setOtpData] = useState({ emailOTP: "", phoneOTP: "" });
  const [otpSettings, setOtpSettings] = useState({ emailOTPEnabled: true, phoneOTPEnabled: true });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validation logic for phone
    if (name === "phone") {
      if (value.length > 0 && (value.length !== 11 || !/^\d+$/.test(value))) {
        setPhoneError("Phone number must be exactly 11 digits.");
      } else {
        setPhoneError("");
      }
    }
  };

  const handleOtpChange = (e) => setOtpData({ ...otpData, [e.target.name]: e.target.value });

  const sendOTP = async (e) => {
    e.preventDefault();
    if (formData.phone.length !== 11) {
      setPhoneError("Phone number must be exactly 11 digits.");
      return;
    }
    setLoading(true);
    try {
      const res = await api.post("/company/send-otp", { email: formData.email, phone: formData.phone });
      setOtpSettings({
        emailOTPEnabled: res.data.emailOTPEnabled ?? true,
        phoneOTPEnabled: res.data.phoneOTPEnabled ?? true
      });
      setStep(2);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyAndRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/company/verify-otp-and-register", { ...formData, ...otpData });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", 1);
      localStorage.setItem("companyUrl", res.data.companyUrl);
      navigate(`/company/${res.data.companyUrl}/dashboard`);
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-6 font-sans">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-slate-100">
        
        {/* Left Side: Branding */}
        <div className="hidden md:flex md:w-2/5 bg-slate-900 p-12 flex-col justify-between text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <Building2 size={200} />
          </div>
          <div className="relative z-10">
            <div className="h-14 w-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-white/20">
              <Building2 size={28} className="text-emerald-400" />
            </div>
            <h1 className="text-4xl font-extrabold mb-6 tracking-tight">Partner with us.</h1>
            <p className="text-slate-400 leading-relaxed text-lg">
              Create your corporate account to manage your business operations and access our premium suite of growth tools.
            </p>
          </div>
          <div className="space-y-6 relative z-10">
            <div className="flex items-center gap-4">
              <div className="bg-emerald-500/20 p-2 rounded-lg text-emerald-400"><CheckCircle2 size={20} /></div>
              <span className="font-medium">Verified Business Profiles</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-emerald-500/20 p-2 rounded-lg text-emerald-400"><ShieldCheck size={20} /></div>
              <span className="font-medium">Secure 2FA Registration</span>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="flex-1 p-8 md:p-12 lg:p-16">
          <div className="flex items-center justify-center mb-10">
             <div className="flex items-center space-x-4">
               <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${step === 1 ? 'bg-indigo-600 text-white' : 'bg-emerald-500 text-white'}`}>
                 {step > 1 ? <CheckCircle2 size={20}/> : "1"}
               </div>
               <div className="w-12 h-0.5 bg-slate-200"></div>
               <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${step === 2 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-400'}`}>2</div>
             </div>
          </div>

          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            {step === 1 ? "Create Account" : "Account Verification"}
          </h2>
          <p className="text-slate-500 mb-8">
            {step === 1 ? "Provide your business details to get started" : "Enter the codes sent to your email and phone"}
          </p>

          {step === 1 && (
            <form onSubmit={sendOTP} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <InputGroup icon={<Phone size={18}/>} name="phone" value={formData.phone} placeholder="Phone Number (11 digits)" onChange={handleChange} required />
                  {phoneError && <p className="text-red-500 text-xs mt-1 ml-2">{phoneError}</p>}
                </div>
                <InputGroup icon={<Mail size={18}/>} type="email" name="email" value={formData.email} placeholder="Business Email" onChange={handleChange} required />
                <InputGroup icon={<Building2 size={18}/>} name="companyName" value={formData.companyName} placeholder="Company Name" onChange={handleChange} required />
                <InputGroup icon={<User size={18}/>} name="personName" value={formData.personName} placeholder="Contact Person" onChange={handleChange} required />
                <InputGroup icon={<MapPin size={18}/>} name="Address" placeholder="Address" onChange={handleChange} />
                <InputGroup icon={<Map size={18}/>} name="City" placeholder="City" onChange={handleChange} />
                <div className="md:col-span-2">
                   <InputGroup icon={<Globe size={18}/>} name="State" placeholder="State/Province" onChange={handleChange} />
                </div>
              </div>

              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><ShieldCheck size={18} /></div>
                <select name="companyType" value={formData.companyType} onChange={handleChange} required className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-slate-700 appearance-none">
                  <option value="">Select Company Type</option>
                  {companyTypes.map((type) => <option key={type.id} value={type.id}>{type.name}</option>)}
                </select>
              </div>

              <InputGroup icon={<Lock size={18}/>} type="password" name="password" value={formData.password} placeholder="Create Password" onChange={handleChange} required />

              <button type="submit" disabled={loading || phoneError !== ""} className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 mt-2">
                {loading ? "Processing..." : "Continue"}
                <ArrowRight size={18} />
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={verifyAndRegister} className="space-y-6">
              {otpSettings.emailOTPEnabled && <InputGroup icon={<Mail size={18}/>} name="emailOTP" value={otpData.emailOTP} placeholder="Email Verification Code" onChange={handleOtpChange} required />}
              {otpSettings.phoneOTPEnabled && <InputGroup icon={<Phone size={18}/>} name="phoneOTP" value={otpData.phoneOTP} placeholder="SMS Verification Code" onChange={handleOtpChange} required />}
              
              <button type="submit" disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-emerald-200">
                {loading ? "Verifying..." : "Complete Registration"}
              </button>
              <button type="button" onClick={() => setStep(1)} className="w-full text-slate-400 text-sm hover:text-indigo-600 transition-colors underline underline-offset-4">
                Back to details
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const InputGroup = ({ icon, ...props }) => (
  <div className="relative group">
    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
      {icon}
    </div>
    <input {...props} className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-slate-700 placeholder:text-slate-400" />
  </div>
);

export default CompanyRegister;