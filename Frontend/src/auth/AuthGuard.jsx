import { Navigate } from 'react-router-dom';
import { getAuth } from './auth';

const AuthGuard = ({ children, role }) => {
  const user = getAuth();

  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/login" />;

  return children;
};

export default AuthGuard;
