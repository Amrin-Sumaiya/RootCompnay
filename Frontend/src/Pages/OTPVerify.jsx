import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api/axios";

const OTPVerify = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(300); // 5 minutes
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m < 10 ? "0" + m : m}:${s < 10 ? "0" + s : s}`;
  };

 const handleVerify = async () => {
  if (otp.length !== 6) {
    setError("OTP must be 6 digits");
    return;
  }

  setLoading(true);
  setError("");

  try {
    const response = await api.post("/candidate-auth/verify-otp", { email, otp });

    // Save JWT token
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("role", "2");

    navigate("/makingcv"); // now makingcv API calls will succeed
  } catch (err) {
    setError(err.response?.data?.message || "OTP verification failed");
  } finally {
    setLoading(false);
  }
};

  const handleResend = async () => {
    setLoading(true);
    try {
      await api.post("/candidate-auth/resend-otp", { email });
      setTimer(300); // reset timer
      alert("OTP resent to your email");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Verify OTP</h2>
        <p className="text-center text-gray-600 mb-4">
          Enter the OTP sent to <strong>{email}</strong>
        </p>

        <input
          type="text"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-teal-500 text-center text-lg mb-2"
          placeholder="Enter 6-digit OTP"
        />

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <div className="flex justify-between items-center mb-4">
          <span>Time Left: {formatTime(timer)}</span>
          {timer === 0 && (
            <button
              onClick={handleResend}
              className="text-teal-600 hover:underline text-sm"
            >
              Resend OTP
            </button>
          )}
        </div>

        <button
          onClick={handleVerify}
          disabled={loading || otp.length !== 6}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded font-bold disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </div>
    </div>
  );
};

export default OTPVerify;