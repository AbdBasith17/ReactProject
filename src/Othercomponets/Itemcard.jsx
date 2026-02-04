import React from "react";
import { useNavigate } from "react-router-dom";
import AddToWishlistButton from "../Wishlist/Addtowish";

function ItemCard({ id, images, title, category, price, ml, brand, oldPrice }) {
  const navigate = useNavigate();

  const imageUrl =
    images && images.length > 0
      ? images[0].image
      : "/placeholder.png";

 

  return (
    // Restricted max-width to keep it compact
    <div className="flex flex-col group w-full max-w-[260px] mx-auto transition-all duration-300">

      {/* 1. IMAGE CONTAINER - Slightly smaller radius and padding */}
      <div className="relative aspect-square w-full border border-gray-100 rounded-[1.8rem] overflow-hidden bg-[#F9F9F9] flex items-center justify-center p-4 transition-shadow group-hover:shadow-md">

        {/* Wishlist Button - Scaled down slightly */}
        <div className="absolute top-3 right-3 z-10 scale-90">
          <AddToWishlistButton
            product={{ id, title, price, category }}
          />
        </div>

        {/* Clickable Image */}
        <div
          onClick={() => navigate(`/productview/${id}`)}
          className="cursor-pointer h-full w-full flex items-center justify-center"
        >
          <img
            src={imageUrl}
            alt={title}
            className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>

      {/* 2. TEXT CONTENT - Tighter spacing */}
      <div className="flex flex-col mt-3 px-1">

        {/* Category/Type Label */}
        <span className="text-gray-400 text-[11px] font-medium uppercase tracking-wider">
          {category} {ml && `• ${ml}`}
        </span>

        {/* Product Title - Reduced text size to text-base */}
        <h3
          onClick={() => navigate(`/productview/${id}`)}
          className="text-sm font-bold text-gray-900 leading-tight cursor-pointer hover:text-green-700 transition-colors line-clamp-1 mt-1"
        >
          {title}
        </h3>

        {/* Brand Name */}
        <span className="text-indigo-400 text-[10px] font-bold uppercase tracking-[0.15em] mt-1 mb-2">
          {brand || "Premium"}
        </span>

        {/* Price Section - Smaller font sizes */}
        <div className="flex items-center gap-2">
          <p className="text-gray-900 text-lg font-black">
            {price}
          </p>


        

        </div>
      </div>
    </div>
  );
}

export default ItemCard;