import React, { useState, useEffect } from "react";
import api from "../../api/axios";
import { FaPlus, FaMapMarkerAlt, FaPencilAlt, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

function UserAddresses() {
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ phone: '', address_line: '', city: '', state: '', pincode: '' });

  useEffect(() => { fetchAddresses(); }, []);

  const fetchAddresses = async () => {
    try {
      const res = await api.get('addresses/');
      setAddresses(res.data);
    } catch { toast.error("Failed to load addresses"); }
  };

  const handleEdit = (addr) => {
    setEditingId(addr.id);
    setFormData({ 
        phone: addr.phone, 
        address_line: addr.address_line, 
        city: addr.city, 
        state: addr.state, 
        pincode: addr.pincode 
    });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const res = await api.put(`addresses/${editingId}/`, formData);
        setAddresses(addresses.map(a => a.id === editingId ? res.data : a));
        toast.success("Address updated");
      } else {
        const res = await api.post('addresses/', formData);
        setAddresses([...addresses, res.data]);
        toast.success("Address saved");
      }
      resetForm();
    } catch { toast.error("Error saving address"); }
  };

  const handleDelete = async (id) => {
    if (addresses.length <= 1) {
        toast.warning("You must have at least one address.");
        return;
    }
    if (!window.confirm("Delete this address?")) return;
    
    try {
      await api.delete(`addresses/${id}/`);
      setAddresses(addresses.filter(a => a.id !== id));
      toast.success("Address removed");
    } catch { toast.error("Could not delete address"); }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ phone: '', address_line: '', city: '', state: '', pincode: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-black uppercase italic tracking-tight text-emerald-900">My Addresses</h3>
        <button onClick={() => showForm ? resetForm() : setShowForm(true)} className="bg-emerald-800 text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95">
          {showForm ? "Cancel" : <><FaPlus className="inline mr-1"/> Add New</>}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-3xl grid grid-cols-2 gap-3 border border-emerald-100 mb-8 shadow-sm">
            <p className="col-span-2 text-[10px] font-black text-emerald-800 uppercase tracking-widest mb-2">
                {editingId ? "Editing Address" : "New Address Entry"}
            </p>
            <input className="p-3 text-sm rounded-xl ring-1 ring-emerald-50 focus:ring-emerald-800 outline-none" placeholder="Phone" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
            <input className="p-3 text-sm rounded-xl ring-1 ring-emerald-50 focus:ring-emerald-800 outline-none" placeholder="Pincode" required value={formData.pincode} onChange={e => setFormData({...formData, pincode: e.target.value})} />
            <textarea className="col-span-2 p-3 text-sm rounded-xl ring-1 ring-emerald-50 focus:ring-emerald-800 outline-none" placeholder="Full Address" required value={formData.address_line} onChange={e => setFormData({...formData, address_line: e.target.value})} />
            <input className="p-3 text-sm rounded-xl ring-1 ring-emerald-50 focus:ring-emerald-800 outline-none" placeholder="City" required value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
            <input className="p-3 text-sm rounded-xl ring-1 ring-emerald-50 focus:ring-emerald-800 outline-none" placeholder="State" required value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} />
            <button className="col-span-2 bg-emerald-800 text-white py-3 rounded-xl font-black uppercase text-[10px] tracking-widest">{editingId ? "Update Address" : "Save Address"}</button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map(addr => (
          <div key={addr.id} className="p-6 rounded-3xl border border-emerald-100 bg-white hover:border-emerald-600 transition-all group relative">
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => handleEdit(addr)} className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-emerald-600 hover:text-white transition-colors"><FaPencilAlt size={12}/></button>
                {addresses.length > 1 && (
                    <button onClick={() => handleDelete(addr.id)} className="p-2 bg-gray-100 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-colors"><FaTrash size={12}/></button>
                )}
            </div>
            
            <div className="flex items-center gap-2 mb-3">
              <FaMapMarkerAlt className="text-emerald-700" />
              <p className="font-black text-emerald-900 uppercase text-xs">{addr.user_name}</p>
            </div>
            <p className="text-emerald-700/60 text-[10px] font-bold uppercase mb-4 leading-relaxed">{addr.address_line}, {addr.city}, {addr.state} - {addr.pincode}</p>
            <p className="text-emerald-900 font-black text-[9px] uppercase tracking-tighter">Contact: {addr.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default UserAddresses;