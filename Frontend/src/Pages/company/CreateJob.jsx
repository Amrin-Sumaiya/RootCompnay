import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const CreateJob = () => {
  const { companyUrl } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    JobTitle: '',
    JobDescription: '',
    Address: '',
    Country: '',
    State: '',
    City: '',
    SalaryFrom: '',
    SalaryTo: '',
    SalaryType: 'monthly',
    Currency: 'USD'
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitJob = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/api/company/jobs',
        form,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );
      navigate(`/company/${companyUrl}/jobs`);
    } catch (err) {
      console.error(err);
      alert('Job creation failed');
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl text-center font-bold mb-6 text-gray-800">Job Posting Form</h2>

      <form onSubmit={submitJob} className="bg-white shadow rounded p-4 space-y-4">
        {/* Job Title */}
        <div>
          <label htmlFor="JobTitle" className="block font-medium mb-1">
            Job Title
          </label>
          <input
            id="JobTitle"
            type="text"
            name="JobTitle"
            required
            placeholder="Enter job title"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Job Description */}
        <div>
          <label htmlFor="JobDescription" className="block font-medium mb-1">
            Job Description
          </label>
          <textarea
            id="JobDescription"
            name="JobDescription"
            placeholder="Enter job description"
            onChange={handleChange}
            rows={3}
            className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          ></textarea>
        </div>

        {/* Address & Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <label htmlFor="Address" className="block font-medium mb-1">
              Address
            </label>
            <input
              id="Address"
              name="Address"
              placeholder="Street address"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="City" className="block font-medium mb-1">
              City
            </label>
            <input
              id="City"
              name="City"
              placeholder="City"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="State" className="block font-medium mb-1">
              State
            </label>
            <input
              id="State"
              name="State"
              placeholder="State"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="Country" className="block font-medium mb-1">
              Country
            </label>
            <input
              id="Country"
              name="Country"
              placeholder="Country"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Salary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div>
            <label htmlFor="SalaryFrom" className="block font-medium mb-1">
              Salary From
            </label>
            <input
              id="SalaryFrom"
              type="number"
              step="0.01"
              name="SalaryFrom"
              placeholder="0.00"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="SalaryTo" className="block font-medium mb-1">
              Salary To
            </label>
            <input
              id="SalaryTo"
              type="number"
              step="0.01"
              name="SalaryTo"
              placeholder="0.00"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="SalaryType" className="block font-medium mb-1">
              Salary Type
            </label>
            <select
              id="SalaryType"
              name="SalaryType"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="hourly">Hourly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
        </div>

        {/* Currency */}
        <div>
          <label htmlFor="Currency" className="block font-medium mb-1">
            Currency
          </label>
          <input
            id="Currency"
            name="Currency"
            placeholder="USD, INR, BDT, etc."
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <div className="text-right">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-1 rounded text-sm transition"
          >
            Create Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateJob;
