import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaCheckCircle, FaShoppingBag, FaArrowRight } from 'react-icons/fa';

const Orderplaced = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderId = location.state?.orderId;

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-6 flex justify-center">
          <div className="bg-emerald-50 p-4 rounded-full">
            <FaCheckCircle className="text-emerald-600 text-6xl animate-bounce" />
          </div>
        </div>
        
        <h2 className="text-3xl font-black uppercase italic tracking-tighter text-gray-900 mb-2">
          Order Placed!
        </h2>
        <p className="text-gray-500 text-sm mb-8 font-medium">
          Your order {orderId ? `#${orderId}` : ''} has been confirmed. <br /> 
          We'll send you a confirmation email shortly.
        </p>

        <div className="space-y-3">
          <button
            onClick={() => navigate('/orders')}
            className="w-full bg-black text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2 hover:bg-gray-900 transition-all"
          >
            <FaShoppingBag size={14} />
            View My Orders
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="w-full bg-gray-100 text-gray-900 py-4 rounded-2xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2 hover:bg-gray-200 transition-all"
          >
            Continue Shopping
            <FaArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Orderplaced;