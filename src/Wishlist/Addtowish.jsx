import React, { useEffect, useState } from "react";
import { FaHeart, FaHeartCirclePlus } from "react-icons/fa6";
import { toast } from "react-toastify";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const AddToWishlistButton = ({ product }) => {
  const { wishlist, setWishlist, isAuthenticated } = useAuth();
  const [btnLoading, setBtnLoading] = useState(false);

  // Instant check using global state
  const isInWishlist = wishlist.some((item) => item.product.id === product.id);

 const handleToggleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) return toast.error("Please login");

    try {
        if (isInWishlist) {
            await api.delete(`wishlist/remove/${product.id}/`);
            setWishlist((prev) => prev.filter((item) => item?.product?.id !== product.id));
            toast.info("Removed from wishlist");
        } else {
            const res = await api.post("wishlist/add/", { product_id: product.id });
            

            setWishlist((prev) => [...prev, res.data]);
            toast.success("Added to wishlist");
        }
    } catch (err) {
        toast.error("Action failed");
    }
};




  return (
    <div onClick={handleToggleWishlist} className="absolute top-2 right-2 cursor-pointer">
      {isInWishlist ? (
        <FaHeart size={28} className="text-green-600" />
      ) : (
        <FaHeartCirclePlus size={30} className="text-gray-500 hover:text-green-700" />
      )}
    </div>
  );
};

export default AddToWishlistButton;
