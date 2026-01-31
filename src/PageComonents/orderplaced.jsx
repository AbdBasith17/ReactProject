import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaShoppingBag, FaArrowRight } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext'; // Added this

const Orderplaced = () => {
  const navigate = useNavigate();
  const { refreshAuth } = useAuth(); // Assuming your context has a way to re-fetch user/cart data

  useEffect(() => {
    // Refreshing auth will update the cart count to 0 in the navbar 
    // because the backend cart is now empty
    if (refreshAuth) refreshAuth();
    
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Success Icon with Pulse Effect */}
        <div className="mb-6 flex justify-center">
          <div className="bg-emerald-50 p-6 rounded-full animate-bounce">
            <FaCheckCircle className="text-emerald-600 text-6xl" />
          </div>
        </div>
        
        {/* Success Text */}
        <h2 className="text-3xl font-black uppercase italic tracking-tighter text-gray-900 mb-2">
          Success!
        </h2>
        <p className="text-[11px] font-bold uppercase tracking-widest text-emerald-800 mb-4">
            Order Processed
        </p>
        <p className="text-gray-500 text-sm mb-10 font-medium leading-relaxed">
          Your order has been placed successfully. <br /> 
          Our artisans are preparing your fragrance for shipment.
        </p>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 gap-3">
          <button
            onClick={() => navigate('/userdata')} // Adjust this to wherever your "My Orders" tab is
            className="w-full bg-black text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] shadow-lg hover:bg-emerald-900 transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <FaShoppingBag size={14} /> View My Orders
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="w-full bg-gray-100 text-gray-900 py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-gray-200 transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            Continue Shopping <FaArrowRight size={14} />
          </button>
        </div>
        
        {/* Decorative footer */}
        <p className="mt-12 text-[9px] text-gray-300 font-bold uppercase tracking-[0.3em]">
            PerfAura Signature Collection
        </p>
      </div>
    </div>
  );
};

export default Orderplaced;