import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function GuestRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return null;

 
  if (user) {
   
    if (user.role === "admin") {
      return <Navigate to="/admin/admindash" replace />;
    }
   
    return <Navigate to="/" replace />;
  }

 
  return children;
}

export default GuestRoute;