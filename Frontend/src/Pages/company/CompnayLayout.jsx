import { Outlet } from "react-router-dom";
import SideNavbarCompany from "./SideNavCompnay.jsx";

const CompanyLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideNavbarCompany />

      <div className="flex-1 ">
        <header className="sticky top-0 bg-blue-900 text-white p-4 font-bold">
          Company Dashboard
        </header>

        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CompanyLayout;
