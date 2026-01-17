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

  if (!isAuthenticated) return <div className="p-20 text-center">Please Login</div>;

  return (
    <div className="min-h-screen bg-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 text-left">
          <h2 className="text-3xl font-black flex items-center gap-3 text-gray-900">
            <FaRegHeart className="text-indigo-500" />
            My Wishlist
          </h2>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-12 gap-x-6">
          {wishlist.map((item) => (
            <div key={item.id} className="group flex flex-col w-full max-w-[260px] mx-auto">
              
              {/* IMAGE CONTAINER - Fixed Aspect Square */}
              <div className="relative aspect-square w-full border border-gray-100 rounded-[1.8rem] overflow-hidden bg-[#F9F9F9] flex items-center justify-center p-4">
                <button
                  onClick={(e) => removeItem(e, item.product.id)}
                  className="absolute top-3 right-3 z-10 p-2 bg-white/90 backdrop-blur-sm text-gray-400 hover:text-red-500 rounded-full shadow-sm"
                >
                  <FaHeartCircleMinus size={18} />
                </button>

                <div onClick={() => navigate(`/productview/${item.product.id}`)} className="cursor-pointer h-full w-full flex items-center justify-center">
                  <img
                    src={item.product.images?.[0]?.image || "/placeholder.png"}
                    alt={item.product.title}
                    className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform group-hover:scale-105"
                  />
                </div>
              </div>

              {/* TEXT CONTENT - Fixed height [110px] to match ItemCard */}
              <div className="flex flex-col mt-3 px-1 h-[110px] justify-between text-left">
                <div>
                  <span className="text-gray-400 text-[10px] font-bold uppercase tracking-wider block">
                    {item.product.category} {item.product.ml && `• ${item.product.ml}`}
                  </span>
                  <h3 
                    onClick={() => navigate(`/productview/${item.product.id}`)}
                    className="text-base font-bold text-gray-900 leading-tight mt-1 cursor-pointer hover:text-indigo-600 line-clamp-1"
                  >
                    {item.product.title}
                  </h3>
                  <span className="text-indigo-400 text-[10px] font-bold uppercase tracking-[0.15em] mt-1 block">
                    {item.product.brand || "Premium"}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-1">
                  <p className="text-gray-900 text-lg font-black">₹{item.product.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;