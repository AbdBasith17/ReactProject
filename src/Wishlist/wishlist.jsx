import React from "react";
import { FaHeartCircleMinus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const WishlistPage = () => {
  const { wishlist, setWishlist, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const removeItem = async (e, productId) => {
    e.stopPropagation();
    try {
      await api.delete(`wishlist/remove/${productId}/`);
      setWishlist((prev) => prev.filter((item) => item?.product?.id !== productId));
      toast.info("Removed from wishlist");
    } catch (err) {
      toast.error("Failed to remove");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Please Login to View Wishlist</h2>
          <button onClick={() => navigate('/login')} className="bg-emerald-900 text-white px-8 py-3 rounded-full font-bold">
            Login Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 border-b border-gray-100 pb-8 flex justify-between items-end">
          <h2 className="text-4xl font-black text-gray-900 tracking-tighter">MY WISHLIST</h2>
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{wishlist?.length || 0} Items</p>
        </header>

        {wishlist?.length === 0 ? (
          <div className="py-20 text-center text-gray-400">Your wishlist is empty.</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 cursor-pointer" >
            {wishlist.map((item) => (
              <div key={item.id} className="group relative cursor-pointer"   onClick={() => navigate(`/productview/${item.product?.id}`)} >
                <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden relative">
                  <button onClick={(e) => removeItem(e, item.product?.id)} className="absolute top-2 right-2 z-10 p-2 bg-white rounded-full shadow-md text-red-500">
                    <FaHeartCircleMinus size={20} />
                  </button>
                  <img 
                    src={item.product?.image || "/placeholder.png"} 
                    alt={item.product?.title} 
                    className="w-full h-full object-contain p-4"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="font-bold text-sm truncate uppercase">{item.product?.title}</h3>
                  <p className="text-emerald-800 font-black">₹{item.product?.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;