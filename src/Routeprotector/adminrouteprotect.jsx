import React from "react";
import { Navigate } from "react-router-dom";

function AdminRouteProtect({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "admin") {
    return <Navigate to="/signin" replace />;
  }

  return children;
}

export default AdminRouteProtect;
