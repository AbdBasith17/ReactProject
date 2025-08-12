import React, { useState, useEffect } from 'react';
import {Link ,useNavigate} from 'react-router-dom'

import axios from 'axios';

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate=useNavigate()

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);
  }, []);

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

   const handlePlaceOrder = async () => {
  if (!user) return;

  const order = {
    date: new Date().toLocaleString(),
    items: cartItems,
    total: total,
  };

  try {
    // Get current user from DB
    const res = await axios.get(`http://localhost:3000/users/${user.id}`);
    const existingOrders = res.data.orders || [];

    // Add new order
    const updatedUser = {
      ...res.data,
      orders: [...existingOrders, order],
    };

    // Update user with new order
    await axios.put(`http://localhost:3000/users/${user.id}`, updatedUser);

    // Clear cart in localStorage AND state
    localStorage.removeItem("cart");
    setCartItems([]); // <--- Clear cart in React state too

   navigate('/orderplaced', { replace: true });
 // <--- Set orderPlaced AFTER clearing cart state
  } catch (err) {
    console.error("Error placing order:", err);
  }
};


 

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
