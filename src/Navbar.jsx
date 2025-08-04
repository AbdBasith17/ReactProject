import React from "react"
import { FaHeart } from "react-icons/fa6";
import { IoCartSharp } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";


function Navbar(){
  const navigate = useNavigate()
  const location = useLocation()

   const isCartPage = location.pathname === '/cart';

    return(
    <nav className="sticky top-0 z-50 bg-white/75 backdrop-blur-md  shadow ">
 <div className=" bg-base-400 shadow-sm flex justify-between items-stretch text-xl px-10 py-7 "  >
    <div className="flex justify-center">
      <ul className="flex font-thin-bold  gap-6  "   >
        <li className="cursor-pointer"><a href="/">Home</a></li>
        <li className="cursor-pointer"><a href="/productpage">All</a></li>
        <li className="cursor-pointer"><a  href="/men">Men</a></li>
        <li className="cursor-pointer"><a  href="/women">Women</a></li>
      </ul>
      </div>
    
    <p className="text-2xl font-thin-bold  pr-30">PERF<span className='text-green-800'>AURA</span></p>

    <div className="flex gap-6">
    <button className="btn btn-ghost btn-circle " >
        <FaHeart size={22}/>
    </button >
    
    <button className="btn btn-ghost btn-circle cursor-pointer " onClick={(e)=>{navigate('/cart')}} >
       <span className="${isCartPage ? '!text-green-800' : 'text-gray-700'}"> 
        </span> <IoCartSharp  size={25}  />
    </button>
    

    <button className="btn btn-ghost btn-circle"><MdAccountCircle size={27} />
    </button>
    </div>

</div>
</nav>

    )
}
export default Navbar