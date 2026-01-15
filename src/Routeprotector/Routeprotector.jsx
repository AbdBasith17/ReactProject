import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RouteProtect({ children }) {
  const { user, loading } = useAuth();

  // Wait until auth state is resolved
  if (loading) return null;

  // Not logged in → redirect to signin
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}

export default RouteProtect;
