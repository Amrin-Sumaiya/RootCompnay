import React from 'react';
import AuthGuard from './auth/AuthGuard.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from './Pages/AdminLayout.jsx';
import Create from './Pages/Create.jsx';
import Read from './Pages/Read.jsx';
import Dashboard from './Pages/Dashboard.jsx';
import RootLogin from './Pages/RootLogin.jsx';

import CompanyLayout from './Pages/company/CompnayLayout.jsx';
import CompanyDashboard from './Pages/company/CompnayDashboard.jsx';
// import CompanyLogin from './Pages/company/CompanyLogin.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<RootLogin />} />

        {/* Root dashboard */}
        <Route
          path="/*"
          element={
            <AuthGuard role="root">
              <AdminLayout />
            </AuthGuard>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="create" element={<Create />} />
          <Route path="read" element={<Read />} />
        </Route>

        {/* Company dashboard */}
        <Route
          path="/company/:companyUrl/*"
          element={
            <AuthGuard role="company">
              <CompanyLayout />
            </AuthGuard>
          }
        >
          <Route path="dashboard" element={<CompanyDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
