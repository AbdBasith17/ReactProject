import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  ShoppingBag, 
  LogOut,
  Menu, 
  X 
} from 'lucide-react'; 
import { toast } from 'react-toastify';
import { useAuth } from "../../context/AuthContext";

function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = async (closeToast) => {
    try {
      await logout(); 
      closeToast();
      navigate('/signin'); 
    } catch (error) {
      console.error("Logout failed", error);
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
              className="px-4 py-2 text-[11px] font-bold uppercase tracking-widest bg-gray-100 rounded hover:bg-gray-200" 
              onClick={closeToast}
            >
              Cancel
            </button>
            <button 
              className="px-4 py-2 text-[11px] font-bold uppercase tracking-widest bg-red-600 text-white rounded shadow-sm hover:bg-red-700" 
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

  const activeLinkStyle = ({ isActive }) =>
    `flex items-center gap-4 px-6 py-4 transition-all duration-300 group border-l-4 ${
      isActive 
        ? 'bg-emerald-950/40 text-white border-emerald-500' 
        : 'text-gray-400 border-transparent hover:text-emerald-400 hover:bg-emerald-950/20'
    }`;

  return (
    <>
      {/* MOBILE TOP BAR */}
      <div className="lg:hidden fixed top-0 left-0 w-full bg-[#0a0f0d] text-white p-4 flex justify-between items-center z-[60] border-b border-emerald-900/30">
        <h1 className="text-xl font-bold italic tracking-tighter">
          PERF<span className="text-emerald-500">AURA</span>
        </h1>
        <button onClick={toggleSidebar} className="text-emerald-500 p-1">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* OVERLAY */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-[51] lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* SIDEBAR CONTAINER */}
      <div className={`
        fixed top-0 left-0 h-screen w-64 bg-[#0a0f0d] text-white shadow-2xl z-[55] 
        flex flex-col border-r border-emerald-900/30 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 
      `}>
        
        {/* LOGO SECTION */}
        <div className="p-8 border-b border-emerald-900/20 flex-shrink-0">
          <h1 className="text-2xl font-bold tracking-tighter text-white italic">
            PERF<span className="text-emerald-500 font-light tracking-[0.1em]">AURA</span>
          </h1>
          <p className="text-[9px] text-emerald-600 uppercase tracking-[0.4em] mt-2 font-black">
            Admin Management
          </p>
        </div>

        {/* NAVIGATION AREA */}
        <nav className="flex-1 overflow-y-auto pt-4 no-scrollbar">
          <NavLink to="/admin/admindash" className={activeLinkStyle} onClick={() => setIsOpen(false)}>
            <LayoutDashboard size={18} strokeWidth={1.5} />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]">Dashboard</span>
          </NavLink>

          <NavLink to="/admin/product" className={activeLinkStyle} onClick={() => setIsOpen(false)}>
            <Package size={18} strokeWidth={1.5} />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]">Inventory</span>
          </NavLink>

          <NavLink to="/admin/user" className={activeLinkStyle} onClick={() => setIsOpen(false)}>
            <Users size={18} strokeWidth={1.5} />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]">Customers</span>
          </NavLink>

          <NavLink to="/admin/order" className={activeLinkStyle} onClick={() => setIsOpen(false)}>
            <ShoppingBag size={18} strokeWidth={1.5} />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]">Orders</span>
          </NavLink>

          {/* LOGOUT BUTTON - NOW DIRECTLY INSIDE THE LIST FOR MOBILE */}
          <div className="lg:hidden mt-4 pt-4 border-t border-emerald-900/10">
            <button
              onClick={() => {
                setIsOpen(false);
                confirmLogout();
              }}
              className="flex items-center gap-4 px-6 py-4 w-full text-red-500 hover:bg-red-950/20 transition-all duration-300 border-l-4 border-transparent"
            >
              <LogOut size={18} strokeWidth={1.5} />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]">Sign Out</span>
            </button>
          </div>
        </nav>

        {/* DESKTOP LOGOUT (Optional: Keep it pinned for large screens if you like) */}
        <div className="hidden lg:block p-6 border-t border-emerald-900/20 bg-[#0a0f0d]">
          <button
            onClick={confirmLogout}
            className="flex items-center justify-center gap-3 w-full px-4 py-3 text-[10px] font-black uppercase tracking-[0.25em] bg-transparent border border-red-900/50 text-red-500 hover:bg-red-600 hover:text-white transition-all duration-500 rounded-sm group"
          >
            <LogOut size={14} className="group-hover:-translate-x-1 transition-transform" />
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;