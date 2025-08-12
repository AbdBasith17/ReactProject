
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaShoppingBag } from "react-icons/fa";

function UserOrders() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [orders, setOrders] = useState([]);
  const [showOrders, setShowOrders] = useState(false);

  useEffect(() => {
    const fetchUserOrders = async () => {
      if (!user) return;
      try {
        const res = await axios.get(`http://localhost:3000/users/${user.id}`);
        setOrders(res.data.orders || []);
      } catch (err) {
        console.error("Failed to fetch user orders", err);
      }
    };

    fetchUserOrders();
  }, [user]);

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-1 max-w-2xl text-center">
      <button
        onClick={() => setShowOrders((prev) => !prev)}
        className="bg-green-700 hover:bg-green-800 text-white font-medium px-5 py-2 rounded mb-6"
      >
        {showOrders ? "Hide Orders" : "Show Previous Orders"}
      </button>

      {showOrders && (
        <>
          <h3 className="text-2xl font-medium mb-4 flex items-center justify-center gap-2">
           Your Previous <span className="text-green-700">Orders</span> <FaShoppingBag className="text-green-700" /> 
          </h3>

          {orders.length === 0 ? (
            <p className="text-gray-500">No orders found.</p>
          ) : (
            <ul className="space-y-4 text-left ">
             {[...orders].reverse().map((order, index) => (
                <li key={index} className="border-slate-300 border-2 p-4 rounded shadow-xl">
               <p className="text-xl text-gray-600 pb-4"> ORDER SUMMARY</p>
                  <p className="text-md text-gray-600 pb-2"><span className="text-green-800 font-medium"> Order Placed Data & time:</span> {order.date}</p>
               {/* <div className="w-{1px} border-1 border-green-700"></div> */}
                  <ul className="mt-2 space-y-1 pb-3">
                    {order.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="text-gray-800 text-lg font-semibold flex justify-between"
                      >
                        <span>
                          {item.title} |  Qty:{item.quantity}
                        </span>
        
        
                        <span>₹{item.price * item.quantity}</span>
                      </li>
                    ))}
                  </ul>
                  <hr />
                  <div className="mt-2 font-medium  text-lg text-right text-green-700">
                    Total: ₹{order.total}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}

export default UserOrders;
