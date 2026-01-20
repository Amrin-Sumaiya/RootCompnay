import { useEffect, useState, useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  FaTrash, 
  FaEdit, 
  FaEye, 
  FaUsers, 
  FaMapMarkerAlt, 
  FaMoneyBillWave, 
  FaBriefcase,
  FaTimes
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
    // eslint-disable-next-line
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
    if (!window.confirm('Are you sure you want to delete this job?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/company/jobs/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      // Optimistic UI update or refetch
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
    setTimeout(() => setSelectedJob(null), 200); // Clear after animation
  };

  // Helper: Roman Numerals
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

  // --- React Table Columns Configuration ---
  const columns = useMemo(() => [
    {
      header: 'SI',
      accessorFn: (row, i) => toRoman(i + 1),
      cell: info => <span className="font-mono text-gray-500 font-semibold">{info.getValue()}</span>,
      size: 500,
    },
    {
      header: 'Job Title',
      accessorKey: 'JobTitle',
      cell: info => <span className="font-bold text-gray-800">{info.getValue()}</span>,
    },
    {
      header: 'Location',
      accessorFn: row => `${row.City}, ${row.Country}`,
      cell: info => (
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <FaMapMarkerAlt className="text-gray-400" /> {info.getValue()}
        </div>
      )
    },
    {
      header: 'Salary',
      accessorFn: row => `${row.SalaryFrom} - ${row.SalaryTo} ${row.Currency}`,
      cell: info => (
        <div className="flex items-center gap-1 text-sm text-gray-600">
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
          className="flex items-center justify-center gap-2 w-full py-1.5 px-3 text-xs font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-md transition-colors"
        >
          <FaUsers size={14} /> View List
        </button>
      )
    },
    {
      header: 'Veiw Details',
      id: 'detailss',
      cell: ({ row }) => (
        <div className="flex justify-center items-center gap-3">
          <button onClick={() => openModal(row.original)} className="text-blue-900 hover:text-blue-600 transition-colors" title="View Details">
            <FaEye size={18} />
          </button>
        </div>
      )
    },
        {
      header: 'Update',
      id: 'edit',
      cell: ({ row }) => (
        <div className="flex justify-center items-center gap-3">

          <button onClick={() => navigate(`/company/${companyUrl}/jobs/edit/${row.original.JobID}`)} className="text-blue-500 hover:text-green-600 transition-colors" title="Edit">
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
          <button onClick={() => deleteJob(row.original.JobID)} className="text-red-500 hover:text-red-800 transition-colors" title="Delete">
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
        <div className="bg-white rounded-xl shadow-sm border border-gray-400 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 border-b border-gray-200">
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <th key={header.id} className="px-6 py-4 text-sm font-bold text-blue-800 uppercase tracking-wider text-center first:text-left">
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
                    <tr key={row.id} className="hover:bg-blue-50/30 transition-colors duration-150 group">
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

      {/* --- Beautiful Modal --- */}
      {showModal && selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" onClick={closeModal}></div>
          
          <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-linear-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <FaBriefcase className="text-blue-600" />
                Job Details
              </h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 p-1.5 rounded-full transition-colors">
                <FaTimes />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900">{selectedJob.JobTitle}</h2>
                <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full uppercase tracking-wide">
                  Active
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <span className="block text-gray-400 text-xs uppercase font-bold mb-1">Salary Range</span>
                  <div className="flex items-center gap-2 text-gray-700 font-medium">
                     <FaMoneyBillWave className="text-green-500" />
                     {selectedJob.SalaryFrom} - {selectedJob.SalaryTo} {selectedJob.Currency}
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <span className="block text-gray-400 text-xs uppercase font-bold mb-1">Location</span>
                  <div className="flex items-center gap-2 text-gray-700 font-medium">
                     <FaMapMarkerAlt className="text-red-400" />
                     {selectedJob.City}, {selectedJob.Country}
                  </div>
                </div>
              </div>

              <div>
                <span className="block text-gray-400 text-xs uppercase font-bold mb-2">Description</span>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-gray-600 leading-relaxed max-h-40 overflow-y-auto text-sm">
                  {selectedJob.JobDescription || "No description provided."}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 pt-2 border-t border-gray-100">
                 <div>
                    <span className="font-semibold text-gray-900">Address:</span> <br/>
                    {selectedJob.Address || "N/A"}
                 </div>
                 <div>
                    <span className="font-semibold text-gray-900">State:</span> <br/>
                    {selectedJob.State || "N/A"}
                 </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-6 py-4 flex justify-end">
              <button 
                onClick={closeModal}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium text-sm transition-colors shadow-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyJobs;