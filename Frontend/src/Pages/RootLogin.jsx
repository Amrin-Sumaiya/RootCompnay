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
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
      {/* Decorative Side Element */}
      <div className="absolute inset-y-0 left-0 w-1/3 bg-green-900 hidden lg:block"></div>

      <div className="z-10 w-full max-w-md p-6">
        <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(8,112,184,0.1)] border border-gray-100 overflow-hidden">
          
          {/* Top accent bar */}
          <div className="h-2 w-full bg-green-800"></div>

          <form onSubmit={handleLogin} className="p-10">
            {/* Header */}
            <div className="mb-10">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight">
                Admin Login Page Only
              </h2>
              <p className="text-gray-400 mt-2 font-medium">
                Secure access for authorized administrators
              </p>
            </div>

            {/* Email Field */}
            <div className="mb-6">
              <label className="block text-gray-800 font-bold text-sm mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-300"
                required
              />
            </div>

            {/* Password Field */}
            <div className="mb-8">
              <label className="block text-gray-800 font-bold text-sm mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-300"
                required
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-800 text-white font-bold py-4 rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : null}
              {isLoading ? "Verifying..." : "Log In"}
            </button>

            {/* Branding Footer */}
            <div className="mt-10 pt-6 border-t border-gray-50 flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                Admin Control
              </span>
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                <span className="text-[10px] text-gray-400 font-medium">Server Online</span>
              </div>
            </div>
          </form>
        </div>
        
        <p className="text-center text-gray-400 text-sm mt-8">
          &copy; 2026 Management System. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default RootLogin;