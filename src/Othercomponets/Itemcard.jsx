import React from 'react';
import { PiHeartStraightThin } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';
import { FaHeartCirclePlus } from "react-icons/fa6";
import AddToWishlistButton from '../Wishlist/Addtowish';


function ItemCard({ id,image, title, category,price, ml }) {
  const navigate = useNavigate();
  // console.log('Re ID:', id);

  return (

<div className="flex flex-col justify-between border border-gray-200 rounded-xl shadow-md bg-white h-full w-75">
  <div className="relative">
   
    <AddToWishlistButton
      product={{ id, title, price, img: image, category }}
    />

    <div
            onClick={() => navigate(`/productview/${id}`)}
         className="cursor-pointer"
    >
      <img
        className="w-full max-h-70 object-contain p-4"
        src={image}
        alt={title}
      />

      <div className="flex flex-col flex-grow px-4 pb-4 text-center">
        <div className='h-15'>
            <h3 className="text-xl font-semibold text-gray-800 mb-1 px-10">{title}</h3>
        </div>
         <p className="text-gray-500 text-sm mb-1 font-bold line-clamp-2">{ml}</p>
        <p className="text-orange-500 text-xl font-semibold mb-4">{price}</p>
      </div>
    </div>
  </div>
</div>

  );
}

export default ItemCard;
