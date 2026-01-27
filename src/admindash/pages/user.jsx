import React, { useEffect, useState, useCallback } from 'react';
import { Search, Loader2 } from 'lucide-react';
import api from "../../api/axios";
import { toast } from 'react-toastify';
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';

function Users() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'active', 'blocked'
  const [updatingId, setUpdatingId] = useState(null);
  
  const { user: currentUser, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  // Fetch users from backend
  const loadUsers = useCallback(async () => {
    try {
      const res = await api.get('auth/admin/users/');
      setUsers(res.data);
    } catch (err) {
      toast.error("Failed to fetch customer database");
    }
  }, []);

  // Auth Protection: Ensure only admin can access
  useEffect(() => {
    if (!authLoading) {
      if (!currentUser || currentUser.role?.toLowerCase() !== 'admin') {
        navigate('/signin');
      } else {
        loadUsers();
      }
    }
  }, [currentUser, authLoading, navigate, loadUsers]);

  // Toggle is_active status
  const toggleStatus = async (user) => {
    setUpdatingId(user.id);
    const updatedStatus = !user.is_active; // Flips the current boolean
    try {
      // Sending explicit boolean to backend
      await api.patch(`auth/admin/users/update/${user.id}/`, {
        is_active: updatedStatus
      });
      
      // Optimistic UI update
      setUsers(prev => prev.map(u => 
        u.id === user.id ? { ...u, is_active: updatedStatus } : u
      ));
      
      toast.success(`${user.name} is now ${updatedStatus ? 'Active' : 'Blocked'}`);
    } catch (err) {
      toast.error("Failed to sync status with server");
    } finally {
      setUpdatingId(null);
    }
  };

  // Filter Logic: Search + Status Dropdown
  const filteredUsers = users.filter(u => {
    const matchesSearch = 
      u.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      u.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterStatus === 'active') return matchesSearch && u.is_active;
    if (filterStatus === 'blocked') return matchesSearch && !u.is_active;
    return matchesSearch;
  });

  if (authLoading) return null;

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-black uppercase tracking-tighter text-gray-900">
          Customer <span className="text-emerald-800">Database</span>
        </h1>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Search Input */}
          <div className="relative flex-1 md:w-64">
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full pl-4 pr-10 py-2 bg-gray-50 border border-gray-200 text-sm outline-none focus:border-black transition-all"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          </div>

          {/* Filter Dropdown */}
          <select 
            className="bg-gray-50 border border-gray-200 text-sm py-2 px-4 outline-none cursor-pointer hover:bg-white font-medium"
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Users</option>
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* Database Table */}
      <div className="bg-white overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100/50">
              <th className="px-6 py-4 text-[11px] font-black uppercase text-gray-400 tracking-widest w-20">ID</th>
              <th className="px-6 py-4 text-[11px] font-black uppercase text-gray-400 tracking-widest">User</th>
              <th className="px-6 py-4 text-[11px] font-black uppercase text-gray-400 tracking-widest">Email</th>
              <th className="px-6 py-4 text-[11px] font-black uppercase text-gray-400 tracking-widest text-center">Status</th>
              <th className="px-6 py-4 text-[11px] font-black uppercase text-gray-400 tracking-widest text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-6 text-[13px] text-gray-400 font-medium">#{index + 1}</td>
                  <td className="px-6 py-6 text-[14px] font-black text-gray-900 uppercase tracking-tight">{user.name || 'N/A'}</td>
                  <td className="px-6 py-6 text-[13px] text-gray-500 font-medium">{user.email}</td>
                  
                  {/* Status Pill */}
                  <td className="px-6 py-6 text-center">
                    <span className={`inline-block px-8 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${
                      user.is_active 
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                        : 'bg-red-50 text-red-600 border-red-100'
                    }`}>
                      {user.is_active ? 'Active' : 'Blocked'}
                    </span>
                  </td>

                  {/* Action Toggle Switch */}
                  <td className="px-6 py-6 text-right">
                    <div className="flex justify-end">
                      <button 
                        onClick={() => toggleStatus(user)}
                        disabled={updatingId === user.id}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                          user.is_active ? 'bg-black' : 'bg-gray-300'
                        }`}
                      >
                        {updatingId === user.id ? (
                          <Loader2 className="animate-spin text-white mx-auto" size={12} />
                        ) : (
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            user.is_active ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-20 text-center text-gray-400 text-sm uppercase tracking-widest">
                  No clients found matching the criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;