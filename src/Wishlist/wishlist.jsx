import React from "react";
import { FaRegHeart } from "react-icons/fa";
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
      setWishlist((prev) => prev.filter((item) => item.product.id !== productId));
      toast.info("Removed from wishlist");
    } catch (err) {
      toast.error("Failed to remove");
    }
  };

  if (!isAuthenticated) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <p className="text-gray-400 font-bold uppercase tracking-widest mb-4 text-xs">Access Denied</p>
        <h2 className="text-2xl font-black text-gray-900 mb-6">Please Login to View Wishlist</h2>
        <button 
          onClick={() => navigate('/login')}
          className="bg-emerald-900 text-white px-8 py-3 rounded-full font-bold text-sm"
        >
          Login Now
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 border-b border-gray-100 pb-8 flex justify-between items-end">
          <div>
            <span className="text-[10px] font-bold text-emerald-800 tracking-[0.4em] uppercase">Your Favorites</span>
            <h2 className="text-4xl font-black flex items-center gap-4 text-gray-900 mt-2 tracking-tighter">
              MY <span className="font-light italic">WISHLIST</span>
            </h2>
          </div>
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            {wishlist.length} Items Saved
          </p>
        </header>

        {wishlist.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-gray-400 font-medium">Your wishlist is empty.</p>
            <button 
              onClick={() => navigate('/products')}
              className="mt-4 text-emerald-900 font-bold border-b-2 border-emerald-900 pb-1"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-12 gap-x-6">
            {wishlist.map((item) => (
              <div key={item.id} className="group flex flex-col w-full max-w-[260px] mx-auto">
                
                {/* Image Container */}
                <div className="relative aspect-square w-full border border-gray-100 rounded-[1.8rem] overflow-hidden bg-[#F9F9F9] flex items-center justify-center p-4">
                  <button
                    onClick={(e) => removeItem(e, item.product.id)}
                    className="absolute top-3 right-3 z-10 p-2 bg-white/90 backdrop-blur-sm text-gray-400 hover:text-red-500 rounded-full shadow-sm transition-colors"
                    title="Remove from Wishlist"
                  >
                    <FaHeartCircleMinus size={18} />
                  </button>

                  <div onClick={() => navigate(`/productview/${item.product.id}`)} className="cursor-pointer h-full w-full flex items-center justify-center">
                    <img
                      // FIXED: Using item.product.image directly from your ProductMiniSerializer
                      src={item.product.image || "/placeholder.png"}
                      alt={item.product.title}
                      className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>

                {/* Info Container */}
                <div className="flex flex-col mt-4 px-1">
                  <div className="mb-2">
                    <span className="text-emerald-800 text-[9px] font-black uppercase tracking-[0.2em] block mb-1">
                      {item.product.ml || "Premium Scent"}
                    </span>
                    <h3 
                      onClick={() => navigate(`/productview/${item.product.id}`)}
                      className="text-sm font-bold text-gray-900 leading-tight cursor-pointer hover:text-emerald-700 line-clamp-1 uppercase tracking-tight"
                    >
                      {item.product.title}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <p className="text-gray-900 text-base font-black">₹{item.product.price}</p>
                    <button 
                      onClick={() => navigate(`/productview/${item.product.id}`)}
                      className="text-[10px] font-bold uppercase tracking-widest text-emerald-900 border-b border-emerald-900"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Simplified Go to Top footer */}
      <div className="mt-20 flex justify-center border-t border-gray-50 pt-10">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-900 hover:text-emerald-600 transition-colors"
        >
          ↑ Back to Top
        </button>
      </div>
    </div>
  );
};

export default WishlistPage;