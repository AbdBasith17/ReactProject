import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminRouteProtect({ children }) {
  const { user, loading } = useAuth();

  // Wait until auth state is resolved
  if (loading) return null;

  // Not logged in or not admin
  if (!user || user.role !== "admin") {
    return <Navigate to="/signin" replace />;
  }

  return children;
}

export default AdminRouteProtect;
