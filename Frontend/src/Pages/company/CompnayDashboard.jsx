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

  if (!company) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold">{company.CompanyName} Dashboard</h2>
      <p>URL: {company.Company_URL}</p>
      <p>Founded d Date: {company.FoundedDate}</p>
    </div>


  );
};

export default CompanyDashboard;
