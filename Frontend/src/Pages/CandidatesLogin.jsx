import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const CandidatesAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let res;
      if (isLogin) {
        res = await api.post("/candidate-auth/login", { email, password });
      } else {
        res = await api.post("/candidate-auth/register", { name, email, password });
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", "2");
      navigate("/makingcv");
    } catch (err) {
      alert(err.response?.data?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Hero Header Section */}
      <div 
        className="relative h-64 flex items-center justify-center bg-cover bg-center"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&q=80&w=1200')` 
        }}
      >
        {/* Dark Overlay to make text pop */}
        <div className="absolute inset-0 bg-teal-900/40 backdrop-blur-[2px]"></div>
        
        <h1 className="relative z-10 text-4xl md:text-5xl font-bold text-white tracking-tight">
          {isLogin ? "Candidate Login" : "Candidate Registration"}
        </h1>
      </div>

      {/* Form Container */}
      <div className="max-w-md mx-auto px-6 py-12">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {!isLogin && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 text-left">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-teal-500"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 text-left">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-teal-500"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 text-left">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-teal-500"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Remember Me & Lost Password Row */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" className="rounded border-gray-300 text-teal-600 focus:ring-teal-500" />
              <span>Remember Me</span>
            </label>
            <button type="button" className="hover:text-teal-700 transition-colors">
              Lost Password?
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 bg-[#2b775a] hover:bg-[#781515] text-white py-3 font-bold uppercase tracking-wider transition-all disabled:opacity-50`}
            >
              {loading ? "..." : isLogin ? "Log In" : "Submit"}
            </button>
            
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="flex-1 bg-[#2b775a] hover:bg-[#78151a] text-white py-3 font-bold uppercase tracking-wider transition-all"
            >
              {isLogin ? "Register" : "Back to Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CandidatesAuth;