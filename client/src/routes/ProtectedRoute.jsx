import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const { token } = useAuth();
  const location = useLocation();

  if (!token) {
    // ✅ redirect to login & remember where user came from
    return <Navigate to="/admin" state={{ from: location }} replace />;
  }

  return children;
}