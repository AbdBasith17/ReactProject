import React, { useState, useEffect } from "react";
import api from "../../api/axios";
import { FaPlus, FaMapMarkerAlt } from "react-icons/fa";
import { toast } from "react-toastify";

function UserAddresses() {
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newAddr, setNewAddr] = useState({ full_name: '', phone: '', address_line: '', city: '', state: '', pincode: '' });

  useEffect(() => { fetchAddresses(); }, []);

  const fetchAddresses = async () => {
    try {
      const res = await api.get('addresses/');
      setAddresses(res.data);
    } catch { toast.error("Failed to load addresses"); }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('addresses/', newAddr);
      setAddresses([...addresses, res.data]);
      setShowForm(false);
      toast.success("Address saved");
    } catch { toast.error("Error saving address"); }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-black uppercase italic tracking-tight text-emerald-900">My Addresses</h3>
        <button onClick={() => setShowForm(!showForm)} className="bg-emerald-800 text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-100 transition-all active:scale-95">
          {showForm ? "Cancel" : <><FaPlus className="inline mr-1"/> Add New</>}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="bg-white p-6 rounded-3xl grid grid-cols-2 gap-3 border border-emerald-100 mb-8 shadow-sm">
            <input className="col-span-2 p-3 text-sm rounded-xl ring-1 ring-emerald-50 focus:ring-emerald-800 outline-none transition-all" placeholder="Full Name" required onChange={e => setNewAddr({...newAddr, full_name: e.target.value})} />
            <input className="p-3 text-sm rounded-xl ring-1 ring-emerald-50 focus:ring-emerald-800 outline-none transition-all" placeholder="Phone" required onChange={e => setNewAddr({...newAddr, phone: e.target.value})} />
            <input className="p-3 text-sm rounded-xl ring-1 ring-emerald-50 focus:ring-emerald-800 outline-none transition-all" placeholder="Pincode" required onChange={e => setNewAddr({...newAddr, pincode: e.target.value})} />
            <textarea className="col-span-2 p-3 text-sm rounded-xl ring-1 ring-emerald-50 focus:ring-emerald-800 outline-none transition-all" placeholder="Full Address" required onChange={e => setNewAddr({...newAddr, address_line: e.target.value})} />
            <button className="col-span-2 bg-emerald-800 text-white py-3 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-emerald-900">Save Address</button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map(addr => (
          <div key={addr.id} className="p-6 rounded-3xl border border-emerald-100 bg-white hover:border-emerald-600 transition-all group shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <FaMapMarkerAlt className="text-emerald-700" />
              <p className="font-black text-emerald-900 uppercase text-xs">{addr.full_name}</p>
            </div>
            <p className="text-emerald-700/60 text-[10px] font-bold uppercase mb-4 leading-relaxed">{addr.address_line}, {addr.city} - {addr.pincode}</p>
            <p className="text-emerald-900 font-black text-[9px] uppercase tracking-tighter">Contact: {addr.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserAddresses;