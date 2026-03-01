import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api/axios";

const OTPVerify = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "your email";

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(300); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);

  // Timer Logic
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" + s : s}`;
  };

  // Handle Digit Input
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.nextSibling && element.value !== "") {
      element.nextSibling.focus();
    }
  };

  // Handle Backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = async () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      setError("Please enter the full 6-digit code.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await api.post("/candidate-auth/verify-otp", { email, otp: otpValue });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", "2");
      navigate("/makingcv");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    try {
      await api.post("/candidate-auth/resend-otp", { email });
      setOtp(new Array(6).fill("")); // Clear inputs
      setTimer(300); 
      setError("");
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Failed to resend OTP. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">Verify Identity</h2>
          <p className="text-gray-500 mt-2">
            We've sent a 6-digit code to <br />
            <span className="font-semibold text-gray-700">{email}</span>
          </p>
        </div>

        {/* OTP Input Group */}
        <div className="flex justify-between gap-2 mb-6">
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              ref={(el) => (inputRefs.current[index] = el)}
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-14 text-center text-2xl font-bold border-2 rounded-lg focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all bg-gray-50 text-gray-800"
            />
          ))}
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4 text-center animate-pulse">
            {error}
          </div>
        )}

        <button
          onClick={handleVerify}
          disabled={loading || otp.join("").length !== 6}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-xl font-semibold text-lg shadow-lg shadow-teal-200 transition-all active:scale-[0.98] disabled:opacity-50 disabled:shadow-none"
        >
          {loading ? "Verifying..." : "Confirm & Continue"}
        </button>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            {timer > 0 ? (
              <span>Resend code in <span className="font-mono font-bold text-teal-600">{formatTime(timer)}</span></span>
            ) : (
              <button
                onClick={handleResend}
                className="text-teal-600 font-bold hover:text-teal-700 transition-colors"
              >
                Resend OTP
              </button>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OTPVerify;