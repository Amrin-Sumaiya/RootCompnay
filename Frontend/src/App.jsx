import React from 'react';
import AuthGuard from './auth/AuthGuard.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from './Pages/AdminLayout.jsx';
import Create from './Pages/Create.jsx';
import Read from './Pages/Read.jsx';
import Dashboard from './Pages/Dashboard.jsx';
import RootLogin from './Pages/RootLogin.jsx';
import Home from './Componenets/Home.jsx';
import CompanyLayout from './Pages/company/CompnayLayout.jsx';
import CompanyDashboard from './Pages/company/CompnayDashboard.jsx';
import CompnayJobs from './Pages/company/CompnayJobs.jsx';
import CreateJob from './Pages/company/CreateJob.jsx';
import AllJobs from './Pages/company/AllJobs.jsx';
// import CompanyLogin from './Pages/company/CompanyLogin.jsx';

const App = () => {
  return (
    <Router>
<Routes>
  <Route path="/home" element={<Home />} />
  <Route path="/login" element={<RootLogin />} />

  {/* Public route for AllJobs */}
  <Route path="/company/all-jobs" element={<AllJobs />} />

  {/* Root dashboard - protected */}
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

  {/* Company dashboard - protected */}
  <Route
    path="/company/:companyUrl/*"
    element={
      <AuthGuard role="company">
        <CompanyLayout />
      </AuthGuard>
    }
  >
    <Route path="dashboard" element={<CompanyDashboard />} />
    <Route path="jobs" element={<CompnayJobs />} />
    <Route path="jobs/create" element={<CreateJob />} />
  </Route>
</Routes>

    </Router>
  );
};

export default App;
