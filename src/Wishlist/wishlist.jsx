import React, { useEffect, useState } from "react";
import { FaRegHeart, FaTrashAlt } from "react-icons/fa";
import { FaHeartCircleMinus } from "react-icons/fa6";


import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [wishlistId, setWishlistId] = useState(null);
const navigate=useNavigate()
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) return;

   
    const fetchWishlist = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/wishlists?userId=${user.id}`);
        if (res.data.length > 0) {
          setWishlistItems(res.data[0].items);
          setWishlistId(res.data[0].id);
        } else {
          setWishlistItems([]);
        }
      } catch (error) {
        console.error("Failed to fetch wishlist:", error);
      }
    };

    fetchWishlist();
  }, [user]);

  const handleRemove = async (productId) => {
    const updatedItems = wishlistItems.filter(item => item.id !== productId);
    setWishlistItems(updatedItems);

    try {
      await axios.put(`http://localhost:3000/wishlists/${wishlistId}`, {
        userId: user.id,
        items: updatedItems
      });
    } catch (error) {
      console.error("Failed to update wishlist:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold mb-8 flex items-center gap-3">
          <FaRegHeart size={28} />
          Your Wishlist
        </h2>

        {wishlistItems.length === 0 ? (
          <p className="text-gray-500">Your wishlist is currently empty.</p>
        ) : (
          <div className="grid grid-cols-1 cursor-pointer sm:grid-cols-2 lg:grid-cols-3 gap-6" >
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                onClick={() => {
 
  navigate(`/productview/${item.id}`);
}} 
                className="flex flex-col justify-between border border-gray-200 rounded-xl shadow-md bg-white h-full w-full"
              >
                <div className="relative">
                  <button
                    className="absolute top-2 right-2 p-3 text-gray-500 hover:text-red-600"
                    title="Remove from Wishlist"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(item.id);
                    }}
                  >
                    <FaHeartCircleMinus size={30} />
                  </button>

                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full max-h-72 object-contain p-4"
                  />
                </div>

                <div className="flex flex-col flex-grow px-4 pb-4 text-center">
                  <h3 className="text-xl font-semibold text-gray-800 mb-1 px-4">
                    {item.title}
                  </h3>
                  <p className="text-orange-500 text-xl font-semibold mb-2">
                    {item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
