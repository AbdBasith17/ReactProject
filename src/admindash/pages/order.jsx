import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');
  const [showDispatched, setShowDispatched] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const res = await axios.get('http://localhost:3000/users');
    const combinedOrders = [];

    res.data.forEach((user) => {
      if (user.orders && Array.isArray(user.orders)) {
        user.orders.forEach((order, idx) => {
          combinedOrders.push({
            orderId: `${user.id}-${idx + 1}`,
            userId: user.id,
            userName: user.name,
            userEmail: user.email,
            items: order.items || [],
            total: parseFloat(order.total || 0),
            dispatched: order.dispatched || false,
            originalUser: user,
            orderIndex: idx,
          });
        });
      }
    });

    setOrders(combinedOrders);
  };

  const handleDispatchToggle = async (order) => {
    const { originalUser, orderIndex } = order;
    const updated = { ...originalUser };
    if (Array.isArray(updated.orders)) {
      updated.orders[orderIndex] = {
        ...updated.orders[orderIndex],
        dispatched: true,
      };
      await axios.put(`http://localhost:3000/users/${originalUser.id}`, updated);
      loadOrders();
     toast.success('Order dispatched', {
  autoClose: 3000 
});
      
    }
  };

  const filteredOrders = orders
    .filter((order) =>
      order.userEmail.toLowerCase().includes(search.toLowerCase())
    )
    .filter((order) => (showDispatched ? order.dispatched : !order.dispatched));

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4 items-center">
        <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
        <div className="flex items-center justify-end mb-4">
          <span className="text-sm font-medium text-gray-700 mr-2">Show Dispatched Only</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={showDispatched}
              onChange={() => setShowDispatched(prev => !prev)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-600 transition-all duration-300"></div>
            <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-300 transform peer-checked:translate-x-full"></div>
          </label>
        </div>
      </div>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by user email"
        className="mb-6 p-2 border border-gray-300 rounded w-full"
      />

      {filteredOrders.length > 0 ? (
        filteredOrders.map((order, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg shadow p-4 mb-6"
          >
            <div className="mb-4">
              <p className="text-gray-600 text-sm">
                <span className="font-medium">Order ID:</span> {order.orderId}
              </p>
              <p className="text-gray-600 text-sm">
                <span className="font-medium">User ID:</span> {order.userId}
              </p>
              <p className="text-gray-600 text-sm">
                <span className="font-medium">Name:</span> {order.userName}
              </p>
              <p className="text-gray-600 text-sm">
                <span className="font-medium">Email:</span> {order.userEmail}
              </p>
              <p className="text-sm mt-1">
                <span className="font-medium">Status:</span>{' '}
                <span
                  className={`font-semibold ${
                    order.dispatched ? 'text-green-600' : 'text-yellow-600'
                  }`}
                >
                  {order.dispatched ? 'Dispatched' : 'Not Dispatched'}
                </span>
              </p>
            </div>

            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm text-left text-gray-700 border border-gray-200">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-2">Item</th>
                    <th className="px-4 py-2">Qty</th>
                    <th className="px-4 py-2">Price</th>
                    <th className="px-4 py-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, i) => {
                    const qty = item.quantity || 1;
                    const subtotal = (item.price * qty).toFixed(2);
                    return (
                      <tr key={i} className="border-t border-gray-200">
                        <td className="px-4 py-2">{item.title || item.name}</td>
                        <td className="px-4 py-2">{qty}</td>
                        <td className="px-4 py-2">₹{item.price}</td>
                        <td className="px-4 py-2">₹{subtotal}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <p className="text-green-800 font-semibold text-right mb-4">
              Total: ₹{order.total.toFixed(2)}
            </p>

            <div className="flex justify-end gap-2">
              {!order.dispatched && (
                <button
                  onClick={() => handleDispatchToggle(order)}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Dispatch
                </button>
              )}
              <button
                onClick={() => window.print()}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Print
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No orders found.</p>
      )}

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default Orders;
