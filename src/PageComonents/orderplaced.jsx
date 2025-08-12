import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineAssignmentReturn } from "react-icons/md";

function OrderPlaced(){
      
    return (
      <div className="container mx-auto px-4 py-30 max-w-2xl h-80 text-center">
        <h2 className="text-3xl font-bold text-green-600 mb-4">Order Placed Successfully!</h2>
        <p className="text-gray-600">Thank you for your purchase.</p>
        <br />
        <Link to='/productpage' className="text-2xl font-bold flex items-center justify-center text-gray-500 mb-4">Continue <span className='text-green-600 ml-3 flex items-center'>Shopping <MdOutlineAssignmentReturn className='ml-3' size={30}/></span></Link> 

      </div>
    );
  }
export default OrderPlaced