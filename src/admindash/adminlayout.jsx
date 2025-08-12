import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./pages/sidebar";

function AdminLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 p-6 w-full bg-white min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
export default AdminLayout
