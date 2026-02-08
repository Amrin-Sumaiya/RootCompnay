import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthGuard from "./auth/AuthGuard.jsx";
import JobDetails from "./Pages/company/JobDetails.jsx";
import ProfessionalCourses from "./Pages/ProfessionalCourses.jsx";

// ================= PUBLIC PAGES =================
import PublicLayout from "./layouts/PublicLayout.jsx";
import Home from "./Componenets/Hero.jsx";
import RootLogin from "./Pages/RootLogin.jsx";
import AllJobs from "./Pages/company/AllJobs.jsx";
import AboutUss from "./Pages/company/AboutUss.jsx";
import CandidatesLogin from "./Pages/CandidatesLogin.jsx";

// ================= CANDIDATE PAGE =================
import Making from "./Pages/makingcv.jsx";
import MyProfile from "./Pages/MyProfile.jsx";

// ================= ROOT DASHBOARD =================
import AdminLayout from "./Pages/AdminLayout.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import Create from "./Pages/Create.jsx";
import Read from "./Pages/Read.jsx";

// ================= COMPANY DASHBOARD =================
import CompanyLayout from "./Pages/company/CompnayLayout.jsx";
import CompanyDashboard from "./Pages/company/CompnayDashboard.jsx";
import CompnayJobs from "./Pages/company/CompnayJobs.jsx";
import CreateJob from "./Pages/company/CreateJob.jsx";
import JobCandidates from "./Pages/company/JobCandidates.jsx";
import UpdateJobPost from "./Pages/company/UpdateJobPost.jsx";
import Companylogin from "./Pages/company/compnaylogin.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/aboutpage" element={<AboutUss />} />
          <Route path="/admin/login" element={<RootLogin />} />
          <Route path="/company/login" element={<Companylogin />} />
          <Route path="/company/all-jobs" element={<AllJobs />} />
          <Route path="/jobs/:companyUrl/:jobSlug" element={<JobDetails />} />
          <Route path="/candidateslogin" element={<CandidatesLogin />} />
        </Route>

        {/* ================= CANDIDATE CV (PROTECTED) ================= */}
<Route
  path="/makingcv"
  element={
    <AuthGuard role={2}>
      <Making />
    </AuthGuard>
  }
/>
<Route path="/candidate/my-profile" element={
  <AuthGuard role={2}>
    <MyProfile />
  </AuthGuard>
} /> 



        {/* ================= ROOT DASHBOARD (PROTECTED) ================= */}
<Route
  path="/admin"
  element={
    <AuthGuard role={0}>
      <AdminLayout />
    </AuthGuard>
  }
>
  <Route path="dashboard" element={<Dashboard />} />
  <Route path="create" element={<Create />} />
  <Route path="read" element={<Read />} />
  <Route path="professional-courses" element={<ProfessionalCourses />} />
</Route>


        {/* ================= COMPANY DASHBOARD (PROTECTED) ================= */}
        <Route
          path="/company/:companyUrl"
          element={
            <AuthGuard role={1}>
              <CompanyLayout />
            </AuthGuard>
          }
        >
           <Route index element={<CompanyDashboard />} />
          <Route path="dashboard" element={<CompanyDashboard />} />
          <Route path="jobs" element={<CompnayJobs />} />
          <Route path="jobs/create" element={<CreateJob />} />
          <Route path="jobs/edit/:id" element={<UpdateJobPost />} />
          <Route path="jobs/:jobId/candidates" element={<JobCandidates />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
