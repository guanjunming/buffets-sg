import { useAuth } from "../context/AuthContext.jsx";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ returnTo: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
