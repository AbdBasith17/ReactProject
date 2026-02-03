import React from 'react';
import { FaRegTrashCan, FaPlus, FaMinus, FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const { cart, updateCartQty, removeFromCart } = useAuth();
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-6 px-4">
        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center">
           <FaArrowLeft className="text-emerald-800 text-xl" />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter italic">Your Bag is Empty</h2>
          <p className="text-gray-400 text-sm mt-2 font-medium">Discover your next signature scent.</p>
        </div>
        <button
          onClick={() => navigate('/productpage')}
          className="bg-black text-white px-10 py-4 rounded-xl font-black uppercase text-[10px] tracking-[0.2em] shadow-lg hover:bg-emerald-900 transition-all"
        >
          Explore Collection
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header - Matching Checkout */}
        <div className="flex items-center gap-3 mb-8">
          <button onClick={() => navigate('/productpage')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <FaArrowLeft className="text-sm" />
          </button>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight italic uppercase">Shopping Bag</h2>
          <span className="ml-auto text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            {cart.length} {cart.length === 1 ? 'Item' : 'Items'}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Side: Items List */}
          <div className="lg:col-span-8 space-y-6">
            <div className="border-t border-gray-100">
              {cart.map((item) => (
                <div key={item.product.id} className="flex gap-4 sm:gap-8 py-8 border-b border-gray-50 group">
                  {/* Image Container - Matching ItemCard/Checkout Thumbnails */}
                  <div className="w-28 h-32 sm:w-40 sm:h-48 bg-[#F9F9F9] rounded-3xl flex-shrink-0 flex items-center justify-center p-6 border border-gray-100 relative group-hover:border-emerald-100 transition-colors">
                    <img
                      src={item.product.image || "/placeholder.png"}
                      alt={item.product.title}
                      className="max-h-full mix-blend-multiply object-contain transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => { e.target.src = "/placeholder.png"; }}
                    />
                  </div>

                  {/* Details Container */}
                  <div className="flex flex-col flex-grow py-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-black text-emerald-800 uppercase tracking-[0.2em] block mb-1">
                          {item.product.brand || "Premium Scent"}
                        </span>
                        <h3 className="text-lg font-black text-gray-900 leading-tight uppercase tracking-tight">
                          {item.product.title}
                        </h3>
                        <p className="text-xs text-gray-400 font-bold mt-1 uppercase tracking-widest">{item.product.ml || '100ml'}</p>
                      </div>
                      
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                      >
                        <FaRegTrashCan size={18} />
                      </button>
                    </div>

                    <div className="mt-auto flex justify-between items-end">
                      {/* Qty Selector - Matching Rounded aesthetic */}
                      <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-100">
                        <button
                          onClick={() => updateCartQty(item.product.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-colors text-gray-600"
                        >
                          <FaMinus size={10} />
                        </button>
                        <span className="px-4 font-black text-xs min-w-[35px] text-center text-gray-900">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQty(item.product.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-colors text-gray-600"
                        >
                          <FaPlus size={10} />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Subtotal</p>
                        <p className="font-black text-lg text-gray-900 italic">₹{item.subtotal}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Summary - Matching Checkout Sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-[#F9F9F9] rounded-3xl p-8 sticky top-24 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-black text-gray-900 mb-8 uppercase tracking-tight italic">Order Summary</h3>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                  <span>Bag Subtotal</span>
                  <span className="text-gray-900">₹{total}</span>
                </div>
                <div className="flex justify-between text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                  <span>Estimated Shipping</span>
                  <span className="text-emerald-700">Calculated Next</span>
                </div>
                
                <div className="border-t border-gray-200 pt-6 mt-4 flex justify-between items-center">
                  <span className="font-black text-gray-900 uppercase text-[11px] tracking-tight">Estimated Total</span>
                  <span className="font-black text-2xl text-gray-900 italic">₹{total}</span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-black text-white py-5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg hover:bg-emerald-900 transition-all active:scale-[0.98]"
                >
                  Checkout Now
                </button>
                
                <button
                  onClick={() => navigate('/productpage')}
                  className="w-full bg-white text-gray-900 border border-gray-200 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-gray-50 transition-all"
                >
                  Continue Shopping
                </button>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-3 text-gray-400">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[10px] border border-gray-100">✓</div>
                  <p className="text-[9px] font-bold uppercase tracking-widest leading-relaxed">
                    Secure Checkout & <br />Encrypted Payments
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;