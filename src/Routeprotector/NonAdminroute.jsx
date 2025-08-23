import React from "react";
import { Navigate } from "react-router-dom";

function NonAdminRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.role == "admin") {
    return <Navigate to="/admin/admindash" replace />;
  }

  return children;
}

export default NonAdminRoute
