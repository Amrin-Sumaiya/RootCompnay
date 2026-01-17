import { useEffect, useState } from 'react';
import api from '../../api/axios';

const CompanyDashboard = () => {
  const [company, setCompany] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get('/comp/company/dashboard', {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Option 1: format date here before saving
        if (res.data.FoundedDate) {
          res.data.FoundedDate = res.data.FoundedDate.split('T')[0]; // "YYYY-MM-DD"
        }

        setCompany(res.data);
      } catch (err) {
        console.error('Error fetching company dashboard:', err);
      }
    };

    fetchDashboard();
  }, []);

 if (!company) {
  return (
    <div className="flex items-center justify-center h-64">
      <p className="text-gray-500 text-lg">Loading company dashboard...</p>
    </div>
  );
}

  return (
  <div className="w-full">
    {/* Page Title */}
    <div className="mb-6">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
        {company.CompanyName}
      </h2>
      <p className="text-gray-500">Company Dashboard Overview</p>
    </div>

    {/* Main Card */}
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Company URL */}
        <div className="bg-green-100 rounded-xl p-4">
          <p className="text-sm text-black mb-1">Company Website</p>
          <a
            href={company.Company_URL}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 font-medium hover:underline break-all"
          >
            {company.Company_URL}
          </a>
        </div>

        {/* Founded Date */}
        <div className="bg-red-100 rounded-xl p-4">
          <p className="text-sm text-red-800 mb-1">Founded Date</p>
          <p className="text-gray-800 font-medium">
            {company.FoundedDate}
          </p>
        </div>
      </div>
    </div>
  </div>


  );
};

export default CompanyDashboard;
