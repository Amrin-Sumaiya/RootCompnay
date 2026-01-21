import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaTrash, FaEdit, FaLink, FaCalendarAlt, FaBuilding, FaSearch } from 'react-icons/fa'; // Added FaSearch
import { 
  useReactTable, 
  getCoreRowModel, 
  getFilteredRowModel, // Added for search functionality
  flexRender 
} from '@tanstack/react-table';

const Read = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search State
  const [globalFilter, setGlobalFilter] = useState('');

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // --- React Table Configuration ---
  const columns = useMemo(() => [
    {
      header: 'ID',
      accessorFn: (row, i) => 445000 + i, 
      cell: (info) => <span className="font-mono text-gray-500 font-semibold text-sm">{info.getValue()}</span>
    },
    {
      header: 'Company Name',
      accessorKey: 'CompanyName',
      cell: (info) => (
        <div className="flex items-center gap-2">
            <div className="bg-blue-50 p-1.5 rounded text-blue-600">
                <FaBuilding size={12}/>
            </div>
            <span className="font-bold text-gray-700">{info.getValue()}</span>
        </div>
      )
    },
    {
      header: 'Code',
      accessorKey: 'CompanyCode',
      cell: (info) => <span className="px-2 py-1 bg-gray-100 rounded text-xs font-mono font-medium">{info.getValue()}</span>
    },
    {
      header: 'Type',
      accessorKey: 'CompanyType',
      cell: (info) => info.getValue() || <span className="text-gray-400 italic text-sm">N/A</span>
    },
    {
      header: 'Company URL',
      accessorKey: 'Company_URL',
      cell: (info) => (
         info.getValue() ? (
            <a href={info.getValue()} target="_blank" rel="noreferrer" className="text-blue-500 hover:text-blue-700 flex items-center gap-1 text-sm">
                <FaLink size={10} /> {info.getValue()}
            </a>
         ) : <span className="text-gray-400 italic text-sm">N/A</span>
      )
    },
    {
      header: 'Founded',
      accessorKey: 'FoundedDate',
      cell: (info) => (
        info.getValue() ? (
            <div className="flex items-center gap-1 text-gray-600 text-sm">
                <FaCalendarAlt size={12} className="text-gray-400" />
                {new Date(info.getValue()).toISOString().split('T')[0]}
            </div>
        ) : <span className="text-gray-400 italic text-sm">N/A</span>
      )
    },
    {
      header: 'Edit',
      id: 'edit',
      cell: ({ row }) => (
        <button
          onClick={() => openModal(row.original)}
          className="p-2 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-500 hover:text-white transition-all shadow-sm"
        >
          <FaEdit />
        </button>
      )
    },
    {
      header: 'Delete',
      id: 'delete',
      cell: ({ row }) => (
        <button
          onClick={() => handleDelete(row.original.CompanyID)}
          className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all shadow-sm"
        >
          <FaTrash />
        </button>
      )
    }
  ], [handleDelete]); 

  const table = useReactTable({
    data: companies,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), // Required for filtering
    state: {
      globalFilter, // Pass the search state
    },
    onGlobalFilterChange: setGlobalFilter, // Update state on change
  });

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
        <p className="text-gray-500 font-medium">Loading companies...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section with Search */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="w-full md:w-auto">
               <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Company List</h1>
               <p className="text-gray-500 text-sm mt-1">Manage all registered companies</p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto items-center">
                {/* Search Input */}
                <div className="relative w-full md:w-64">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaSearch className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        value={globalFilter ?? ''}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                        placeholder="Search companies..."
                    />
                </div>

                <Link 
                    to="/" 
                    className="w-full md:w-auto px-6 py-2.5 bg-gray-800 text-white font-medium rounded-xl hover:bg-gray-900 transition-all shadow-lg shadow-gray-200 text-center"
                >
                    Dashboard
                </Link>
            </div>
        </div>

        {/* React Table Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 border-b border-gray-200">
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <th key={header.id} className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-left">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="divide-y divide-gray-100">
                {table.getRowModel().rows.length === 0 ? (
                    <tr>
                        <td colSpan="8" className="text-center p-8 text-gray-500 italic">
                             {companies.length === 0 ? "No companies found." : "No matching results found."}
                        </td>
                    </tr>
                ) : (
                    table.getRowModel().rows.map(row => (
                    <tr key={row.id} className="hover:bg-blue-50/40 transition-colors duration-200">
                        {row.getVisibleCells().map(cell => (
                        <td key={cell.id} className="p-4 whitespace-nowrap">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                        ))}
                    </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* MODAL (Same as before) */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
              onClick={closeModal}
            />
            <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all animate-scaleIn">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                  <h2 className="text-lg font-bold text-gray-800">Update Company</h2>
              </div>
              <div className="p-6">
                <form onSubmit={handleUpdate} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Company Name</label>
                    <input
                        type="text"
                        name="CompanyName"
                        value={editData.CompanyName}
                        onChange={handleChange}
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                        placeholder="Enter company name"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Code</label>
                        <input
                            type="text"
                            name="CompanyCode"
                            value={editData.CompanyCode}
                            onChange={handleChange}
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                            placeholder="CODE"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Founded Date</label>
                        <input
                            type="date"
                            name="FoundedDate"
                            value={editData.FoundedDate}
                            onChange={handleChange}
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                        />
                      </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Company URL</label>
                    <input
                        type="text"
                        name="Company_URL"
                        value={editData.Company_URL}
                        onChange={handleChange}
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                        placeholder="https://example.com"
                    />
                  </div>
                  <div className="flex justify-end gap-3 pt-4 mt-2 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-5 py-2.5 rounded-lg text-gray-600 bg-gray-100 hover:bg-gray-200 font-medium transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-lg shadow-blue-500/30 transition-all"
                    >
                      Update Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Read;