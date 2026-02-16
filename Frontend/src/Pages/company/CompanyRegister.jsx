import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { Building2, User, Mail, Phone, Lock, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";

const CompanyRegister = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    companyName: "",
    personName: "",
    companyType: "",
    email: "",
    phone: "",
    password: ""
  });

  const [otpData, setOtpData] = useState({
    emailOTP: "",
    phoneOTP: ""
  });

  // ✅ NEW: track which OTPs are enabled
  const [otpSettings, setOtpSettings] = useState({
    emailOTPEnabled: true,
    phoneOTPEnabled: true
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOtpChange = (e) => {
    setOtpData({ ...otpData, [e.target.name]: e.target.value });
  };

  const sendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/company/send-otp", {
        email: formData.email,
        phone: formData.phone
      });

      // ✅ SAVE OTP SETTINGS FROM BACKEND
      setOtpSettings({
        emailOTPEnabled: res.data.emailOTPEnabled ?? true,
        phoneOTPEnabled: res.data.phoneOTPEnabled ?? true
      });

      setStep(2);

      // ✅ AUTO-SUBMIT IF BOTH OTPS DISABLED
      if (!res.data.emailOTPEnabled && !res.data.phoneOTPEnabled) {
        verifyAndRegisterAuto();
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // ✅ AUTO REGISTER IF BOTH OTPS DISABLED
  const verifyAndRegisterAuto = async () => {
    setLoading(true);
    try {
      const res = await api.post("/company/verify-otp-and-register", {
        ...formData,
        ...otpData
      });
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

  const verifyAndRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/company/verify-otp-and-register", {
        ...formData,
        ...otpData
      });
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
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side: Branding/Info */}
        <div className="hidden md:flex md:w-2/5 bg-green-800 p-12 flex-col justify-between text-white">
          <div>
            <div className="h-12 w-12 bg-white/20 rounded-xl flex items-center justify-center mb-8">
              <Building2 size={28} />
            </div>
            <h1 className="text-3xl font-bold mb-4">Partner with us.</h1>
            <p className="text-indigo-100 leading-relaxed">
              Create your corporate account to manage your business operations, 
              track growth, and access our premium suite of tools.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <CheckCircle2 size={18} className="text-indigo-300" />
              <span>Verified Business Profiles</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <CheckCircle2 size={18} className="text-indigo-300" />
              <span>Secure 2FA Registration</span>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="flex-1 p-8 md:p-12">
          {/* Stepper Header */}
          <div className="flex items-center justify-between mb-8 px-2">
            <div className={`flex flex-col items-center gap-2`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step === 1 ? 'bg-indigo-600 text-white' : 'bg-green-500 text-white'}`}>
                {step > 1 ? <CheckCircle2 size={16}/> : "1"}
              </div>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-gray-500">Details</span>
            </div>
            <div className={`flex-1 h-0.5 mx-4 ${step > 1 ? 'bg-green-500' : 'bg-gray-200'}`}></div>
            <div className={`flex flex-col items-center gap-2`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step === 2 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                2
              </div>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-gray-500">Verify</span>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {step === 1 ? "Register Company" : "Account Verification"}
          </h2>
          <p className="text-gray-500 mb-8 text-sm">
            {step === 1 ? "Enter your company details to get started." : "We've sent unique codes to your email and phone."}
          </p>

          {step === 1 && (
            <form onSubmit={sendOTP} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <InputGroup icon={<Phone size={18}/>} name="phone" value={formData.phone} placeholder="Phone (880...)" onChange={handleChange} required />
                <InputGroup icon={<Mail size={18}/>} type="email" name="email" value={formData.email} placeholder="Business Email" onChange={handleChange} required />
                <InputGroup icon={<Building2 size={18}/>} name="companyName" value={formData.companyName} placeholder="Company Name" onChange={handleChange} required />
                <InputGroup icon={<User size={18}/>} name="personName" value={formData.personName} placeholder="Person Name" onChange={handleChange} required />
              </div>

              <InputGroup icon={<ShieldCheck size={18}/>} name="companyType" value={formData.companyType} placeholder="Company Type (e.g. LLC, Corp)" onChange={handleChange} required />
              <InputGroup icon={<Lock size={18}/>} type="password" name="password" value={formData.password} placeholder="Password" onChange={handleChange} required />

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 disabled:opacity-70"
                disabled={loading}
              >
                {loading ? "Processing..." : "Continue to Verification"}
                <ArrowRight size={18} />
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={verifyAndRegister} className="space-y-6">
              <div className="space-y-4">
                <label className="text-sm font-semibold text-gray-700">Verification Codes</label>

                {/* ✅ CONDITIONAL EMAIL OTP */}
                {otpSettings.emailOTPEnabled && (
                  <InputGroup
                    icon={<Mail size={18}/>}
                    name="emailOTP"
                    value={otpData.emailOTP}
                    placeholder="6-digit Email OTP"
                    onChange={handleOtpChange}
                    required
                  />
                )}

                {/* ✅ CONDITIONAL PHONE OTP */}
                {otpSettings.phoneOTPEnabled && (
                  <InputGroup
                    icon={<Phone size={18}/>}
                    name="phoneOTP"
                    value={otpData.phoneOTP}
                    placeholder="6-digit Phone OTP"
                    onChange={handleOtpChange}
                    required
                  />
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-200 disabled:opacity-70"
                disabled={loading}
              >
                {loading ? "Verifying..." : "Complete Registration"}
                <CheckCircle2 size={18} />
              </button>
              
              <button 
                type="button" 
                onClick={() => setStep(1)}
                className="w-full text-gray-500 text-sm font-medium hover:text-indigo-600 transition-colors"
              >
                Edit Company Information
              </button>
            </form>
          )}

          <div className="mt-8 pt-8 border-t border-gray-100 text-center">
            <p className="text-gray-600 text-sm">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/company/login")}
                className="text-indigo-600 hover:text-indigo-800 font-bold transition-colors underline-offset-4 hover:underline"
              >
                Log In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Input Component
const InputGroup = ({ icon, ...props }) => (
  <div className="relative group">
    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors">
      {icon}
    </div>
    <input
      {...props}
      className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-gray-700 placeholder:text-gray-400"
    />
  </div>
);

export default CompanyRegister;
