import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./pages/sidebar";

function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-white">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 w-full transition-all duration-300 ease-in-out lg:ml-64">
        {/* - lg:ml-64: Only applies the margin on large screens (desktop).
          - flex-1: Allows the main area to grow and fill remaining space.
          - p-4 md:p-8: Responsive padding for different devices.
        */}
        <div className="min-h-screen">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;