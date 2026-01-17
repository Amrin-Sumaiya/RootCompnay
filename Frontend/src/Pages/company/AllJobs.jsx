import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/company/all-jobs");
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800">
        All Job Circular
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300  overflow-hidden">
          <thead className="bg-blue-50">
            <tr>
              <th className="border p-3 text-left text-gray-700">SI</th>
              <th className="border p-3 text-left text-gray-700">Company</th>
              <th className="border p-3 text-left text-gray-700">Job Title</th>
              <th className="border p-3 text-left text-gray-700">Location</th>
              <th className="border p-3 text-left text-gray-700">Salary</th>
              <th className="border p-3 text-left text-gray-700">Type</th>
              <th className="border p-3 text-left text-gray-700">Details</th>
            </tr>
          </thead>
          <tbody>
            {jobs.length === 0 ? (
              <tr>
                <td colSpan="7" className="p-4 text-center text-gray-500">
                  No jobs found
                </td>
              </tr>
            ) : (
              jobs.map((job, idx) => (
                <tr
                  key={job.JobID}
                  className="hover:bg-blue-50 transition-colors odd:bg-white even:bg-gray-50"
                >
                  <td className="border p-3">{idx + 1}</td>
                  <td className="border p-3">
                    <Link
                      to={`/company/${job.Company_URL.replace("/", "")}/dashboard`}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      {job.Company_URL}
                    </Link>
                  </td>
                  <td className="border p-3 font-medium text-gray-800">{job.JobTitle}</td>
                  <td className="border p-3 text-gray-700">
                    {job.City}, {job.Country}
                  </td>
                  <td className="border p-3 text-gray-700">
                    {job.SalaryFrom} - {job.SalaryTo} {job.Currency}
                  </td>
                  <td className="border p-3 capitalize">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {job.SalaryType}
                    </span>
                  </td>
                  <td className="border p-3">
                    <Link
                      to={job.JobLink}
                      className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-lg transition font-medium"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllJobs;
