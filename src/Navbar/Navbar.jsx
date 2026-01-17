import React from "react";
import { FaRegHeart } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Serching from "./Search/search";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const { user, loading, wishlist, cart } = useAuth();

  if (loading) return null;
  const isActive = (path) => location.pathname === path;

  const wishlistCount = wishlist?.length || 0;
  const cartCount = cart?.length || 0;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* LOGO */}
        <h1 
          className="text-2xl font-bold tracking-tighter cursor-pointer min-w-fit" 
          onClick={() => navigate("/")}
        >
          PERF<span className="text-emerald-800 font-light tracking-[0.1em]">AURA</span>
        </h1>

        {/* MENU */}
        <ul className="hidden lg:flex items-center gap-10 mx-auto">
          {[["/", "Home"], ["/productpage", "Collection"], ["/men", "Men"], ["/women", "Women"]].map(
            ([path, label]) => (
              <li key={path} className="relative group">
                <Link
                  to={path}
                  className={`text-[13px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 ${
                    isActive(path) ? "text-emerald-800" : "text-gray-500 hover:text-emerald-700"
                  }`}
                >
                  {label}
                </Link>
                <span className={`absolute -bottom-1.5 left-0 h-[2px] bg-emerald-800 transition-all duration-300 ${
                  isActive(path) ? "w-full" : "w-0 group-hover:w-full"
                }`}></span>
              </li>
            )
          )}
        </ul>

        {/* ACTIONS */}
        <div className="flex items-center gap-4">
          <Serching />
          <div className="flex items-center gap-5 text-gray-700">
            
            {/* WISHLIST WITH COUNT */}
            <button onClick={() => navigate("/wishlist")} className="relative hover:text-emerald-700 transition-transform">
              <FaRegHeart size={22} />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-emerald-800 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-white">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* CART WITH COUNT */}
            <button onClick={() => navigate("/cart")} className="relative hover:text-emerald-700 transition-transform">
              <IoCartOutline size={25} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-emerald-800 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-white">
                  {cartCount}
                </span>
              )}
            </button>

            <div className="border-l pl-5 border-gray-100 ml-1">
              <button className="flex items-center gap-2 group" onClick={() => navigate("/userdata")}>
                {user ? (
                  <div className="flex items-center gap-2">
                    <div className="text-right hidden xl:block leading-tight">
                      <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Account</p>
                      <p className="text-[12px] font-bold text-gray-800">{user.name.split(' ')[0]}</p>
                    </div>
                    <HiOutlineUserCircle size={28} className="text-emerald-800 group-hover:scale-110 transition-transform" />
                  </div>
                ) : (
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] px-6 py-2.5 bg-emerald-900 text-white rounded-full hover:bg-emerald-800 transition-all shadow-md">
                    Login
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;