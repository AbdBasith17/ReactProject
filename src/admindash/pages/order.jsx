import React, { useEffect, useState } from 'react';
import { Search, Package, Printer, MapPin, User, Phone } from 'lucide-react';
import api from "../../api/axios"; 
import { toast } from 'react-toastify';

const STATUS_COLORS = {
  ORDER_PLACED: "bg-orange-50 text-orange-600 border-orange-100",
  SHIPPED: "bg-blue-50 text-blue-600 border-blue-100",
  OUT_FOR_DELIVERY: "bg-purple-50 text-purple-600 border-purple-100",
  DELIVERED: "bg-emerald-50 text-emerald-600 border-emerald-100",
  CANCELLED: "bg-red-50 text-red-600 border-red-100",
};

function Orders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => { loadOrders(); }, []);

  const loadOrders = async () => {
    try {
      const res = await api.get('order/admin/list/'); 
      setOrders(res.data);
    } catch (err) { 
      toast.error("Failed to fetch vault data"); 
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const res = await api.patch(`order/admin/update-status/${id}/`, { status: newStatus });
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
      toast.success(res.data.message || "Vault Updated");
    } catch (err) { 
      // 🔥 Captures the backend error (e.g., "Already delivered")
      const errorMessage = err.response?.data?.error || "Update failed";
      toast.error(errorMessage); 
    }
  };

  const filteredOrders = orders.filter(o => 
    o.address_name?.toLowerCase().includes(search.toLowerCase()) || 
    o.id.toString().includes(search)
  ).filter(o => statusFilter === 'all' || o.status === statusFilter);

  const pendingCount = orders.filter(o => o.status === 'ORDER_PLACED').length;

  return (
    <div className="p-4 space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black uppercase italic tracking-tighter">Orders</h1>
          <p className="text-[10px] font-black text-gray-400 tracking-[0.3em] uppercase">Fulfillment Management</p>
        </div>
        <div className="bg-white border-2 border-orange-50 px-6 py-3 rounded-2xl shadow-sm">
          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Orders to Process</p>
          <p className="text-xl font-black text-orange-600">{pendingCount}</p>
        </div>
      </div>

      {/* FILTERS */}
      <div className="flex gap-2 bg-white p-2 rounded-2xl border shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
          <input 
            type="text" placeholder="SEARCH BY ID OR CUSTOMER..." 
            className="w-full pl-12 pr-4 py-3.5 bg-gray-50 rounded-xl text-[10px] font-bold outline-none border-none focus:ring-1 focus:ring-black" 
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select className="bg-gray-50 px-6 rounded-xl text-[10px] font-black uppercase outline-none" onChange={e => setStatusFilter(e.target.value)}>
          <option value="all">All Status</option>
          <option value="ORDER_PLACED">Order Placed</option>
          <option value="SHIPPED">Shipped</option>
          <option value="DELIVERED">Delivered</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-[2rem] border overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-gray-50 font-black text-[9px] text-gray-400 uppercase tracking-widest border-b">
            <tr>
              <th className="px-8 py-5">Order ID</th>
              <th className="px-8 py-5">Customer & Items Details</th>
              <th className="px-8 py-5 text-center">Amount</th>
              <th className="px-8 py-5 text-right">Update Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50/30 transition-colors">
                <td className="px-8 py-8 align-top">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-black text-gray-300">#</span>
                    <span className="text-sm font-black">{order.id}</span>
                  </div>
                  <p className="text-[9px] font-black text-gray-400 mt-1 uppercase">{new Date(order.created_at).toLocaleDateString()}</p>
                </td>

                <td className="px-8 py-8">
                  {/* CUSTOMER INFO BLOCK */}
                  <div className="flex flex-wrap gap-x-10 gap-y-3 mb-6">
                    <div className="flex flex-col gap-1">
                      <span className="text-[8px] font-black text-gray-300 uppercase tracking-widest flex items-center gap-1"><User size={10}/> Name</span>
                      <span className="text-[11px] font-black uppercase">{order.address_name || "Guest User"}</span>
                    </div>
                    <div className="flex flex-col gap-1 max-w-xs">
                      <span className="text-[8px] font-black text-gray-300 uppercase tracking-widest flex items-center gap-1"><MapPin size={10}/> Address</span>
                      <span className="text-[10px] font-bold text-gray-500 uppercase leading-tight italic">
                        {order.shipping_address}, {order.city} - {order.pincode}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[8px] font-black text-gray-300 uppercase tracking-widest flex items-center gap-1"><Phone size={10}/> Contact</span>
                      <span className="text-[10px] font-black text-emerald-600">{order.phone}</span>
                    </div>
                  </div>

                  {/* PRODUCTS LIST BLOCK - FIXED FOR CLARITY */}
                  <div className="bg-gray-50/80 rounded-2xl p-4 border border-gray-100">
                    <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Package size={12}/> Items to Pack
                    </p>
                    <div className="space-y-2">
                      {order.items?.map((item, i) => (
                        <div key={i} className="flex justify-between items-center bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                          <div className="flex items-center gap-3">
                            <span className="text-gray-300 font-bold text-[10px]">{String(i + 1).padStart(2, '0')}</span>
                            <span className="text-[10px] font-black uppercase tracking-tight text-gray-700">{item.product_name}</span>
                          </div>
                          <div className="flex items-center gap-4">
                             <span className="bg-emerald-50 text-emerald-700 text-[10px] font-black px-2 py-0.5 rounded border border-emerald-100">× {item.quantity}</span>
                             <span className="text-[10px] font-bold text-gray-500">₹{item.price}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </td>

                <td className="px-8 py-8 text-center align-top">
                  <p className="text-lg font-black tracking-tighter">₹{parseFloat(order.total_amount).toLocaleString()}</p>
                  <span className="text-[8px] font-black uppercase text-gray-300 border px-2 py-0.5 rounded mt-1 inline-block">{order.payment_method}</span>
                </td>

                <td className="px-8 py-8 text-right align-top">
                  <div className="flex flex-col items-end gap-3">
                    <div className={`px-4 py-1.5 rounded-full text-[9px] font-black border uppercase tracking-widest ${STATUS_COLORS[order.status]}`}>
                      {order.status.replace(/_/g, ' ')}
                    </div>
                    
                    {/* LOCK DROPDOWN IF DELIVERED OR CANCELLED */}
                    {order.status !== "CANCELLED" && (
                      <select 
                        className={`text-[9px] font-black uppercase px-4 py-2.5 rounded-xl outline-none transition-all ${
                            order.status === "DELIVERED" 
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed border-dashed border-2" 
                            : "bg-black text-white cursor-pointer hover:bg-emerald-600 shadow-md active:scale-95"
                        }`}
                        value={order.status}
                        disabled={order.status === "DELIVERED"}
                        onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                      >
                        <option value="ORDER_PLACED">Set: Placed</option>
                        <option value="SHIPPED">Set: Shipped</option>
                        <option value="OUT_FOR_DELIVERY">Set: Out for Delivery</option>
                        <option value="DELIVERED">Set: Delivered</option>
                      </select>
                    )}
                    <button onClick={() => window.print()} className="p-2 text-gray-300 hover:text-black transition-colors"><Printer size={18}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
  );
}

export default Orders;