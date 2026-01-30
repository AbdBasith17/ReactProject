import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { FaCheckCircle, FaCircle } from "react-icons/fa";

function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchOrders(); }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get('order/my-orders/');
      setOrders(res.data);
    } catch (err) { console.error("Error fetching real orders:", err); } 
    finally { setLoading(false); }
  };

  const statusSteps = [
    { label: "Placed", key: "PENDING" }, // Matches your Django choices
    { label: "Shipped", key: "SHIPPED" },
    { label: "Out for Delivery", key: "OUT_FOR_DELIVERY" },
    { label: "Delivered", key: "DELIVERED" }
  ];

  const getActiveIndex = (status) => statusSteps.findIndex(s => s.key === status);

  if (loading) return <div className="p-8 text-emerald-800 font-bold animate-pulse uppercase text-[10px]">Loading Real-time Data...</div>;

  return (
    <div className="space-y-8">
      {orders.length === 0 ? (
        <p className="text-slate-500 font-bold uppercase text-center py-20 border-2 border-dashed border-emerald-100 rounded-[2rem]">No orders placed yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="bg-white border border-emerald-100 rounded-[2rem] overflow-hidden shadow-sm">
            
            {/* Header: High Visibility Black Text */}
            <div className="p-6 border-b border-emerald-50 flex justify-between items-center bg-emerald-50/10">
              <div>
                <h4 className="text-sm font-black text-slate-950 uppercase tracking-tighter">Order ID: #{order.id}</h4>
                <p className="text-[10px] text-slate-600 font-bold uppercase mt-1">
                  Placed on: {new Date(order.created_at).toLocaleDateString()}
                </p>
              </div>
              <span className="px-5 py-2 bg-emerald-800 text-white text-[10px] font-black uppercase tracking-widest rounded-xl italic">
                {order.status}
              </span>
            </div>

            <div className="p-8 space-y-8">
              {/* Delivery Address: Black text for readability */}
              <div>
                <h5 className="text-[10px] font-black text-emerald-800 uppercase tracking-[0.2em] mb-2">Delivery Address</h5>
                <div className="text-[12px] font-bold text-slate-950 leading-relaxed uppercase">
                  <span>{order.address_name}</span> | <span className="text-slate-600">{order.phone}</span>
                  <p className="mt-1 text-slate-700 normal-case font-medium">{order.shipping_address}</p>
                </div>
              </div>

              {/* Real Order Items */}
              <div className="space-y-4">
                {order.items?.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center py-3 border-b border-slate-50 last:border-0">
                    <div>
                      <h4 className="text-[13px] font-black text-slate-950 uppercase tracking-tight">{item.product_name}</h4>
                      <p className="text-[10px] text-slate-500 font-bold uppercase">Qty: {item.quantity} × ₹{item.price}</p>
                    </div>
                    <p className="text-sm font-black text-slate-950 italic">₹{item.subtotal}</p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="flex justify-between items-end pt-6 border-t border-emerald-50">
                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-md">
                  Method: {order.payment_method}
                </span>
                <div className="text-right">
                  <span className="text-[11px] font-black text-slate-900 uppercase tracking-widest mr-4">Grand Total:</span>
                  <span className="text-2xl font-black text-slate-950 italic">₹{order.total_amount}</span>
                </div>
              </div>

              {/* Stepper */}
              <div className="relative pt-10 pb-4">
                <div className="absolute top-[49px] left-0 w-full h-[3px] bg-emerald-50 rounded-full"></div>
                <div 
                  className="absolute top-[49px] left-0 h-[3px] bg-emerald-600 rounded-full transition-all duration-700"
                  style={{ width: `${(getActiveIndex(order.status) / (statusSteps.length - 1)) * 100}%` }}
                ></div>
                <div className="relative flex justify-between">
                  {statusSteps.map((step, index) => {
                    const isActive = index <= getActiveIndex(order.status);
                    return (
                      <div key={step.key} className="flex flex-col items-center">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center z-10 ${isActive ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' : 'bg-white border-2 border-emerald-50 text-emerald-100'}`}>
                          {isActive ? <FaCheckCircle className="text-[10px]" /> : <FaCircle className="text-[6px]" />}
                        </div>
                        <span className={`mt-3 text-[9px] font-black uppercase tracking-tighter ${isActive ? 'text-slate-950' : 'text-slate-300'}`}>
                          {step.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default UserOrders;