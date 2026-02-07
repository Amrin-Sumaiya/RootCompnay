import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const CandidatesAuth = () => {
  const [isLogin, setIsLogin] = useState(true); // toggle between login & register
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
        // Login
        res = await api.post("/candidate-auth/login", { email, password });
      } else {
        // Register
        res = await api.post("/candidate-auth/register", { name, email, password });
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", "2");

      alert(res.data.message || (isLogin ? "Login successful" : "Registration successful"));
      navigate("/makingcv");
    } catch (err) {
      alert(err.response?.data?.message || (isLogin ? "Login failed" : "Registration failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-6">
          <button
            className={`px-4 py-2 font-bold rounded-l ${
              isLogin ? "bg-green-700 text-white" : "bg-gray-200"
            }`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`px-4 py-2 font-bold rounded-r ${
              !isLogin ? "bg-green-700 text-white" : "bg-gray-200"
            }`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Candidate Login" : "Candidate Registration"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border p-3 rounded"
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-700 text-white py-3 rounded font-bold"
          >
            {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CandidatesAuth;
