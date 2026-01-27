import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  ShoppingBag, 
  LogOut 
} from 'lucide-react'; 
import api from "../../api/axios";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = async (closeToast) => {
    try {
      await api.post('accounts/logout/'); 
      localStorage.removeItem('user');
      closeToast();
      toast.success("Logged out successfully");
      navigate('/signin');
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Logout failed. Please try again.");
      closeToast();
    }
  };

  const confirmLogout = () => {
    toast.info(
      ({ closeToast }) => (
        <div className="p-2 text-gray-800">
          <p className="mb-4 text-[13px] font-bold uppercase tracking-wider">Confirm Logout?</p>
          <div className="flex justify-end gap-3">
            <button 
              className="px-4 py-2 text-[11px] font-bold uppercase tracking-widest bg-gray-100 rounded hover:bg-gray-200 transition-colors" 
              onClick={closeToast}
            >
              Cancel
            </button>
            <button 
              className="px-4 py-2 text-[11px] font-bold uppercase tracking-widest bg-red-600 text-white rounded shadow-sm hover:bg-red-700 transition-colors" 
              onClick={() => handleLogout(closeToast)}
            >
              Logout
            </button>
          </div>
        </div>
      ),
      { position: 'top-center', autoClose: false, closeOnClick: false }
    );
  };

  // Matching the Navbar's link style: uppercase, bold, high tracking
  const activeLinkStyle = ({ isActive }) =>
    `flex items-center gap-4 px-6 py-4 transition-all duration-300 group border-l-4 ${
      isActive 
        ? 'bg-emerald-950/40 text-white border-emerald-500' 
        : 'text-gray-400 border-transparent hover:text-emerald-400 hover:bg-emerald-950/20'
    }`;

  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-[#0a0f0d] text-white shadow-2xl z-50 flex flex-col justify-between border-r border-emerald-900/30">
      <div>
        {/* LOGO - Exact match to your Navbar aesthetic */}
        <div className="p-8 mb-4 border-b border-emerald-900/20">
          <h1 className="text-2xl font-bold tracking-tighter text-white italic">
            PERF<span className="text-emerald-500 font-light tracking-[0.1em]">AURA</span>
          </h1>
          <p className="text-[9px] text-emerald-600 uppercase tracking-[0.4em] mt-2 font-black">
            Admin Management
          </p>
        </div>

        <nav className="flex flex-col mt-4">
          <NavLink to="/admin/admindash" className={activeLinkStyle}>
            <LayoutDashboard size={18} strokeWidth={1.5} />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]">Dashboard</span>
          </NavLink>

          <NavLink to="/admin/product" className={activeLinkStyle}>
            <Package size={18} strokeWidth={1.5} />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]">Inventory</span>
          </NavLink>

          <NavLink to="/admin/user" className={activeLinkStyle}>
            <Users size={18} strokeWidth={1.5} />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]">Customers</span>
          </NavLink>

          <NavLink to="/admin/order" className={activeLinkStyle}>
            <ShoppingBag size={18} strokeWidth={1.5} />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]">Orders</span>
          </NavLink>
        </nav>
      </div>

      {/* Logout Footer */}
      <div className="p-6 border-t border-emerald-900/20">
        <button
          onClick={confirmLogout}
          className="flex items-center justify-center gap-3 w-full px-4 py-3 text-[10px] font-black uppercase tracking-[0.25em] bg-transparent border border-red-900/50 text-red-500 hover:bg-red-600 hover:text-white transition-all duration-500 rounded-sm group"
        >
          <LogOut size={14} className="group-hover:-translate-x-1 transition-transform" />
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default Sidebar;