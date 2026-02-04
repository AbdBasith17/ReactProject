import React  from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RouteProtect({ children }) {
  const { user, loading } = useAuth();

  
  if (loading) return null;


  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}

export default RouteProtect;
