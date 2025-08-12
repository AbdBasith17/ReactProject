import React from "react";
import { FaHeart } from "react-icons/fa6";
import { IoCartSharp } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Serching from "./Search/search";
import axios from "axios";
import { MdVerifiedUser } from "react-icons/md";



function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));


  const isCartPage = (path) => location.pathname === path;

 const handleClick = async (type) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    toast.info(
      <div className="flex items-center justify-between gap-4">
        <span>Please log in to continue.</span>
        <button
          className="text-sm text-green-800 border border-green-800 px-3 py-1 rounded hover:bg-green-800 hover:text-white transition"
          onClick={() => {
            toast.dismiss();
            navigate("/signin");
          }}
        >
          Login
        </button>
      </div>,
      {
        autoClose: false,
        style: { width: "340px" },
      }
    );
    return;
  }

  if (type === "cart") {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
      toast.info("Your cart is empty.", { autoClose: 1500 });
    }
    navigate("/cart");
    return;
  }

  if (type === "wishlist") {
    try {
      const res = await axios.get(`http://localhost:3000/wishlists?userId=${user.id}`);
      const wishlist = res.data[0];

      if (!wishlist || wishlist.items.length === 0) {
        toast.info("Your wishlist is empty.", { autoClose: 1500 });
      }

      navigate("/wishlist");
    } catch (error) {
      console.error("Error fetching wishlist:", error);

    }
  }}

  return (
    <nav className="sticky top-0 z-50 bg-white/75 backdrop-blur-md shadow">
      <div className="relative flex items-center px-10 py-7">
      
        <div className="flex flex-1">
          <ul className="flex gap-8 text-xl font-thin-bold ">
            <li className="cursor-pointer">
              <Link to="/"
                className={isCartPage("/") ? "text-green-800 border-l-7 pl-3 rounded-4xl"  : "text-black"}
                
              >
                Home</Link>
             
            </li>
            <li className="cursor-pointer">
              <Link to="/productpage"
                className={isCartPage("/productpage") ? "text-green-800 border-l-7 pl-3 rounded-4xl" : "text-black"}
                
              >
                All
             </Link>
            </li>
            <li className="cursor-pointer">
              <Link   className={isCartPage("/men") ? "text-green-800 border-l-7 pl-3 rounded-4xl" : "text-black"}   to="/men" >
                Men   </Link>
            </li>
            <li className="cursor-pointer"> <Link className={isCartPage("/women") ? "text-green-800 border-l-7 pl-3 rounded-4xl" : "text-black"}   to="/women" >
                Women
                </Link>
            </li>
          </ul>
        </div>

        <p className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-semibold whitespace-nowrap">
          PERF<span className="text-green-800">AURA</span>
        </p>

    
        <div className="flex flex-1 justify-end gap-6 items-center">
          <Serching />
          <button className="btn btn-ghost cursor-pointer btn-circle" onClick={()=>{handleClick("wishlist")}} >
            <FaHeart
              className={isCartPage("/wish") ? "text-green-800" : "text-black"}
              size={25}
            />
          </button>

          <button className="btn btn-ghost btn-circle cursor-pointer" onClick={()=>{handleClick("cart")}}>
            <IoCartSharp
              className={isCartPage("/cart") ? "text-green-800" : "text-black"}
              size={31}
            />
          </button>


          <button
  className="btn btn-ghost btn-circle cursor-pointer"
  onClick={() => navigate("/userdata")}
>
  {user ? (
    <div className="flex">
      <p className="text-xl pr-2">Hello <span className="text-green-800 font-semibold">{user.name}</span></p>
    <MdAccountCircle
      className={isCartPage("/userdata") ? "text-green-800" : "text-black"}
      size={30}
    /></div>
  ) : (
   <p className="text-md font-medium px-2 py-1  bg-black text-white border rounded-xl border-slate-600 hover:bg-green-700">Login</p>
  )}
</button>

        </div>
      </div>
    </nav>
  );
}

export default Navbar
