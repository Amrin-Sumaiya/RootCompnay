import { useEffect, useState, useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import api from "../../api/axios";

import { 
  FaTrash, 
  FaEdit, 
  FaEye, 
  FaUsers, 
  FaMapMarkerAlt, 
  FaMoneyBillWave, 
  FaBriefcase,
  FaTimes,
  FaCheckCircle
} from 'react-icons/fa';
import { 
  useReactTable, 
  getCoreRowModel, 
  getPaginationRowModel, 
  getFilteredRowModel,
  flexRender 
} from '@tanstack/react-table';

const CompanyJobs = () => {
  const { companyUrl } = useParams();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  // Search/Filter State
  const [globalFilter, setGlobalFilter] = useState('');

  useEffect(() => {
    fetchJobs();
 
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await api.get('/jobs/jobs', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteJob = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;
    try {
      await api.delete(`/company/jobs/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setJobs(prev => prev.filter(job => job.JobID !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const openModal = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => setSelectedJob(null), 200);
  };

  // --- React Table Columns ---
  const columns = useMemo(() => [
    {
      header: 'SI',
      // UPDATED: Now returns normal numbers (1, 2, 3...)
      accessorFn: (row, i) => i + 1,
      cell: info => <span className="font-mono text-gray-500 font-semibold">{info.getValue()}</span>,
      size: 50,
    },
    {
      header: 'Job Title',
      accessorKey: 'JobTitle',
      cell: info => <span className="font-bold text-gray-800">{info.getValue()}</span>,
    },
    {
      header: 'Experience',
      accessorFn: row => `${row.Experience} years`,
      cell: info => (
        <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
          < FaBriefcase className="text-gray-400" /> {info.getValue()}
        </div>
      )
    },
    {
      header: 'Salary',
      accessorFn: row => `${row.SalaryFrom} - ${row.SalaryTo} ${row.Currency}`,
      cell: info => (
        <div className="flex items-center justify-center gap-1 text-sm text-gray-600 font-medium">
           {info.getValue()}
        </div>
      )
    },
    {
      header: 'Type',
      accessorKey: 'SalaryType',
      cell: info => (
        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-50 text-blue-700 border border-blue-100 capitalize">
          {info.getValue()}
        </span>
      )
    },
    {
      header: 'Candidates',
      id: 'candidates',
      cell: ({ row }) => (
        <button
          onClick={() => navigate(`/company/${companyUrl}/jobs/${row.original.JobID}/candidates`, { state: { jobTitle: row.original.JobTitle } })}
          className="flex items-center justify-center gap-2 mx-auto py-1.5 px-3 text-xs font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-md transition-colors"
        >
          <FaUsers size={14} /> View List
        </button>
      )
    },
    {
      header: 'Veiw Details',
      id: 'veiw',
      cell: ({ row }) => (
        <div className="flex justify-center  items-center gap-3">
          <button onClick={() => openModal(row.original)} className=" text-blue-900 hover:text-blue-600 transition-colors p-1" title="View Details">
            <FaEye size={18} />
          </button>

        </div>
      )
    },
        {
      header: 'Update',
      id: 'update',
      cell: ({ row }) => (
        <div className="flex justify-center items-center gap-3">

          <button
            onClick={() => navigate(`/company/${companyUrl}/jobs/edit/${row.original.JobID}`)}
            className="text-green-700 hover:text-green-300 transition-colors p-1"
            title="Edit"
          >
            <FaEdit size={18} />
          </button>

        </div>
      )
    },
        {
      header: 'Delete',
      id: 'delete',
      cell: ({ row }) => (
        <div className="flex justify-center items-center gap-3">

          <button onClick={() => deleteJob(row.original.JobID)} className="text-red-600 hover:text-red-400 transition-colors p-1" title="Delete">
            <FaTrash size={17} />
          </button>
        </div>
      )
    }
  ], [companyUrl, navigate]);

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: jobs,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageSize: 10 },
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* --- Header Section --- */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-800">Job Management</h2>
            <p className="text-gray-500 text-sm mt-1">Manage your posted jobs and candidates</p>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
             <input
                type="text"
                value={globalFilter ?? ''}
                onChange={e => setGlobalFilter(e.target.value)}
                placeholder="Search jobs..."
                className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
              />
            <Link
              to={`/company/${companyUrl}/jobs/create`}
              className="flex items-center justify-center gap-2 bg-linear-to-r from-blue-700 to-blue-900 text-white px-5 py-2.5 rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 text-sm font-medium whitespace-nowrap"
            >
              + Create Job
            </Link>
          </div>
        </div>

        {/* --- Table Section --- */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 border-b border-gray-200">
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <th key={header.id} className="px-6 py-4 text-sm font-bold text-gray-600 uppercase tracking-wider text-center first:text-left">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="divide-y divide-gray-100">
                {table.getRowModel().rows.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length} className="px-6 py-10 text-center text-gray-400 italic">
                      No jobs found. Start by creating one!
                    </td>
                  </tr>
                ) : (
                  table.getRowModel().rows.map(row => (
                    <tr key={row.id} className="hover:bg-blue-50/50 transition-colors duration-150">
                      {row.getVisibleCells().map(cell => (
                        <td key={cell.id} className="px-6 py-4 text-sm text-center first:text-left whitespace-nowrap">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* --- Pagination --- */}
          {jobs.length > 10 && (
             <div className="flex items-center justify-between px-6 py-3 border-t border-gray-200 bg-gray-50">
               <span className="text-sm text-gray-500">
                 Showing Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
               </span>
               <div className="flex gap-2">
                 <button
                   onClick={() => table.previousPage()}
                   disabled={!table.getCanPreviousPage()}
                   className="px-3 py-1 border rounded hover:bg-gray-200 disabled:opacity-50 text-sm"
                 >
                   Previous
                 </button>
                 <button
                   onClick={() => table.nextPage()}
                   disabled={!table.getCanNextPage()}
                   className="px-3 py-1 border rounded hover:bg-gray-200 disabled:opacity-50 text-sm"
                 >
                   Next
                 </button>
               </div>
             </div>
          )}
        </div>
      </div>

      {/* --- RE-DESIGNED BEAUTIFUL MODAL --- */}
      {showModal && selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" 
            onClick={closeModal}
          ></div>
          
          <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200 border-t-4 border-indigo-600">
            
            {/* 1. Modal Header (Fixed) */}
            <div className="bg-white px-6 py-4 border-b border-gray-100 flex justify-between items-center sticky top-0 z-10">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <FaBriefcase className="text-indigo-600" />
                Job Overview
              </h3>
              <button 
                onClick={closeModal} 
                className="text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 p-2 rounded-full transition-all duration-200"
              >
                <FaTimes />
              </button>
            </div>

            {/* 2. Modal Body (Scrollable) */}
            <div className="p-6 overflow-y-auto max-h-[70vh] custom-scrollbar">
              
              {/* Hero Section */}
              <div className="mb-6">
                <h2 className="text-2xl font-extrabold text-gray-900 leading-tight">{selectedJob.JobTitle}</h2>
                <div className="flex items-center gap-2 mt-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span> Active
                  </span>
                  <span className="text-sm text-gray-500">Posted in {selectedJob.City}, {selectedJob.Country}</span>
                </div>
              </div>

              {/* Key Metrics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-linear-to-br from-blue-50 to-white p-4 rounded-xl border border-blue-100 shadow-sm">
                  <span className="block text-blue-500 text-xs uppercase font-bold mb-1 tracking-wider">Salary Range</span>
                  <div className="flex items-center gap-2 text-gray-800 font-bold text-lg">
                    <FaMoneyBillWave className="text-blue-500 text-xl" />
                    {selectedJob.SalaryFrom} - {selectedJob.SalaryTo} <span className="text-sm font-normal text-gray-500">{selectedJob.Currency}</span>
                  </div>
                  <span className="text-xs text-gray-500 mt-1 capitalize">{selectedJob.SalaryType}</span>
                </div>
                
                <div className="bg-linear-to-br from-indigo-50 to-white p-4 rounded-xl border border-indigo-100 shadow-sm">
                  <span className="block text-indigo-500 text-xs uppercase font-bold mb-1 tracking-wider">Location & Type</span>
                  <div className="flex items-center gap-2 text-gray-800 font-bold text-lg">
                     <FaMapMarkerAlt className="text-indigo-500 text-xl" />
                     {selectedJob.JobLocation}
                  </div>
                  <span className="text-xl text-gray-900 mt-1 capitalize">{selectedJob.JobType}</span>
                </div>
              </div>

              {/* Description Blocks */}
              <div className="space-y-6">
                
                {/* Job Description */}
                <div>
                   <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide border-l-4 border-indigo-500 pl-3 mb-3">
                     Job Description
                   </h4>
                   <div className="text-gray-600 text-sm leading-relaxed bg-gray-50 p-4 rounded-lg">
                     {selectedJob.JobDescription || "No description provided."}
                   </div>
                </div>

                {/* Grid Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                      <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide border-l-4 border-purple-500 pl-3 mb-3">
                        Qualifications
                      </h4>
                      <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded-lg">
                        {selectedJob.Qualifications || "N/A"}
                      </p>
                   </div>
                   <div>
                      <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide border-l-4 border-teal-500 pl-3 mb-3">
                        Benefits
                      </h4>
                      <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded-lg">
                         {selectedJob.Benefits || "N/A"}
                      </p>
                   </div>
                </div>

                {/* Skills */}
                <div>
                  <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide border-l-4 border-orange-500 pl-3 mb-3">
                     Required Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.Skills ? (
                      selectedJob.Skills.split(',').map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-semibold text-gray-700 shadow-sm">
                          {skill.trim()}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-400 text-sm">No specific skills listed.</span>
                    )}
                  </div>
                </div>

                {/* Extra Details */}
                <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-4 mt-4">
                  <div>
                    <span className="text-xs text-gray-900 font-bold uppercase block mb-1">Responsibilities</span>
                    <p className="text-xs text-gray-600">{selectedJob.JobResponsibilities ? (selectedJob.JobResponsibilities.substring(0, 100) + '...') : "N/A"}</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-900 font-bold uppercase block mb-1">Vacation Policy</span>
                    <div className="flex items-center gap-1 text-sm text-gray-700">
                      <FaCheckCircle className="text-green-500 text-xs" /> 
                      {selectedJob.WeeklyVacation}
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* 3. Modal Footer (Fixed) */}
            <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 sticky bottom-0 border-t border-gray-100">
              <button 
                onClick={closeModal}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium text-sm transition-colors shadow-sm"
              >
                Close
              </button>
              <button 
                onClick={() => navigate(`/company/${companyUrl}/jobs/edit/${selectedJob.JobID}`)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium text-sm transition-colors shadow-sm flex items-center gap-2"
              >
                <FaEdit /> Edit Job
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyJobs;