import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const CandidatesAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // 🇧🇩 BD Phone Validation Function
  const validatePhone = (value) => {
    const bdPhoneRegex = /^01[3-9]\d{8}$/;

    if (!bdPhoneRegex.test(value)) {
      setPhoneError(
        "Valid format: 01XXXXXXXXX (Starts with 013-019, 11 digits)"
      );
    } else {
      setPhoneError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prevent submit if phone invalid
      if (!isLogin && (phoneError || !phone)) {
        alert("Please enter a valid Bangladesh phone number");
        setLoading(false);
        return;
      }

      let res;

      if (isLogin) {
        // LOGIN
        res = await api.post("/candidate-auth/login", {
          email,
          password,
        });

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", "2");
        navigate("/makingcv");
      } else {
        // REGISTER
        res = await api.post("/candidate-auth/register", {
          name,
          phone,
          email,
          password,
        });

        // Redirect to OTP verification page with email
        navigate("/otp-verify", { state: { email } });
      }
    } catch (err) {
      alert(err.response?.data?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Hero Section */}
      <div
        className="relative h-64 flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&q=80&w=1200')",
        }}
      >
        <div className="absolute inset-0 bg-teal-900/40 backdrop-blur-[2px]"></div>

        <h1 className="relative z-10 text-4xl md:text-5xl font-bold text-white tracking-tight">
          {isLogin ? "Candidate Login" : "Candidate Registration"}
        </h1>
      </div>

      {/* Form */}
      <div className="max-w-md mx-auto px-6 py-12">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* PHONE (Register Only) */}
          {!isLogin && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 text-left">
                Phone Number
              </label>

              <input
                type="tel"
                placeholder="Enter 01XXXXXXXXX"
                maxLength="11"
                value={phone}
                onChange={(e) => {
                  const onlyNumbers = e.target.value.replace(/\D/g, "");
                  setPhone(onlyNumbers);
                  validatePhone(onlyNumbers);
                }}
                className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-1 ${
                  phoneError
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-teal-500"
                }`}
                required
              />

              {phoneError && (
                <p className="text-red-500 text-sm mt-1">{phoneError}</p>
              )}
            </div>
          )}

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 text-left">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-teal-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* NAME (Register Only) */}
          {!isLogin && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 text-left">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 text-left">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-teal-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="flex-1 bg-[#2b775a] hover:bg-[#78151a] text-white py-3 font-bold uppercase tracking-wider transition-all"
            >
              {isLogin ? "Register" : "Back to Login"}
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#2b775a] hover:bg-[#781515] text-white py-3 font-bold uppercase tracking-wider transition-all disabled:opacity-50"
            >
              {loading ? "..." : isLogin ? "Log In" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CandidatesAuth;