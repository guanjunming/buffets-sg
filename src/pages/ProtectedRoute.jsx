import { useAuth } from "../context/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ returnTo: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
