import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Create = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    companyUrl: "",
    foundedDate: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/admin/company",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      navigate("/admin/read");
    } catch (error) {
      console.error("Error creating company:", error);
      alert(
        error.response?.data?.message || "Failed to create company"
      );
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        Create Company
      </h2>

      <div className="flex justify-end mb-4">
        <Link
          to="/admin"
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
        >
          Dashboard
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Company Name */}
        <div>
          <label className="block mb-1 font-medium">Company Name</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Company URL */}
        <div>
          <label className="block mb-1 font-medium">Company URL</label>
          <input
            type="text"
            name="companyUrl"
            value={formData.companyUrl}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Founded Date */}
        <div>
          <label className="block mb-1 font-medium">Founded Date</label>
          <input
            type="date"
            name="foundedDate"
            value={formData.foundedDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <hr className="my-4" />

        {/* Company Login Email */}
        <div>
          <label className="block mb-1 font-medium">Company Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Company Login Password */}
        <div>
          <label className="block mb-1 font-medium">Company Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Create Company
        </button>
      </form>
    </div>
  );
};

export default Create;
