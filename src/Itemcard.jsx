import React from 'react';
import { PiHeartStraightThin } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';
import { FaHeartCirclePlus } from "react-icons/fa6";

function ItemCard({ id,image, title, price, ml }) {
  const navigate = useNavigate();
  // console.log('Re ID:', id);

  return (
<div className="flex flex-col justify-between border border-gray-200 rounded-xl shadow-md bg-white h-full w-75 "  >
     <div onClick={(e)=>{navigate(`/productview/${id}`);}} className='cursor-pointer'> 
      <div className="relative">
        
        <button className="absolute top-2 right-2 text-gray-500 hover:text-green-700 cursor-pointer"
        value={"add to bfev"}>
          <FaHeartCirclePlus  size={30} />
        </button>

        
        <img
          className="w-full max-h-70 object-contain p-4"
          src={image}
          alt={title}
        />
      </div>

 
      <div className="flex flex-col flex-grow px-4 pb-4 text-center">
        <div className='h-15'>
        <h3 className="text-xl font-semibold text-gray-800 mb-1 px-10">{title}</h3>
        </div>
        <p className="text-gray-500 text-sm mb-1 font-bold line-clamp-2">{ml}</p>
        <p className="text-orange-500 text-lg font-semibold mb-4">{price}</p>

    
        <div className="mt-auto flex justify-center gap-3 flex-wrap">
            
         
          <button className="py-2 px-4  bg-green-800 border  text-white rounded-lg text-sm font-medium hover:bg-green-600" onClick={(e)=>{
          
  navigate(`/productview/${id}`);
}}> 
           Add to Cart
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}

export default ItemCard;
