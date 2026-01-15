import { Link, useLocation, useParams } from 'react-router-dom';
import { FaTachometerAlt, FaBoxOpen, FaSignOutAlt } from 'react-icons/fa';

const SideNavbarCompany = () => {
  const location = useLocation();
  const { companyUrl } = useParams(); // get current company URL from route

  const menuItems = [
    { name: 'Dashboard', path: `/company/${companyUrl}/dashboard`, icon: <FaTachometerAlt /> },
    { name: 'Staffs', path: `/company/${companyUrl}/staffs`, icon: <FaBoxOpen /> }, // Example
  ];

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col h-screen shadow-lg">
      <div className="p-6 text-2xl font-bold border-b border-gray-700">
        Company Panel
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center p-2 rounded hover:bg-gray-700 transition ${
              location.pathname === item.path ? 'bg-gray-700' : ''
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>
      <button
        onClick={logout}
        className="flex items-center p-2 m-4 rounded bg-red-400 hover:bg-red-700 transition"
      >
        <FaSignOutAlt className="mr-2" />
        Logout
      </button>
    </div>
  );
};

export default SideNavbarCompany;
