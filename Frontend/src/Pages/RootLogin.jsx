import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const RootLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", String(res.data.role));

      if (res.data.role === 0) {
        navigate("/admin/dashboard");
      } else if (res.data.role === 1) {
        localStorage.setItem("companyName", res.data.CompanyName || "");
        localStorage.setItem("companyUrl", res.data.companyUrl || "");
        navigate(`/company/${res.data.companyUrl}/dashboard`);
      } else if (res.data.role === 2) {
        navigate("/candidate/profile");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans">
      
      {/* Left Panel - Branding/Decorative (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 items-center justify-center overflow-hidden">
        {/* Subtle background gradients/blobs */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-900/40 to-slate-900 z-0"></div>
        <div className="absolute w-[500px] h-[500px] bg-emerald-600/20 rounded-full blur-3xl -top-20 -left-20"></div>
        <div className="absolute w-[400px] h-[400px] bg-teal-600/20 rounded-full blur-3xl bottom-10 right-10"></div>
        
        <div className="relative z-10 p-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 mb-6 backdrop-blur-sm">
            <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tight mb-4">
            System Administration
          </h1>
          <p className="text-slate-400 text-lg max-w-md mx-auto">
            Secure, centralized management for your entire organizational network.
          </p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 md:px-24 xl:px-32 relative">
        <div className="w-full max-w-sm mx-auto">
          
          {/* Header */}
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Admin Login Only
            </h2>
            <p className="text-slate-500 mt-2 text-sm font-medium">
              Please enter your admin credentials to continue.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Email Field */}
            <div>
              <label className="block text-slate-700 font-semibold text-sm mb-2" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  id="email"
                  type="email"
                  placeholder="admin@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-400 text-slate-900 shadow-sm"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-slate-700 font-semibold text-sm mb-2" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-400 text-slate-900 shadow-sm"
                  required
                />
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-600 text-white font-semibold py-3.5 rounded-xl hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-500/50 active:scale-[0.98] transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                "Sign In to Dashboard"
              )}
            </button>
          </form>

          {/* Footer Area */}
          <div className="mt-12 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs text-slate-500 font-medium tracking-wide">Secure Connection</span>
            </div>
            <span className="text-xs text-slate-400">
              &copy; {new Date().getFullYear()} Management System
            </span>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default RootLogin;