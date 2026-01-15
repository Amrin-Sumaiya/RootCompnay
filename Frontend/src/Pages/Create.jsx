import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Create = () => {
  const [formData, setFormData] = useState({
    CompanyName: '',
    CompanyCode: '',
    CompanyType: '2',
    Company_URL: '',
    FoundedDate: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/igl/add_company', formData);
      navigate('/read');
    } catch (error) {
      console.error('Error creating company:', error);
      alert('Failed to create company!');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        Create Company
      </h2>

      <div className="flex justify-end mb-4">
        <Link
          to="/"
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
        >
          Dashboard
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Company Name */}
        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
            Company Name:
          </label>
          <input
            type="text"
            name="CompanyName"
            value={formData.CompanyName}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            required
          />
        </div>

        {/* Company Code */}
        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
            Company Code:
          </label>
          <input
            type="text"
            name="CompanyCode"
            value={formData.CompanyCode}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            required
          />
        </div>

        {/* Company Type */}
        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
            Company Type:
          </label>
          <input
            type="text"
            name="CompanyType"
            value={formData.CompanyType}
             readOnly
            className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
        </div>
        {/* Company URL */}
        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
            Company_URL
          </label>
          <input
            type="text"
            name="Company_URL"
            value={formData.Company_URL}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
        </div>

        {/* Founded Date */}
        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
            Founded Date:
          </label>
          <input
            type="date"
            name="FoundedDate"
            value={formData.FoundedDate}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Create;
