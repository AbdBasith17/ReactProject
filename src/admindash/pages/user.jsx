import React, { useEffect, useState, useCallback } from 'react';
import { Search, Loader2, User as UserIcon, Mail, ShieldAlert } from 'lucide-react';
import api from "../../api/axios";
import { toast } from 'react-toastify';
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';

function Users() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); 
  const [updatingId, setUpdatingId] = useState(null);
  
  const { user: currentUser, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const loadUsers = useCallback(async () => {
    try {
      const res = await api.get('auth/admin/users/');
      setUsers(res.data);
    } catch (err) { toast.error("Database fetch failed"); }
  }, []);

  useEffect(() => {
    if (!authLoading) {
      if (!currentUser || currentUser.role?.toLowerCase() !== 'admin') navigate('/signin');
      else loadUsers();
    }
  }, [currentUser, authLoading, navigate, loadUsers]);

  const toggleStatus = async (user) => {
    setUpdatingId(user.id);
    const updatedStatus = !user.is_active;
    try {
      await api.patch(`auth/admin/users/update/${user.id}/`, { is_active: updatedStatus });
      setUsers(prev => prev.map(u => u.id === user.id ? { ...u, is_active: updatedStatus } : u));
      toast.success(`${user.name} access updated`);
    } catch (err) { toast.error("Update failed"); } finally { setUpdatingId(null); }
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name?.toLowerCase().includes(searchTerm.toLowerCase()) || u.email?.toLowerCase().includes(searchTerm.toLowerCase());
    if (filterStatus === 'active') return matchesSearch && u.is_active;
    if (filterStatus === 'blocked') return matchesSearch && !u.is_active;
    return matchesSearch;
  });

  if (authLoading) return null;

  return (
    <div className="pt-24 lg:pt-8 p-4 md:p-8 space-y-6 max-w-[1600px] mx-auto pb-20">
      
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-black uppercase italic tracking-tighter">Customers</h1>
        <p className="text-[10px] font-black text-gray-400 tracking-[0.3em] uppercase">User Access Control</p>
      </div>

      {/* FILTER BAR */}
      <div className="flex flex-col sm:flex-row gap-3 bg-white p-2 rounded-3xl border border-gray-100 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
          <input type="text" placeholder="SEARCH CUSTOMERS..." className="w-full pl-11 pr-4 py-3 bg-gray-50 rounded-2xl text-[10px] font-bold outline-none" onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <select className="bg-gray-50 px-6 py-3 rounded-2xl text-[10px] font-black uppercase outline-none" onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="all">All Users</option>
          <option value="active">Active Only</option>
          <option value="blocked">Blocked Only</option>
        </select>
      </div>

      {/* MOBILE CARD VIEW */}
      <div className="grid grid-cols-1 gap-4 lg:hidden">
        {filteredUsers.map((user, idx) => (
          <div key={user.id} className="bg-white rounded-[2rem] border border-gray-100 p-6 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                  <UserIcon size={20} />
                </div>
                <div>
                  <h3 className="text-[14px] font-black uppercase">{user.name || 'Anonymous'}</h3>
                  <p className="text-[10px] font-bold text-gray-400 flex items-center gap-1"><Mail size={10}/> {user.email}</p>
                </div>
              </div>
              <span className="text-[10px] font-black text-gray-200">#{(idx+1).toString().padStart(3, '0')}</span>
            </div>
            
            <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-4">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${user.is_active ? 'bg-emerald-500' : 'bg-red-500'}`} />
                <span className={`text-[10px] font-black uppercase tracking-widest ${user.is_active ? 'text-emerald-600' : 'text-red-600'}`}>
                  {user.is_active ? 'Account Active' : 'Access Blocked'}
                </span>
              </div>
              <button 
                onClick={() => toggleStatus(user)}
                disabled={updatingId === user.id}
                className={`relative inline-flex h-6 w-12 items-center rounded-full transition-all ${user.is_active ? 'bg-black' : 'bg-gray-200'}`}
              >
                {updatingId === user.id ? <Loader2 size={12} className="animate-spin text-white mx-auto" /> :
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${user.is_active ? 'translate-x-7' : 'translate-x-1'}`} />}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP TABLE VIEW */}
      <div className="hidden lg:block bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-8 py-5 text-[10px] font-black uppercase text-gray-400 tracking-widest w-24">Entry</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase text-gray-400 tracking-widest">Client</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase text-gray-400 tracking-widest text-center">Status</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase text-gray-400 tracking-widest text-right">Access</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredUsers.map((user, idx) => (
              <tr key={user.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-8 py-6 text-[11px] font-black text-gray-300">#{(idx+1).toString().padStart(3, '0')}</td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-400"><UserIcon size={16}/></div>
                    <div>
                      <p className="text-[13px] font-black text-gray-900 uppercase">{user.name}</p>
                      <p className="text-[11px] font-bold text-gray-400 lowercase">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6 text-center">
                   <span className={`px-5 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${user.is_active ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                    {user.is_active ? 'Active' : 'Blocked'}
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <button onClick={() => toggleStatus(user)} disabled={updatingId === user.id}
                    className={`relative inline-flex h-6 w-12 items-center rounded-full transition-all ${user.is_active ? 'bg-black' : 'bg-gray-200'}`}>
                    {updatingId === user.id ? <Loader2 size={12} className="animate-spin text-white mx-auto" /> :
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${user.is_active ? 'translate-x-7' : 'translate-x-1'}`} />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;