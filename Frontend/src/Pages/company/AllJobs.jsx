import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    about: "",
    cv: null,
  });

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

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedJob) return;

    try {
      const data = new FormData();
      data.append("firstName", formData.firstName);
      data.append("lastName", formData.lastName);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("about", formData.about);
      data.append("cv", formData.cv);
      data.append("jobId", selectedJob.JobID);
      data.append("jobTitle", selectedJob.JobTitle);
      data.append("companyName", selectedJob.CompanyName);
      data.append("companyUrl", selectedJob.Company_URL);

      const res = await axios.post("http://localhost:5000/api/job/apply", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert(res.data.message);
      setShowModal(false);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        about: "",
        cv: null,
      });
    } catch (err) {
      console.error(err);
      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert("Something went wrong!");
      }
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-extrabold mb-6 text-center text-gray-800">
        All Job Circular
      </h2>

      <div className="flex flex-col gap-6">
        {jobs.map((job) => (
          <div
            key={job.JobID}
            className="relative border rounded-xl p-4 shadow-sm bg-white hover:shadow-md transition-shadow duration-200"
          >
            <h3 className="text-lg font-bold text-gray-800 mb-1">
              {job.JobTitle}
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              {job.City}, {job.Country}
            </p>
            <p className="text-sm mb-2">
              <span className="font-medium">Company:</span>{" "}
              <Link
                to={`/company/${job.Company_URL.replace("/", "")}/dashboard`}
                className="text-blue-600"
              >
                {job.Company_URL}
              </Link>
            </p>
            <p className="text-sm mb-2">
              <span className="font-medium">Salary:</span> {job.SalaryFrom} - {job.SalaryTo} {job.Currency}
            </p>
            <span className="inline-block mb-3 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
              {job.SalaryType}
            </span>
            {job.JobDescription && <p className="text-sm text-gray-700 mb-2">{job.JobDescription}</p>}
            {job.Address && <p className="text-sm text-black mb-2"><span className="font-medium">Address:</span> {job.Address}</p>}

            <button
              onClick={() => {
                setSelectedJob(job);
                setShowModal(true);
              }}
              className="absolute bottom-1 right-1 bg-blue-800 text-white px-2 py-2 rounded-full text-sm hover:bg-green-700 transition-colors duration-200"
            >
              Apply Now
            </button>
          </div>
        ))}
      </div>

      {/* Apply Modal */}
      {showModal && selectedJob && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-sky-50 w-full max-w-md rounded-xl p-5 relative shadow-lg">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-lg font-bold text-gray-500 hover:text-black"
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold text-center mb-1">Apply For This Job</h2>
            <p className="text-center text-xl text-blue-600 font-bold mb-4">{selectedJob.JobTitle}</p>

            <form className="space-y-3" onSubmit={handleSubmit}>
              <div className="flex gap-3">
                <div className="w-1/2">
                  <label className="text-sm font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2 mt-1"
                    required
                  />
                </div>
                <div className="w-1/2">
                  <label className="text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2 mt-1"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2 mt-1"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2 mt-1"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">About Yourself</label>
                <textarea
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2 mt-1 h-20"
                  required
                ></textarea>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Upload CV</label>
                <input
                  type="file"
                  name="cv"
                  onChange={handleChange}
                  className="cursor-pointer bg-gray-100 border border-gray-300 text-sm rounded-lg block w-full mt-1
                    file:mr-55 file:py-1 file:px-2 file:rounded-md file:border-0
                    file:bg-gray-500 file:text-white hover:file:bg-blue-700"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-800 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Submit Application
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllJobs;
