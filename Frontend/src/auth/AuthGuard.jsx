import React from "react";
import { Navigate } from "react-router-dom";

// AuthGuard checks token + role from localStorage
const AuthGuard = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // If no token, redirect to login
  if (!token) return <Navigate to="/login" replace />;

  // If role is specified and doesn't match, redirect to login
  if (role && userRole !== role) return <Navigate to="/login" replace />;

  return children;
};

export default AuthGuard;
