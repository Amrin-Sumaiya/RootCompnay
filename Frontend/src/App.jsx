import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthGuard from "./auth/AuthGuard.jsx";

// Public Pages
import PublicLayout from "./layouts/PublicLayout.jsx";
import Home from "./Componenets/Hero.jsx";
import RootLogin from "./Pages/RootLogin.jsx";
import AllJobs from "./Pages/company/AllJobs.jsx";

// Root Dashboard Pages
import AdminLayout from "./Pages/AdminLayout.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import Create from "./Pages/Create.jsx";
import Read from "./Pages/Read.jsx";

// Company Dashboard Pages
import CompanyLayout from "./Pages/company/CompnayLayout.jsx";
import CompanyDashboard from "./Pages/company/CompnayDashboard.jsx";
import CompnayJobs from "./Pages/company/CompnayJobs.jsx";
import CreateJob from "./Pages/company/CreateJob.jsx";
import JobCandidates from "./Pages/company/JobCandidates.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}
        <Route element={<PublicLayout />}>
         
          <Route path="/hero" element={<Home />} />
          <Route path="/login" element={<RootLogin />} />
          <Route path="/company/all-jobs" element={<AllJobs />} />
        </Route>

        {/* ================= ROOT DASHBOARD (Protected) ================= */}
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

        {/* ================= COMPANY DASHBOARD (Protected) ================= */}
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
          <Route path="jobs/:jobId/candidates" element={<JobCandidates />} />

        </Route>
      </Routes>
    </Router>
  );
};

export default App;
