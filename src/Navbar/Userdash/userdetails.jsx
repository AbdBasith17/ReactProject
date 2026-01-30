import React from "react";
import { useAuth } from "../../context/AuthContext";
import { FaUserCircle } from "react-icons/fa";

function UserDetails() {
  const { user } = useAuth();

  // Note: We don't need to check (!user) here because the Parent Dashboard handles it.
  
  return (
    <div className="flex flex-col items-center text-center py-10">
      <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center mb-6 border-4 border-emerald-200">
        <FaUserCircle className="text-6xl text-emerald-800" />
      </div>
      <h3 className="text-2xl font-black text-emerald-900 uppercase italic tracking-tighter mb-1">
        {user?.name}
      </h3>
      <p className="text-emerald-600 font-bold text-xs uppercase tracking-widest mb-8">
        {user?.email}
      </p>
      
      <div className="bg-emerald-800 text-white px-8 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-lg shadow-emerald-100">
        Verified Member
      </div>
    </div>
  );
}

export default UserDetails;