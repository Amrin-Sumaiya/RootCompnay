import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const RootLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [companyUrl, setCompanyUrl] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        username: username || undefined,
        password: password || undefined,
        company_url: companyUrl || undefined,
      });

      // Save token and role
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

if (res.data.role === "root") {
  navigate("/"); // root dashboard
} else if (res.data.role === "company") {
  localStorage.setItem("companyName", res.data.company.CompanyName);
  navigate(`/company/${res.data.company.Company_URL}/dashboard`);
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
          Admin / Company Login
        </h2>

        <label className="block text-gray-700 font-medium mb-1">Username</label>
        <input
          type="text"
          placeholder="Enter Root Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />

        <label className="block text-gray-700 font-medium mb-1">
          Admin Password (Only for Admin)
        </label>
        <input
          type="password"
          placeholder="Enter Root Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />

        <label className="block text-gray-700 font-medium mb-1">
          Company Password
        </label>
        <input
          type="text"
          placeholder="Enter Company URL"
          value={companyUrl}
          onChange={(e) => setCompanyUrl(e.target.value)}
          className="w-full p-3 border rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold p-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default RootLogin;
