import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CompanyLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Call your backend login API
      const res = await axios.post('http://localhost:5000/api/company/login', { email, password })

      // Save token
    localStorage.setItem('token', res.data.token);
localStorage.setItem('role', 1);                 // ✅ ADD THIS LINE
localStorage.setItem('companyUrl', res.data.CompanyURL); // ✅ ADD THIS LINE


      // Redirect to company dashboard
     const companyUrl = res.data.CompanyURL; // Make sure backend sends this
      navigate(`/company/${companyUrl}/dashboard`);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center px-4">
      {/* Login Card */}
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
        
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mx-auto w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
            <span className="text-white font-bold text-2xl">C</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Company Login</h2>
          <p className="text-slate-500 mt-2">Please enter your company details</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Email Field */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Email Address
            </label>
            <input 
              type="email" 
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-400"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-semibold text-slate-700">Password</label>
              <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-700">Forgot?</a>
            </div>
            <input 
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-400"
              required
            />
          </div>

          {/* Remember Me */}
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="remember" 
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded cursor-pointer" 
            />
            <label htmlFor="remember" className="ml-2 text-sm text-slate-600 cursor-pointer select-none">
              Remember this device
            </label>
          </div>

          {/* Login Button */}
          <button 
            type="submit" 
            className="w-full bg-green-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg shadow-blue-200 active:scale-[0.98]"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-slate-500 text-sm mt-8">
          Don't have an account? <a href="#" className="font-semibold text-blue-600 hover:underline">Contact Admin</a>
        </p>
      </div>
      
      {/* Simple Footer Info */}
      <p className="mt-8 text-slate-400 text-xs">
        &copy; 2026 Your Company Inc. All rights reserved.
      </p>
    </div>
  );
};

export default CompanyLogin;
