import React from 'react';
import { FaRegTrashCan, FaPlus, FaMinus } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const { cart, updateCartQty, removeFromCart } = useAuth();
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-light text-gray-400">Your cart is empty</h2>
        <button
          onClick={() => navigate('/productpage')}
          className="text-emerald-800 font-bold uppercase tracking-widest text-sm border-b-2 border-emerald-800 pb-1"
        >
          Explore Collection
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="max-w-5xl mx-auto px-6 pt-10">
        <h2 className="text-4xl font-black text-gray-900 mb-10 tracking-tight">Shopping Bag</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Items List */}
          <div className="lg:col-span-2 space-y-8">
            {cart.map((item) => (
              <div key={item.product.id} className="flex gap-6 border-b border-gray-100 pb-8">
                {/* Image */}
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-[#F9F9F9] rounded-2xl flex-shrink-0 flex items-center justify-center p-4">
                  <img
                    // CHANGE THIS LINE: use item.product.image instead of the images array
                    src={item.product.image || "/placeholder.png"}
                    alt={item.product.title}
                    className="max-h-full mix-blend-multiply object-contain"
                    onError={(e) => { e.target.src = "/placeholder.png"; }}
                  />
                </div>

                {/* Details */}
                <div className="flex flex-col justify-between flex-grow py-1">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-black text-gray-900 leading-tight uppercase tracking-tight">
                        {item.product.title}
                      </h3>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-gray-300 hover:text-red-500 transition-colors"
                      >
                        <FaRegTrashCan size={23} />
                      </button>
                    </div>
                    <p className="text-xs text-emerald-600 font-bold uppercase tracking-widest mt-1">
                      {item.product.brand || "brand name"}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">{item.product.category}</p>
                  </div>

                  <div className="flex justify-between items-end mt-4">
                    {/* Qty Selector */}
                    <div className="flex items-center border border-gray-200 rounded-full px-3 py-1 bg-gray-50">
                      <button
                        onClick={() => updateCartQty(item.product.id, item.quantity - 1)}
                        className="p-1 hover:text-emerald-700 transition-colors"
                      >
                        <FaMinus size={10} />
                      </button>
                      <span className="px-4 font-bold text-sm min-w-[30px] text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQty(item.product.id, item.quantity + 1)}
                        className="p-1 hover:text-emerald-700 transition-colors"
                      >
                        <FaPlus size={10} />
                      </button>
                    </div>
                    <p className="font-black text-gray-900">₹{item.subtotal}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-[#F9F9F9] rounded-[2rem] p-8 sticky top-32">
              <h3 className="text-xl font-black text-gray-900 mb-6 uppercase tracking-tight">Summary</h3>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-500 text-sm">
                  <span>Subtotal</span>
                  <span>₹{total}</span>
                </div>
                <div className="flex justify-between text-gray-500 text-sm">
                  <span>Shipping</span>
                  <span className="text-emerald-600 font-bold uppercase text-[10px]">Calculated at checkout</span>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between">
                  <span className="font-black text-gray-900 uppercase tracking-widest text-xs">Total</span>
                  <span className="font-black text-xl text-gray-900">₹{total}</span>
                </div>
              </div>

              <button
                className="w-full bg-black text-white py-5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] hover:bg-emerald-800 transition-all"
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout
              </button>

              <p className="text-[10px] text-gray-400 text-center mt-6 leading-relaxed italic">
                Shipping and taxes calculated during checkout. <br />
                Secure encrypted payment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;