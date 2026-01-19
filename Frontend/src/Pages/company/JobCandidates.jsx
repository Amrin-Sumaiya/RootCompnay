import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";

const JobCandidates = () => {
  const { state } = useLocation();
  const { jobId } = useParams();

  const [candidates, setCandidates] = useState([]);
  const jobTitle = state?.jobTitle;

  useEffect(() => {
    fetchCandidates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCandidates = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/job/candidates/${jobId}`
      );
      setCandidates(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch candidates");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/*  Job Title Heading */}
      <h2 className="text-2xl font-bold text-center mb-6">
        Candidates for <span className="text-4xl text-purple-900">{jobTitle || `Job ID ${jobId}`}</span>
      </h2>

      {/* Candidates Table */}
      {candidates.length === 0 ? (
        <p className="text-center text-gray-600">
          No candidates have applied for this job yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 text-center">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-2">SI</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Phone</th>
                <th className="border p-2">About</th>
                <th className="border p-2">View CV</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((c, i) => (
                <tr key={c.id} className="hover:bg-gray-100 transition">
                  <td className="border p-2">{i + 1}</td>
                  <td className="border p-2">
                    {c.first_name} {c.last_name}
                  </td>
                  <td className="border p-2">{c.email}</td>
                  <td className="border p-2">{c.phone}</td>
                  <td className="border p-2">{c.about}</td>
                  <td className="border p-2">
                    {c.cv ? (
                      <a
                        href={`http://localhost:5000/uploads/${c.cv}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Download
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default JobCandidates;
