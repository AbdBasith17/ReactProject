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

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
  }, [user, navigate]);

  if (!user) return null;

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
    { id: "orders", label: "Orders", icon: <FaBox /> },
    { id: "addresses", label: "Address", icon: <FaMapMarkerAlt /> },
    { id: "profile", label: "Profile", icon: <FaUser /> },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        
        {/* --- HEADER: ACCOUNT LEFT, LOGOUT RIGHT --- */}
        <div className="flex items-center justify-between mb-8 border-l-4 border-emerald-800 pl-4">
          <div>
            <h2 className="text-2xl lg:text-3xl font-black text-emerald-900 tracking-tight italic uppercase leading-none">
              Account
            </h2>
            <p className="hidden sm:block text-emerald-700 text-[10px] font-bold uppercase tracking-widest mt-1">
              Manage your orders and preferences
            </p>
          </div>
          
          <button 
            onClick={handleLogoutFlow}
            className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-100 transition-all border border-red-100"
          >
            <FaSignOutAlt className="text-sm" /> 
            <span className="hidden xs:block">Logout</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
          
          {/* --- SIDEBAR / MOBILE TAB GRID --- */}
          <div className="lg:col-span-3">
            {/* Grid of 3 columns on mobile, single column on desktop */}
            <div className="grid grid-cols-3 lg:grid-cols-1 gap-2 lg:gap-3">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-2 lg:gap-4 px-2 py-4 lg:px-6 lg:py-4 rounded-2xl transition-all text-[8px] xs:text-[9px] lg:text-[10px] font-black uppercase tracking-widest border lg:border-none
                    ${activeTab === tab.id 
                      ? "bg-emerald-800 text-white shadow-lg shadow-emerald-200 border-emerald-800" 
                      : "bg-white lg:bg-transparent text-gray-400 border-gray-100 hover:bg-emerald-50 hover:text-emerald-800"}`}
                >
                  <span className="text-base lg:text-lg">{tab.icon}</span>
                  <span className="text-center">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Desktop Only separator for extra logout if desired (optional) */}
            <div className="hidden lg:block pt-6 mt-6 border-t border-emerald-100">
               <p className="text-[9px] text-gray-400 uppercase font-bold tracking-widest text-center lg:text-left">Perfaura Secure Account</p>
            </div>
          </div>

          {/* --- CONTENT AREA --- */}
          <div className="lg:col-span-9 bg-emerald-50/10 p-4 sm:p-6 lg:p-8 rounded-[1.5rem] lg:rounded-[2rem] border border-emerald-100/50 min-h-[400px]">
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              {activeTab === "orders" && <UserOrders />}
              {activeTab === "addresses" && <UserAddresses />}
              {activeTab === "profile" && <UserDetails />}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default UserDashboard;