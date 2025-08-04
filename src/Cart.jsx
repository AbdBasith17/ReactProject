import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrashAlt } from 'react-icons/fa';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  // Fetch items from db.json (simulate a cart selection)
  useEffect(() => {
    axios.get('http://localhost:3000/products') // load first 3 products as cart demo
      .then((response) => {
        const productsWithQty = response.data.map((item) => ({
          ...item,
          quantity: 1
        }));
        setCartItems(productsWithQty);
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const updateQuantity = (id, newQty) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, newQty) } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Cart is empty.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex flex-col md:flex-row items-center justify-between border p-4 rounded shadow-sm bg-white">
              <div className="flex items-center gap-4 w-full md:w-1/2">
                <img src={item.img} alt={item.title} className="h-24 w-24 object-cover rounded" />
                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.ml} • ₹{item.price}</p>
                </div>
              </div>

              <div className="flex items-center justify-between w-full md:w-1/2 mt-4 md:mt-0">
                <div className="flex items-center border rounded overflow-hidden">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 hover:bg-gray-200">−</button>
                  <div className="w-10 h-8 flex items-center justify-center border-l border-r">
                    {item.quantity}
                  </div>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 hover:bg-gray-200">+</button>
                </div>
                <button onClick={() => removeItem(item.id)} className="ml-4 text-red-500 hover:text-red-700">
                  <FaTrashAlt className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Cart Summary */}
      {cartItems.length > 0 && (
        <div className="mt-8 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="text-lg font-semibold">
            Total: <span className="text-violet-700">₹{total}</span>
          </div>
          <button className="mt-4 md:mt-0 bg-violet-700 text-white px-6 py-2 rounded hover:bg-violet-800 transition">
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
 