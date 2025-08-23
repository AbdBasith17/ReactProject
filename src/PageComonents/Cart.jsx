import React, { useEffect, useState } from 'react';
import { FaRegTrashCan } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedCart = JSON.parse(localStorage.getItem('cart'));
      if (storedCart) {
        setCartItems(storedCart);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error("Error parsing cart from localStorage", error);
      setCartItems([]);
    }
  }, []);

  const updateQuantity = (id, quantity) => {
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-10 py-6">
      <h2 className="text-3xl sm:text-4xl font-normal mb-4 text-center py-5">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-center">Cart is empty.</p>
      ) : (
        <div className="flex flex-col gap-4 max-w-4xl backdrop-blur-sm border border-slate-200 shadow-xl rounded-md mx-auto">
          {cartItems.map((item) => (
            <div key={item.id} className="flex flex-col md:flex-row items-center justify-between gap-4 pb-5 px-4 sm:px-6 md:px-10 py-4 rounded shadow-sm bg-white">
          
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-1/2">
                <img src={item.img} alt={item.title} className="h-28 w-28 object-cover rounded" />
                <div className="text-center sm:text-left">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.category} • {item.ml}</p>
                  <p className="text-sm font-medium text-gray-800 pt-2">₹{item.price}</p>
                </div>
              </div>

              
              <div className="flex flex-col sm:flex-row items-center justify-evenly w-full md:w-1/2 gap-3 sm:gap-5">
                <div className="flex items-center border border-slate-300 shadow-sm rounded-md overflow-hidden">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-9 hover:bg-gray-200">−</button>
                  <div className="w-10 h-9 flex items-center justify-center border-slate-500">{item.quantity}</div>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-9 hover:bg-gray-200">+</button>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="px-3 w-auto font-light h-9 flex items-center border border-slate-300 bg-red-50 shadow-sm rounded-md text-red-500 hover:text-red-700"
                >
                  <FaRegTrashCan size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="mt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 max-w-4xl mx-auto">
          <div className="text-lg font-semibold">
            Total: <span className="text-green-700">₹{total.toFixed(2)}</span>
          </div>
          <button
            className="bg-green-800 text-white px-6 py-2 rounded hover:bg-green-700 transition"
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
