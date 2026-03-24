import React, { useState } from "react";
import { FaHeart, FaHeartCirclePlus } from "react-icons/fa6";
import { toast } from "react-toastify";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const AddToWishlistButton = ({ product }) => {
  const { wishlist, setWishlist, isAuthenticated, refreshWishlist } = useAuth();
  const [loading, setLoading] = useState(false);

  // Use optional chaining to prevent crashes during state transitions
  const isInWishlist = wishlist?.some((item) => item?.product?.id === product?.id);

  const handleToggleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) return toast.error("Please login first");
    if (loading) return;

    setLoading(true);
    try {
      if (isInWishlist) {
        await api.delete(`wishlist/remove/${product.id}/`);
        // This will now work because setWishlist is exported in AuthContext
        setWishlist((prev) => prev.filter((item) => item?.product?.id !== product.id));
        toast.info("Removed from wishlist");
      } else {
        await api.post("wishlist/add/", { product_id: product.id });
        // Fetch fresh data from server to ensure product objects are fully formed
        await refreshWishlist();
        toast.success("Added to wishlist");
      }
    } catch (err) {
      console.error("Wishlist Error:", err.response?.data || err.message);
      toast.error("Action failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      onClick={handleToggleWishlist} 
      className={`absolute top-2 right-2 cursor-pointer transition-all ${loading ? 'opacity-50' : 'opacity-100'}`}
    >
      {isInWishlist ? (
        <FaHeart size={28} className="text-green-600 animate-pulse" />
      ) : (
        <FaHeartCirclePlus size={30} className="text-gray-400 hover:text-green-700 transition-colors" />
      )}
    </div>
  );
};

export default AddToWishlistButton;