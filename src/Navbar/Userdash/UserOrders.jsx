import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { FaCheckCircle, FaCircle, FaInfoCircle, FaBan } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchOrders(); }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get('order/my-orders/');
      setOrders(res.data);
    } catch (err) { 
      console.error(err); 
    } finally { 
      setLoading(false); 
    }
  };

  // --- NEW TOAST CONFIRMATION LOGIC ---
  const confirmCancellation = (orderId) => {
    toast.warn(
      <div className="flex flex-col gap-3 p-1">
        <p className="text-[11px] font-black uppercase tracking-tight text-red-900">
          Revoke this order manifest?
        </p>
        <p className="text-[9px] font-bold text-red-700 uppercase leading-tight">
          This action cannot be undone once confirmed.
        </p>
        <div className="flex gap-2">
          <button
            onClick={async () => {
              try {
                toast.dismiss();
                await api.patch(`order/cancel/${orderId}/`, { status: "CANCELLED" });
                toast.success("ORDER REVOKED SUCCESSFULLY");
                fetchOrders();
              } catch (err) {
                toast.error("CANCELLATION FAILED");
              }
            }}
            className="bg-red-600 text-white px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-red-700 transition-all"
          >
            Confirm Cancel
          </button>
          <button
            onClick={() => toast.dismiss()}
            className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-gray-200 transition-all"
          >
            Go Back
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
        className: "border-2 border-red-500 rounded-2xl shadow-2xl",
      }
    );
  };

  const statusSteps = [
    { label: "Placed", key: "ORDER_PLACED" },
    { label: "Shipped", key: "SHIPPED" },
    { label: "Out for Delivery", key: "OUT_FOR_DELIVERY" },
    { label: "Delivered", key: "DELIVERED" }
  ];

  const getActiveIndex = (status) => statusSteps.findIndex(s => s.key === status);

  if (loading) return <div className="p-10 text-[10px] font-black uppercase animate-pulse">Scanning Vault...</div>;

  return (
    <div className="space-y-6">
      {orders.map((order) => {
        const activeIndex = getActiveIndex(order.status);
        const isCancelled = order.status === "CANCELLED";
        const canUserCancel = order.status === "ORDER_PLACED";

        return (
          <div key={order.id} className="bg-white border border-emerald-100 rounded-[2rem] overflow-hidden shadow-sm">
            {/* Header */}
            <div className="p-6 border-b border-emerald-50 flex justify-between bg-emerald-50/10 items-center">
              <div>
                <h4 className="text-sm font-black text-slate-950 uppercase">Order #{order.id}</h4>
                <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-widest">Date: {new Date(order.created_at).toLocaleDateString()}</p>
              </div>
              <span className={`px-4 py-1.5 text-[9px] font-black uppercase rounded-lg italic ${isCancelled ? 'bg-red-500' : 'bg-emerald-950'} text-white`}>
                {order.status.replace(/_/g, ' ')}
              </span>
            </div>

            <div className="p-8 space-y-8">
              {/* Info Grid */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="text-[11px] font-black uppercase">
                  <p className="text-emerald-800 text-[9px] tracking-widest mb-2 flex items-center gap-2"><FaCircle size={4}/> Destination</p>
                  <p className="text-slate-950">{order.address_name} | {order.phone}</p>
                  <p className="text-slate-500 italic font-bold normal-case mt-1 leading-relaxed">
                    {order.shipping_address}, {order.city} - {order.pincode}
                  </p>
                </div>

                <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100">
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-2">Manifest Contents</p>
                  {order.items?.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-[11px] font-black uppercase mb-1">
                      <span>{item.product_name} <span className="text-slate-300 ml-2">x{item.quantity}</span></span>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Progress Stepper */}
              {!isCancelled && (
                <div className="relative pt-8 pb-4">
                  <div className="absolute top-[41px] left-0 w-full h-[2px] bg-slate-100 rounded-full"></div>
                  <div 
                    className="absolute top-[41px] left-0 h-[2px] bg-emerald-500 rounded-full transition-all duration-1000"
                    style={{ width: `${(activeIndex / (statusSteps.length - 1)) * 100}%` }}
                  ></div>
                  <div className="relative flex justify-between">
                    {statusSteps.map((step, index) => {
                      const isActive = index <= activeIndex;
                      return (
                        <div key={step.key} className="flex flex-col items-center">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center z-10 transition-colors ${isActive ? 'bg-emerald-600 text-white shadow-md' : 'bg-white border-2 border-slate-100 text-slate-100'}`}>
                            {isActive ? <FaCheckCircle size={10} /> : <FaCircle size={6} />}
                          </div>
                          <span className={`mt-2 text-[8px] font-black uppercase tracking-tighter ${isActive ? 'text-slate-950' : 'text-slate-300'}`}>{step.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Actions & Summary */}
              <div className="pt-6 border-t border-emerald-50 flex flex-col md:flex-row justify-between items-center gap-6">
                
                <div className="flex flex-col gap-2 w-full md:w-auto">
                    {canUserCancel ? (
                        <>
                             <button 
                                onClick={() => confirmCancellation(order.id)}
                                className="flex items-center justify-center gap-2 bg-white border-2 border-red-100 text-red-500 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase hover:bg-red-500 hover:text-white transition-all group"
                            >
                                <FaBan className="group-hover:rotate-12 transition-transform" /> Cancel Transaction
                            </button>
                            <p className="flex items-center gap-2 text-[8px] font-black text-slate-300 uppercase italic">
                                <FaInfoCircle /> Active only until shipment starts.
                            </p>
                        </>
                    ) : !isCancelled && (
                        <div className="bg-slate-50 px-4 py-2 rounded-lg border border-slate-100 opacity-60">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 italic">
                                <FaBan /> Cancellation Locked
                            </p>
                        </div>
                    )}
                </div>

                <div className="text-right">
                  <span className="text-[9px] font-black text-slate-400 mr-4 tracking-[0.2em] uppercase">Total Amount</span>
                  <span className="text-3xl font-black italic tracking-tighter text-slate-950">₹{order.total_amount}</span>
                  <p className="text-[8px] font-black text-emerald-600 uppercase mt-1 tracking-widest">Payment: {order.payment_method}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default UserOrders;