import { useEffect, useState, useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import api from "../../api/axios";

import { 
  useReactTable, 
  getCoreRowModel, 
  flexRender 
} from "@tanstack/react-table";
import { FaUserTie, FaEnvelope, FaPhone, FaFilePdf, FaInfoCircle } from "react-icons/fa";

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
      const res = await api.get(
        `/job/candidates/${jobId}`
      );
      setCandidates(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch candidates");
    }
  };

  // --- React Table Configuration ---
  const columns = useMemo(() => [
    {
      header: "SI",
      accessorFn: (row, i) => i + 1,
      cell: (info) => <span className="font-mono text-gray-500 font-semibold">{info.getValue()}</span>
    },
    {
      header: "Candidate Name",
      accessorFn: (row) => `${row.first_name} ${row.last_name}`,
      cell: (info) => (
        <div className="flex items-center gap-2 font-medium text-gray-800">
          <div className="bg-indigo-50 p-2 rounded-full text-indigo-600">
            <FaUserTie size={14} />
          </div>
          {info.getValue()}
        </div>
      )
    },
    {
      header: "Contact Info",
      accessorKey: "email", // Using email as key, but rendering both email and phone
      cell: ({ row }) => (
        <div className="flex flex-col text-sm">
          <div className="flex items-center gap-2 text-gray-700">
            <FaEnvelope className="text-gray-400" size={12} /> {row.original.email}
          </div>
          <div className="flex items-center gap-2 text-gray-500 mt-1">
            <FaPhone className="text-gray-400" size={12} /> {row.original.phone}
          </div>
        </div>
      )
    },
    {
      header: "About",
      accessorKey: "about",
      cell: (info) => (
        <div className="relative group cursor-help">
             <div className="flex items-center gap-2 text-gray-600">
                <FaInfoCircle className="text-gray-400"/>
                <span className="truncate max-w-50 block">{info.getValue()}</span>
             </div>
             {/* Simple Tooltip approach for long text */}
             <div className="absolute hidden group-hover:block z-10 bg-black text-white text-xs p-2 rounded w-64 -mt-10 shadow-lg">
                {info.getValue()}
             </div>
        </div>
      )
    },
    {
      header: "CV / Resume",
      accessorKey: "cv",
      cell: (info) => (
        info.getValue() ? (
          <a
            href={`https://backend.igltour.com/uploads/${info.getValue()}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border border-red-100"
          >
            <FaFilePdf /> Download
          </a>
        ) : (
          <span className="text-gray-400 text-sm italic">Not Provided</span>
        )
      )
    }
  ], []);

  const table = useReactTable({
    data: candidates,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8 text-center">
          <h2 className="text-gray-500 font-medium text-sm uppercase tracking-wider mb-2">Applicant Overview</h2>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Candidates for <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-blue-600">{jobTitle || `Job #${jobId}`}</span>
          </h1>
          <div className="mt-4 inline-flex items-center bg-purple-50 px-4 py-1 rounded-full border border-purple-100">
             <span className="text-purple-700 font-bold text-sm">{candidates.length} Applicants found</span>
          </div>
        </div>

        {/* Candidates Table */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          {candidates.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
               <div className="bg-gray-100 p-4 rounded-full mb-4">
                  <FaUserTie className="text-gray-400 text-4xl" />
               </div>
               <p className="text-lg text-gray-600 font-medium">No candidates have applied yet.</p>
               <p className="text-gray-400 text-sm">Wait for applicants to submit their CVs.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50/50 border-b border-gray-200">
                  {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map(header => (
                        <th key={header.id} className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {table.getRowModel().rows.map(row => (
                    <tr key={row.id} className="hover:bg-blue-50/30 transition-colors duration-200">
                      {row.getVisibleCells().map(cell => (
                        <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default JobCandidates;