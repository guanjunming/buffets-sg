import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const ProtectedRoute = () => {
  const location = useLocation();
  const { loading, user } = useAuth();

  if (loading) {
    return null;
  }

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ returnTo: location }} replace />
  );
};

export default ProtectedRoute;
