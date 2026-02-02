import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaCheckCircle, FaMapMarkerAlt, FaCreditCard, FaTruck, FaArrowLeft } from "react-icons/fa";
import { toast } from 'react-toastify'; 
import api from "../api/axios";
import { useAuth } from '../context/AuthContext';

const Checkout = () => {
  const { user, refreshCart, cart } = useAuth(); 
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  
  // Removed tax from state since prices are inclusive
  const [summary, setSummary] = useState({ items_total: 0, delivery_fee: 0, grand_total: 0 });
  
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    full_name: '', phone: '', address_line: '', city: '', state: '', pincode: ''
  });

  useEffect(() => {
    fetchCheckoutData();
  }, []);

  const fetchCheckoutData = async () => {
    try {
      setLoading(true);
      const [addrRes, sumRes] = await Promise.all([
        api.get('addresses/'), 
        api.get('order/checkout/summary/') 
      ]);
      setAddresses(addrRes.data);
      setSummary(sumRes.data);
      const defaultAddr = addrRes.data.find(a => a.is_default) || addrRes.data[0];
      if (defaultAddr) setSelectedAddress(defaultAddr.id);
    } catch (err) {
      toast.error("Failed to load checkout details.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('addresses/', newAddress);
      setAddresses([...addresses, res.data]);
      setSelectedAddress(res.data.id);
      setShowAddressForm(false);
      setNewAddress({ full_name: '', phone: '', address_line: '', city: '', state: '', pincode: '' });
      toast.success("Address added!");
    } catch (err) {
      toast.error("Error saving address.");
    }
  };

  const handlePlaceOrder = async () => {
    try {
      setSubmitting(true);
      
      const response = await api.post("/order/create/", {
        address_id: selectedAddress,
        payment_method: paymentMethod,
      });

      if (response.data.message === "Order placed (COD)") {
        toast.success("Order placed successfully!");
        await refreshCart();
        navigate("/orderplaced" , { replace: true});
        return;
      }

      const options = {
        key: response.data.key,
        amount: response.data.amount * 100,
        currency: "INR",
        name: "PERFAURA",
        order_id: response.data.razorpay_order_id,
        handler: async function (razorpayResponse) {
          try {
            const verifyRes = await api.post("/payment/verify/", {
              razorpay_order_id: razorpayResponse.razorpay_order_id,
              razorpay_payment_id: razorpayResponse.razorpay_payment_id,
              razorpay_signature: razorpayResponse.razorpay_signature,
            });
            if (verifyRes.status === 200) {
              toast.success("Payment Successful!");
              await refreshCart();
              navigate("/orderplaced", { replace: true});
            }
          } catch (err) {
            toast.error("Payment verification failed.");
          }
        },
        prefill: {
          name: user?.name || "",
          email: user?.email || "",
        },
        theme: { color: "#065f46" },
        modal: {
          ondismiss: function() {
            setSubmitting(false);
          }
        }
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to initiate order.");
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-emerald-200 border-t-emerald-800 rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center gap-3 mb-6">
            <button onClick={() => navigate('/cart')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <FaArrowLeft className="text-sm" />
            </button>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight italic uppercase">Checkout</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <section className="border-t border-gray-100 pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-black uppercase tracking-tight flex items-center gap-2">
                  <span className="bg-emerald-800 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px]">1</span>
                  Shipping Address
                </h3>
                <button 
                  onClick={() => setShowAddressForm(!showAddressForm)}
                  className="text-[10px] font-bold uppercase tracking-widest text-emerald-800 border-b border-emerald-800"
                >
                  {showAddressForm ? "Cancel" : "+ Add New"}
                </button>
              </div>

              {showAddressForm && (
                <form onSubmit={handleAddAddress} className="bg-gray-50 p-6 rounded-2xl mb-6 grid grid-cols-2 gap-3 border border-gray-100 shadow-sm">
                  <input className="col-span-2 p-3 text-sm rounded-xl border-none ring-1 ring-gray-200 focus:ring-1 focus:ring-emerald-800 outline-none" placeholder="Full Name" required value={newAddress.full_name} onChange={e => setNewAddress({...newAddress, full_name: e.target.value})} />
                  <input className="p-3 text-sm rounded-xl border-none ring-1 ring-gray-200 outline-none" placeholder="Phone" required value={newAddress.phone} onChange={e => setNewAddress({...newAddress, phone: e.target.value})} />
                  <input className="p-3 text-sm rounded-xl border-none ring-1 ring-gray-200 outline-none" placeholder="Pincode" required value={newAddress.pincode} onChange={e => setNewAddress({...newAddress, pincode: e.target.value})} />
                  <textarea className="col-span-2 p-3 text-sm rounded-xl border-none ring-1 ring-gray-200 outline-none" placeholder="Address Details" required value={newAddress.address_line} onChange={e => setNewAddress({...newAddress, address_line: e.target.value})} />
                  <input className="p-3 text-sm rounded-xl border-none ring-1 ring-gray-200 outline-none" placeholder="City" required value={newAddress.city} onChange={e => setNewAddress({...newAddress, city: e.target.value})} />
                  <input className="p-3 text-sm rounded-xl border-none ring-1 ring-gray-200 outline-none" placeholder="State" required value={newAddress.state} onChange={e => setNewAddress({...newAddress, state: e.target.value})} />
                  <button type="submit" className="col-span-2 bg-black text-white py-3 rounded-xl font-black uppercase text-[10px] tracking-widest">Save Address</button>
                </form>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {addresses.map((addr) => (
                  <div 
                    key={addr.id}
                    onClick={() => setSelectedAddress(addr.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${selectedAddress === addr.id ? 'border-emerald-600 bg-emerald-50/20 shadow-sm' : 'border-gray-100 hover:border-gray-200'}`}
                  >
                    {selectedAddress === addr.id && <FaCheckCircle className="absolute top-4 right-4 text-emerald-600" size={16} />}
                    <p className="font-black text-gray-900 uppercase text-xs mb-1">{addr.full_name}</p>
                    <p className="text-gray-500 text-[10px] leading-relaxed mb-2">{addr.address_line}, {addr.city}, {addr.state}</p>
                    <p className="text-gray-900 font-bold text-[10px] uppercase tracking-tighter">Phone: {addr.phone}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="border-t border-gray-100 pt-6">
              <h3 className="text-base font-black uppercase tracking-tight flex items-center gap-2 mb-4">
                <span className="bg-emerald-800 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px]">2</span>
                Payment Method
              </h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={() => setPaymentMethod('COD')}
                  className={`flex-1 p-5 rounded-2xl border flex items-center gap-4 transition-all ${paymentMethod === 'COD' ? 'border-black bg-gray-50' : 'border-gray-100 opacity-60'}`}
                >
                  <FaTruck size={18} className={paymentMethod === 'COD' ? 'text-emerald-800' : ''} />
                  <div className="text-left">
                    <p className="font-black text-[10px] uppercase tracking-widest">Cash on Delivery</p>
                  </div>
                </button>
                <button 
                  onClick={() => setPaymentMethod('RAZORPAY')}
                  className={`flex-1 p-5 rounded-2xl border flex items-center gap-4 transition-all ${paymentMethod === 'RAZORPAY' ? 'border-black bg-gray-50' : 'border-gray-100 opacity-60'}`}
                >
                  <FaCreditCard size={18} className={paymentMethod === 'RAZORPAY' ? 'text-emerald-800' : ''} />
                  <div className="text-left">
                    <p className="font-black text-[10px] uppercase tracking-widest">Online Payment</p>
                  </div>
                </button>
              </div>
            </section>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-[#F9F9F9] rounded-3xl p-6 sticky top-24 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-black text-gray-900 mb-6 uppercase tracking-tight italic">Your Order</h3>
              
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {cart && cart.map(item => (
                  <div key={item.product.id} className="flex justify-between items-center gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center p-1 ring-1 ring-gray-100">
                        <img src={item.product.image} alt="" className="max-h-full object-contain" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-gray-900 uppercase leading-tight line-clamp-1">{item.product.title}</span>
                        <span className="text-[9px] text-gray-400 font-bold">Qty: {item.quantity}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-black text-gray-900 whitespace-nowrap">₹{item.subtotal}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-gray-200 pt-6 mb-6">
                <div className="flex justify-between text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span>₹{summary.items_total}</span>
                </div>
                <div className="flex justify-between text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                  <span>Shipping</span>
                  <span className={summary.delivery_fee === 0 ? 'text-emerald-700' : ''}>
                    {summary.delivery_fee === 0 ? 'FREE' : `₹${summary.delivery_fee}`}
                  </span>
                </div>

                {/* Optional: Add a small note about inclusive tax */}
                <p className="text-[8px] text-gray-400 font-bold uppercase text-right">* Prices are inclusive of all taxes</p>

                <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                  <span className="font-black text-gray-900 uppercase text-[10px]">Total</span>
                  <span className="font-black text-xl text-gray-900 italic">₹{summary.grand_total}</span>
                </div>
              </div>

              <button
                disabled={!selectedAddress || submitting}
                onClick={handlePlaceOrder}
                className={`w-full py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg transition-all active:scale-95
                  ${selectedAddress && !submitting ? 'bg-black text-white hover:bg-emerald-900' : 'bg-gray-200 text-gray-400'}`}
              >
                {submitting ? 'Processing...' : 'Place Order'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;