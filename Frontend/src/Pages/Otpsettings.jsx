import React, { useEffect, useState } from "react";
import axios from "axios";

const OtpSettings = () => {
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [phoneEnabled, setPhoneEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get("https://backend.igltour.com/api/admin/otp-settings", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(res => {
  setEmailEnabled(Boolean(res.data.email_otp_enabled));
  setPhoneEnabled(Boolean(res.data.phone_otp_enabled));
    }).catch(err => console.error("Failed to fetch settings", err));
  }, []);

  const saveSettings = async () => {
    setLoading(true);
    try {
      await axios.put("https://backend.igltour.com/api/admin/otp-update",
        { emailEnabled, phoneEnabled },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      alert("Settings updated successfully!");
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      alert("Failed to update settings.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6">
      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">OTP Access Control</h2>
        <p className="text-gray-500 text-sm mt-1">
          Configure how users verify their identity during login.
        </p>
      </div>

      {/* Settings Card */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-200">
          
          {/* Email OTP Toggle */}
          <div className="flex items-center justify-between p-5 hover:bg-gray-50 transition-colors">
            <div className="flex flex-col">
              <span className="font-semibold text-gray-700">Email OTP</span>
              <span className="text-xs text-gray-500">Send verification codes to registered email addresses.</span>
            </div>
            <button
              onClick={() => setEmailEnabled(!emailEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                emailEnabled ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  emailEnabled ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* Phone OTP Toggle */}
          <div className="flex items-center justify-between p-5 hover:bg-gray-50 transition-colors">
            <div className="flex flex-col">
              <span className="font-semibold text-gray-700">Phone OTP (SMS)</span>
              <span className="text-xs text-gray-500">Send verification codes via SMS to mobile numbers.</span>
            </div> 
            <button
              onClick={() => setPhoneEnabled(!phoneEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                phoneEnabled ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  phoneEnabled ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Action Footer */}
        <div className="bg-gray-50 p-4 flex justify-end">
          <button
            onClick={saveSettings}
            disabled={loading}
            className={`px-6 py-2 rounded-lg font-medium text-white transition-all shadow-sm ${
              loading 
                ? "bg-blue-400 cursor-not-allowed" 
                : "bg-blue-600 hover:bg-blue-700 active:scale-95"
            }`}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
      
      {/* Quick Tip */}
      <p className="mt-4 text-center text-xs text-gray-400 italic">
        Changes will take effect immediately for all new login attempts.
      </p>
    </div>
  );
};

export default OtpSettings;