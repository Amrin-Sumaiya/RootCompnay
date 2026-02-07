import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const RootLogin = () => {
  const [email, setEmail] = useState(""); // Using email as username
  const [password, setPassword] = useState("");
 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      // Save token and role
      localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", String(res.data.role));
// numeric: 0,1,2

if (res.data.role === 0) {
  navigate("/admin/dashboard");
}
 else if (res.data.role === 1) {
        // Company
        localStorage.setItem("companyName", res.data.CompanyName || "");
        localStorage.setItem("companyUrl", res.data.companyUrl || "");
        navigate(`/company/${res.data.companyUrl}/dashboard`);
      } else if (res.data.role === 2) {
        // Candidate
        navigate("/candidate/profile");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-blue-100 p-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-200"
      >
        <h2 className="text-2xl font-extrabold text-gray-800 mb-6 text-center">
          Admin Login Page Only 
        </h2>

        <label className="block text-gray-700 font-medium mb-1">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          required
        />

        <label className="block text-gray-700 font-medium mb-1">Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          required
        />

  

        <button
          type="submit"
          className="w-full bg-green-800 text-white font-semibold p-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default RootLogin;
