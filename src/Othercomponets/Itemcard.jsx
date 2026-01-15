import React from "react";
import { useNavigate } from "react-router-dom";
import AddToWishlistButton from "../Wishlist/Addtowish";

function ItemCard({ id, images, title, category, price, ml }) {
  const navigate = useNavigate();

  const imageUrl =
    images && images.length > 0
      ? images[0].image
      : "/placeholder.png";

  return (
    <div className="flex flex-col justify-between border border-gray-200 rounded-xl shadow-md bg-white h-full">

      {/* Wishlist */}
      <div className="relative">
        <AddToWishlistButton
          product={{ id, title, price, category }}
        />
      </div>

      {/* Clickable area */}
      <div
        onClick={() => navigate(`/productview/${id}`)}
        className="cursor-pointer flex flex-col flex-grow"
      >
        {/* Image wrapper — FIXED HEIGHT */}
        <div className="h-56 flex items-center justify-center p-4">
          <img
            src={imageUrl}
            alt={title}
            className="max-h-full max-w-full object-contain"
          />
        </div>

        {/* Text content */}
        <div className="flex flex-col px-4 pb-4 text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2 min-h-[3rem]">
            {title}
          </h3>

          <p className="text-gray-500 text-sm font-bold mb-1">
            {ml}
          </p>

          <p className="text-orange-500 text-xl font-semibold">
            {price}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
