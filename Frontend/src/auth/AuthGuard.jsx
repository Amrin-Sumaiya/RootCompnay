import { Navigate } from "react-router-dom";

const AuthGuard = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const userRole = Number(localStorage.getItem("role"));

if (!token) {
  return <Navigate to="/company/login" replace />;
}

if (role !== undefined && userRole !== role) {
  return <Navigate to="/company/login" replace />;
}


  return children;
};

export default AuthGuard;
