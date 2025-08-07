import React, { useState, useEffect } from 'react';
import {Link } from 'react-router-dom'
import { MdOutlineAssignmentReturn } from "react-icons/md";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);
  }, []);

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    localStorage.removeItem('cart');
  };

  if (orderPlaced) {
    return (
      <div className="container mx-auto px-4 py-30 max-w-2xl h-80 text-center">
        <h2 className="text-3xl font-bold text-green-600 mb-4">Order Placed Successfully!</h2>
        <p className="text-gray-600">Thank you for your purchase.</p>
        <br />
        <Link to='/productpage' className="text-2xl font-bold flex items-center justify-center text-gray-500 mb-4">Continue <span className='text-green-600 ml-3 flex items-center'>Shopping <MdOutlineAssignmentReturn className='ml-3' size={30}/></span></Link> 

      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      
      <h2 className="text-3xl font-normal mb-6 text-center py-5">Checkout</h2>

      <div className="bg-gray-50 backdrop-blur-sm  border border-slate-200   shadow-xl rounded-md  p-6">
        <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
        <ul className="space-y-4">
          {cartItems.map((item) => (
            <li key={item.id} className="flex justify-between items-start">
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity} • {item.ml}</p>
              </div>
              <p className="font-semibold">₹{item.price * item.quantity}</p>
            </li>
          ))}
        </ul>

        <div className="border-t pt-4 mt-4 flex justify-between font-semibold">
          <span>Total</span>
          <span className="text-green-700">₹{total}</span>
        </div>

        <button
          onClick={handlePlaceOrder}
          className="bg-green-800 text-white px-6 py-2 rounded hover:bg-gren-700 w-full mt-6"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
