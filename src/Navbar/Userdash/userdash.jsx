import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaBox, FaMapMarkerAlt, FaUser, FaSignOutAlt } from "react-icons/fa";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import UserDetails from "./userdetails";
import UserOrders from "./UserOrders";
import UserAddresses from "./UserAddresses";

function UserDashboard() {
  const [activeTab, setActiveTab] = useState("orders");
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // --- 1. AUTO REDIRECT IF NOT LOGGED IN ---
  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
  }, [user, navigate]);

  // Prevent flashing content while redirecting
  if (!user) return null; 

  // --- 2. LOGOUT CONFIRMATION LOGIC ---
  const handleLogoutFlow = () => {
    toast.info(
      <div className="flex flex-col gap-3 p-1">
        <p className="text-[11px] font-black uppercase tracking-tight text-emerald-900">
          Are you sure you want to logout?
        </p>
        <div className="flex gap-2">
          <button
            onClick={async () => {
              try {
                await api.post("auth/logout/");
                logout();
                toast.dismiss();
                toast.success("Logged out successfully");
                navigate("/");
              } catch (err) {
                toast.error("Logout failed");
              }
            }}
            className="bg-emerald-800 text-white px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-emerald-900 transition-all"
          >
            Yes, Logout
          </button>
          <button
            onClick={() => toast.dismiss()}
            className="bg-emerald-50 text-emerald-800 px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-emerald-100 transition-all"
          >
            Cancel
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
        className: "border-2 border-emerald-800 rounded-2xl shadow-2xl",
      }
    );
  };

  const tabs = [
    { id: "orders", label: "My Orders", icon: <FaBox /> },
    { id: "addresses", label: "Addresses", icon: <FaMapMarkerAlt /> },
    { id: "profile", label: "Account info", icon: <FaUser /> },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-10 border-l-4 border-emerald-800 pl-4">
          <h2 className="text-3xl font-black text-emerald-900 tracking-tight italic uppercase">Account</h2>
          <p className="text-emerald-700 text-[10px] font-bold uppercase tracking-widest mt-1">Manage your orders and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sidebar */}
          <div className="lg:col-span-3 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all text-[10px] font-black uppercase tracking-widest
                  ${activeTab === tab.id 
                    ? "bg-emerald-800 text-white shadow-lg shadow-emerald-200" 
                    : "text-gray-400 hover:bg-emerald-50 hover:text-emerald-800"}`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
            
            <div className="pt-6 mt-6 border-t border-emerald-100">
              <button 
                onClick={handleLogoutFlow}
                className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-red-500 hover:bg-red-50 transition-all text-[10px] font-black uppercase tracking-widest border border-transparent hover:border-red-100"
              >
                <FaSignOutAlt /> Logout
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-9 bg-emerald-50/20 p-8 rounded-[2rem] border border-emerald-100/50">
            {activeTab === "orders" && <UserOrders />}
            {activeTab === "addresses" && <UserAddresses />}
            {activeTab === "profile" && <UserDetails />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;