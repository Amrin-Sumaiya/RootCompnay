import { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

const RootLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [companyUrl, setCompanyUrl] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post('/auth/login', {
        username: username || undefined,
        password: password || undefined,
        company_url: companyUrl || undefined,
      });

      localStorage.setItem('token', res.data.token);

      if (res.data.role === 'root') {
        navigate('/'); // root dashboard
      } else if (res.data.role === 'company') {
        navigate(`/company/${res.data.company.Company_URL}/dashboard`);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow w-96">
        <h2 className="text-xl font-bold mb-4">Login</h2>
          
          <h2>Root/ Compnay Name</h2>
        <input
          placeholder="Root Username (optional)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border mb-3"
        />
        <h2>Root Password(Optional)</h2>
        <input
          type="password"
          placeholder="Root Password (optional)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border mb-3"
        />
         <h2>Compnay_URL</h2>
        <input
          placeholder="Company URL (optional)"
          value={companyUrl}
          onChange={(e) => setCompanyUrl(e.target.value)}
          className="w-full p-2 border mb-4"
        />

        <button className="w-full bg-blue-600 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default RootLogin;
