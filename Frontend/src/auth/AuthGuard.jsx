import { Navigate } from "react-router-dom";

const AuthGuard = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const userRole = Number(localStorage.getItem("role"));

  // No token → redirect based on expected role
  if (!token) {
    if (role === 2) return <Navigate to="/candidateslogin" replace />;
    if (role === 1) return <Navigate to="/company/login" replace />;
    if (role === 0) return <Navigate to="/admin/login" replace />;
    return <Navigate to="/" replace />; // fallback
  }

  // Logged in but role mismatch → redirect to respective login
  if (role !== undefined && userRole !== role) {
    if (role === 2) return <Navigate to="/candidateslogin" replace />;
    if (role === 1) return <Navigate to="/company/login" replace />;
    if (role === 0) return <Navigate to="/admin/login" replace />;
    return <Navigate to="/" replace />; // fallback
  }

  return children;
};

export default AuthGuard;
