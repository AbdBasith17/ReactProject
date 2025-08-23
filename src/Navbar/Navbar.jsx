import React, { useState } from "react";
import { FaHeart } from "react-icons/fa6";
import { IoCartSharp } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Serching from "./Search/search";
import axios from "axios";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleClick = async (type) => {
    const u = JSON.parse(localStorage.getItem("user"));
    if (!u) {
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
        { autoClose: false, style: { width: "340px" } }
      );
      return;
    }

    if (type === "cart") {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      if (!cart.length) toast.info("Your cart is empty.", { autoClose: 1500 });
      navigate("/cart");
    }

    if (type === "wishlist") {
      try {
        const res = await axios.get(`http://localhost:3000/wishlists?userId=${u.id}`);
        const wl = res.data[0];
        if (!wl?.items.length) toast.info("Your wishlist is empty.", { autoClose: 1500 });
        navigate("/wishlist");
      } catch (e) {
        console.error("Wishlist error", e);
      }
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between lg:relative">
        
        {/* hamburrrggg */}
        <button
          className="lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        <h1 className="text-2xl font-semibold mx-auto lg:absolute lg:left-1/2 lg:-translate-x-1/2">
          PERF<span className="text-green-800">AURA</span>
        </h1>

      
        <div className="lg:hidden">
          <button onClick={() => navigate("/userdata")} aria-label="User">
            {user ? (
              <MdAccountCircle size={28} className="text-black" />
            ) : (
              <p className="text-sm px-3 py-1 bg-black text-white rounded hover:bg-green-700">
                Login
              </p>
            )}
          </button>
        </div>

        <div className="hidden lg:flex justify-between items-center w-full">
          
          <ul className="flex gap-8 text-lg font-medium">
            <li><Link to="/" className={isActive("/") ? "text-green-800 border-b-2 border-green-800 pb-1" : "text-black"}>Home</Link></li>
            <li><Link to="/productpage" className={isActive("/productpage") ? "text-green-800 border-b-2 border-green-800 pb-1" : "text-black"}>All</Link></li>
            <li><Link to="/men" className={isActive("/men") ? "text-green-800 border-b-2 border-green-800 pb-1" : "text-black"}>Men</Link></li>
            <li><Link to="/women" className={isActive("/women") ? "text-green-800 border-b-2 border-green-800 pb-1" : "text-black"}>Women</Link></li>
          </ul>

          <div className="flex gap-5 items-center">
            <Serching />
            <button onClick={() => handleClick("wishlist")}>
              <FaHeart className={isActive("/wishlist") ? "text-green-800" : "text-black"} size={23} />
            </button>
            <button onClick={() => handleClick("cart")}>
              <IoCartSharp className={isActive("/cart") ? "text-green-800" : "text-black"} size={27} />
            </button>
            <button onClick={() => navigate("/userdata")}>
              {user ? (
                <div className="flex items-center gap-1">
                  <p className="text-sm">
                    Hello <span className="text-green-800 font-semibold">{user.name}</span>
                  </p>
                  <MdAccountCircle
                    className={isActive("/userdata") ? "text-green-800" : "text-black"}
                    size={25}
                  />
                </div>
              ) : (
                <p className="text-sm font-medium px-2 py-1 bg-black text-white rounded hover:bg-green-700">Login</p>
              )}
            </button>
          </div>
        </div>
      </div>

      {/*  Dropdowwwnnnnn */}
      {menuOpen && (
        <div className="lg:hidden px-4 pt-4 pb-6 space-y-4 text-center bg-white shadow">
          <ul className="flex flex-col gap-4 text-lg font-medium">
            <li><Link to="/" onClick={() => setMenuOpen(false)} className={isActive("/") ? "text-green-800" : "text-black"}>Home</Link></li>
            <li><Link to="/productpage" onClick={() => setMenuOpen(false)} className={isActive("/productpage") ? "text-green-800" : "text-black"}>All</Link></li>
            <li><Link to="/men" onClick={() => setMenuOpen(false)} className={isActive("/men") ? "text-green-800" : "text-black"}>Men</Link></li>
            <li><Link to="/women" onClick={() => setMenuOpen(false)} className={isActive("/women") ? "text-green-800" : "text-black"}>Women</Link></li>
          </ul>

          <div className="flex justify-center gap-6 mt-6">
            <Serching />
            <button onClick={() => handleClick("wishlist")}>
              <FaHeart className="text-black" size={22} />
            </button>
            <button onClick={() => handleClick("cart")}>
              <IoCartSharp className="text-black" size={24} />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
