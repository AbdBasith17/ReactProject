import React, { useEffect, useState } from 'react';
import { Search, Package, Printer, User, MapPin, Phone } from 'lucide-react';
import api from "../../api/axios"; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const res = await api.get('order/admin/list/'); 
      setOrders(res.data);
    } catch (err) {
      toast.error("Failed to fetch orders from Vault");
    }
  };

  const handleDispatchToggle = async (order, newStatus) => {
    try {
      await api.patch(`order/admin/update-status/${order.id}/`, { status: newStatus });
      toast.success(`Order #${order.id} → ${newStatus.replace(/_/g, ' ')}`);
      loadOrders(); 
    } catch (err) {
      toast.error("System update failed");
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.address_name?.toLowerCase().includes(search.toLowerCase()) || 
      order.shipping_address?.toLowerCase().includes(search.toLowerCase()) ||
      order.id.toString().includes(search);
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const pendingCount = orders.filter(o => o.status === 'ORDER_PLACED').length;

  return (
    <div className="space-y-6 pb-10 p-2">
      {/* HEADER */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black uppercase italic tracking-tighter">Order Vault</h1>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mt-1">Fulfillment Control Center</p>
        </div>
        <div className="bg-white border px-6 py-3 rounded-2xl flex items-center gap-3 shadow-sm">
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">To be processed:</span>
          <span className="text-sm font-black text-orange-600">{pendingCount}</span>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-white p-2 rounded-2xl border shadow-sm">
        <div className="relative col-span-2">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
          <input 
            type="text" 
            placeholder="SEARCH BY ID, NAME, OR ADDRESS..." 
            className="w-full pl-12 pr-4 py-3.5 bg-gray-50 rounded-xl text-[11px] font-bold outline-none border-none focus:ring-1 focus:ring-black" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select 
          className="bg-gray-50 px-4 py-3.5 rounded-xl text-[10px] font-black uppercase outline-none cursor-pointer border-none"
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="ORDER_PLACED">Order Placed</option>
          <option value="SHIPPED">Shipped</option>
          <option value="OUT_FOR_DELIVERY">Out for Delivery</option>
          <option value="DELIVERED">Delivered</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      {/* ORDERS TABLE */}
      <div className="bg-white rounded-[2rem] border overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-gray-50 font-black text-[9px] text-gray-400 uppercase tracking-widest border-b">
            <tr>
              <th className="px-8 py-6 w-24">Order</th>
              <th className="px-8 py-6">Order Details (Customer & Items)</th>
              <th className="px-8 py-6 text-center">Amount</th>
              <th className="px-8 py-6 text-center w-32">Status</th>
              <th className="px-8 py-6 text-right w-48">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredOrders.length > 0 ? filteredOrders.map((order) => (
              <tr key={order.id} className="group hover:bg-gray-50/30 transition-colors">
                {/* ORDER ID */}
                <td className="px-8 py-8 align-top">
                  <span className="text-sm font-black text-gray-300">#</span>
                  <span className="text-sm font-black">{order.id}</span>
                  <p className="text-[9px] font-bold text-gray-400 mt-1 uppercase">
                    {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </td>
                
                {/* COMBINED CUSTOMER & PRODUCTS CELL */}
                <td className="px-8 py-8">
                  <div className="space-y-6">
                    {/* Part 1: Customer Details */}
                    <div className="flex flex-wrap gap-x-8 gap-y-2">
                      <div className="flex items-center gap-2">
                        <User size={12} className="text-gray-300" />
                        <span className="text-[12px] font-black uppercase tracking-tight">{order.address_name || "Guest"}</span>
                      </div>
                      <div className="flex items-center gap-2 max-w-xs">
                        <MapPin size={12} className="text-gray-300 flex-shrink-0" />
                        <span className="text-[10px] text-gray-500 font-bold leading-tight uppercase italic">{order.shipping_address || "Address not provided"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone size={12} className="text-emerald-600" />
                        <span className="text-[11px] text-emerald-800 font-black tracking-tighter">{order.phone || "No Phone"}</span>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-[1px] w-full bg-gray-100"></div>

                    {/* Part 2: Product List */}
                    <div className="bg-gray-50/50 rounded-2xl p-4 border border-gray-100/50">
                      <p className="text-[8px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Items to Pack</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {order.items?.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-gray-100 shadow-sm">
                            <div className="flex items-center gap-3">
                              <div className="bg-black text-white text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-md">
                                {item.quantity}
                              </div>
                              <span className="text-[10px] font-black uppercase tracking-tight text-gray-700">
                                {item.product_name}
                              </span>
                            </div>
                            <span className="text-[9px] font-bold text-gray-400 italic">₹{item.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </td>

                {/* TOTAL AMOUNT */}
                <td className="px-8 py-8 text-center align-top">
                  <div className="flex flex-col items-center">
                    <span className="text-[15px] font-black tracking-tighter">₹{parseFloat(order.total_amount).toLocaleString()}</span>
                    <span className="text-[8px] font-black uppercase text-gray-300 mt-1 px-2 py-0.5 border rounded-md">{order.payment_method}</span>
                  </div>
                </td>

                {/* STATUS BADGE */}
                <td className="px-8 py-8 text-center align-top">
                  <span className={`px-4 py-2 rounded-full text-[9px] font-black border uppercase tracking-widest whitespace-nowrap ${STATUS_COLORS[order.status]}`}>
                    {order.status.replace(/_/g, ' ')}
                  </span>
                </td>

                {/* ACTIONS */}
                <td className="px-8 py-8 text-right align-top">
                  <div className="flex flex-col items-end gap-3">
                    <button 
                      onClick={() => window.print()}
                      className="p-2.5 bg-gray-50 hover:bg-black hover:text-white rounded-xl transition-all border border-gray-100"
                    >
                      <Printer size={16} />
                    </button>
                    
                    {order.status !== "CANCELLED" ? (
                      <select 
                        className="bg-black text-white text-[9px] font-black uppercase rounded-xl px-3 py-2.5 outline-none cursor-pointer hover:bg-emerald-600 transition-colors shadow-lg"
                        value={order.status}
                        onChange={(e) => handleDispatchToggle(order, e.target.value)}
                      >
                        <option value="ORDER_PLACED">Set: Placed</option>
                        <option value="SHIPPED">Set: Shipped</option>
                        <option value="OUT_FOR_DELIVERY">Set: Out for Delivery</option>
                        <option value="DELIVERED">Set: Delivered</option>
                      </select>
                    ) : (
                      <span className="text-[9px] font-black text-red-400 uppercase tracking-widest px-2 py-2 border border-red-50 rounded-lg">Order Finalized</span>
                    )}
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="5" className="px-8 py-32 text-center">
                  <div className="flex flex-col items-center opacity-20">
                    <Package size={48} className="mb-4" />
                    <p className="text-[12px] font-black uppercase tracking-[0.5em] italic">Vault Records Empty</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default Orders;