import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaTrash, FaEdit, FaEye } from 'react-icons/fa';

const CompnayJobs = () => {
  const { companyUrl } = useParams();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);

  // For modal
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/company/jobs', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteJob = async (id) => {
    if (!window.confirm('Delete this job?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/company/jobs/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchJobs();
    } catch (err) {
      console.error(err);
    }
  };

  const viewDetails = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedJob(null);
    setShowModal(false);
  };

  // Convert number to Roman numerals
  const toRoman = (num) => {
    const roman = ['M','CM','D','CD','C','XC','L','XL','X','IX','V','IV','I'];
    const val = [1000,900,500,400,100,90,50,40,10,9,5,4,1];
    let result = '';
    for (let i = 0; i < val.length; i++) {
      while (num >= val[i]) {
        num -= val[i];
        result += roman[i];
      }
    }
    return result;
  };

  return (
    <div className="p-6 flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-6xl flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-center flex-1">All Jobs List</h2>
        <Link
          to={`/company/${companyUrl}/jobs/create`}
          className="bg-blue-800 text-white px-4 py-2 rounded ml-4 hover:bg-blue-900 transition"
        >
          + Create Job
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto w-full max-w-6xl">
        <table className="w-full border border-gray-300 text-center">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">SI</th>
              <th className="border p-2">Title</th>
              <th className="border p-2">Location</th>
              <th className="border p-2">Salary</th>
              <th className="border p-2">Type</th>
              <th className="border p-2">View</th>
              <th className="border p-2">Update</th>
              <th className="border p-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {jobs.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center p-4">
                  No jobs found
                </td>
              </tr>
            ) : (
              jobs.map((job, index) => (
                <tr key={job.JobID} className="hover:bg-gray-100 transition">
                  <td className="border p-2">{toRoman(index + 1)}</td>
                  <td className="border p-2">{job.JobTitle}</td>
                  <td className="border p-2">{job.City}, {job.Country}</td>
                  <td className="border p-2">
                    {job.SalaryFrom} - {job.SalaryTo} {job.Currency}
                  </td>
                  <td className="border p-2 capitalize">{job.SalaryType}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => viewDetails(job)}
                      className="text-gray-600 hover:text-gray-900"
                      title="View Details"
                    >
                      <FaEye size={18} />
                    </button>
                  </td>
                  <td className="border p-2">
                    <button
                      onClick={() => navigate(`/company/${companyUrl}/jobs/edit/${job.JobID}`)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit Job"
                    >
                      <FaEdit size={18} />
                    </button>
                  </td>
                  <td className="border p-2">
                    <button
                      onClick={() => deleteJob(job.JobID)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete Job"
                    >
                      <FaTrash size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded shadow-lg max-w-md w-full p-6 relative">
            <h3 className="text-xl font-bold mb-4">{selectedJob.JobTitle}</h3>
            <p><strong>Description:</strong> {selectedJob.JobDescription || 'N/A'}</p>
            <p><strong>Address:</strong> {selectedJob.Address || 'N/A'}</p>
            <p><strong>State:</strong> {selectedJob.State || 'N/A'}</p>
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 font-bold text-lg"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompnayJobs;
