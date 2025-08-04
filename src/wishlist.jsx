import React from "react";
import { FaRegHeart, FaTrashAlt } from "react-icons/fa";

const wishlistItems = [
  {
    id: 1,
    name: "Classic Denim Jacket",
    price: "$59.99",
    image: "https://via.placeholder.com/200x250?text=Product+1",
  },
  {
    id: 2,
    name: "Cotton Oversized Hoodie",
    price: "$39.99",
    image: "https://via.placeholder.com/200x250?text=Product+2",
  },
  {
    id: 3,
    name: "Slim Fit Chinos",
    price: "$45.00",
    image: "https://via.placeholder.com/200x250?text=Product+3",
  },
];

export default function Wishlist() {
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="bg-white shadow rounded-md p-4 relative group transition hover:shadow-md"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-60 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-medium">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.price}</p>

                <button
                  className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition"
                  title="Remove from Wishlist"
                >
                  <FaTrashAlt />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
