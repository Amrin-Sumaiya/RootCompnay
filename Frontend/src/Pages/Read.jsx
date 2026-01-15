import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaTrash, FaEdit } from 'react-icons/fa';

const Read = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [editData, setEditData] = useState({
    CompanyName: '',
    CompanyCode: '',
    Company_URL: '',
    FoundedDate: '',
  });

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/igl/get_company');
      setCompanies(Array.isArray(res.data.data) ? res.data.data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const openModal = (company) => {
    setSelectedCompany(company);
    setEditData({
      CompanyName: company.CompanyName,
      CompanyCode: company.CompanyCode,
      Company_URL: company.Company_URL || '',
      FoundedDate: company.FoundedDate
        ? new Date(company.FoundedDate).toISOString().split('T')[0]
        : '',
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCompany(null);
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/igl/update_company/${selectedCompany.CompanyID}`,
        editData
      );
      fetchCompanies();
      closeModal();
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert('Update failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this company?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/igl/delete_company/${id}`);
      fetchCompanies();
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert('Delete failed');
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto mt-10 p-6 bg-white dark:bg-gray-900 rounded-xl shadow">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-semibold">Company List</h1>
        <Link to="/" className="px-4 py-2 bg-gray-600 text-white rounded-lg">
          Dashboard
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-black rounded-lg ">
          <thead className="bg-gray-100 dark:bg-gray-800 p-3 border-black">
            <tr>
              {[
                'ID',
                'Company Name',
                'Code',
                'Type',
                'Company URL',
                'Founded',
                'Edit',
                'Delete',
              ].map((h) => (
                <th key={h} className="p-3 border text-left">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {companies.map((c, i) => (
              <tr key={c.CompanyID} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="p-3 border">{445000 + i}</td>
                <td className="p-3 border">{c.CompanyName}</td>
                <td className="p-3 border">{c.CompanyCode}</td>
                <td className="p-3 border">{c.CompanyType || 'N/A'}</td>
                <td className="p-3 border">{c.Company_URL || 'N/A'}</td>
                <td className="p-3 border">
                  {c.FoundedDate
                    ? new Date(c.FoundedDate).toISOString().split('T')[0]
                    : 'N/A'}
                </td>
                <td className="p-3 border text-center">
                  <button
                    onClick={() => openModal(c)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEdit />
                  </button>
                </td>
                <td className="p-3 border text-center">
                  <button
                    onClick={() => handleDelete(c.CompanyID)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={closeModal}
          />

          {/* Modal Box */}
          <div className="relative w-full max-w-lg bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 animate-scaleIn">
            <h2 className="text-xl font-semibold mb-5">Update Company</h2>

            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                type="text"
                name="CompanyName"
                value={editData.CompanyName}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                placeholder="Company Name"
              />

              <input
                type="text"
                name="CompanyCode"
                value={editData.CompanyCode}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                placeholder="Company Code"
              />

              <input
                type="text"
                name="Company_URL"
                value={editData.Company_URL}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                placeholder="Company URL"
              />

              <input
                type="date"
                name="FoundedDate"
                value={editData.FoundedDate}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded-lg bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Read;
