import React, { useState, useEffect, useRef } from "react";
import { FaRegHeart, FaBars, FaXmark, FaMagnifyingGlass } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Searching from "./Search/search";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const searchRef = useRef(null);

  const { user, loading, wishlist, cart } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) return null;

  const isHome = location.pathname === "/";
  const isTransparent = isHome && !scrolled && !isMenuOpen;

  const wishlistCount = wishlist?.length || 0;
  const cartCount = cart?.length || 0;

  const navLinks = [
    ["/", "Home"],
    ["/productpage", "Collection"],
    ["/men", "Men"],
    ["/women", "Women"],
  ];

  const handleProtectedAction = (path) => {
    if (user) { navigate(path); }
    else { toast.info("Please login to continue", { position: "top-center" }); }
  };

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${isTransparent
      ? "bg-transparent py-6"
      : "bg-white shadow-md py-4 border-b border-gray-100"
      }`}>
      <div className="container mx-auto px-5 lg:px-10">
        
        <div className="flex items-center justify-between w-full">

          {/* LEFT: Fixed width on Desktop only */}
          <div className="flex items-center gap-4 lg:w-[250px] z-[120]">
            <button 
              className="lg:hidden p-1" 
              onClick={() => setIsMenuOpen(true)} // Explicitly set to true
              aria-label="Open Menu"
            >
              <FaBars size={22} className={isTransparent ? "text-white" : "text-black"} />
            </button>
            <h1
              className={`text-2xl font-bold tracking-tighter cursor-pointer transition-colors ${isTransparent ? "text-white" : "text-black"}`}
              onClick={() => navigate("/")}
            >
              PERF<span className={`${isTransparent ? "text-white/80" : "text-emerald-800"} font-light tracking-[0.1em]`}>AURA</span>
            </h1>
          </div>

          {/* CENTER: Slides left/right smoothly */}
          <div className="hidden lg:flex flex-1 justify-center transition-all duration-500 ease-in-out px-4">
            <ul className="flex items-center gap-8 xl:gap-10">
              {navLinks.map(([path, label]) => (
                <li key={path} className="relative group flex-shrink-0">
                  <Link
                    to={path}
                    className={`text-[11px] font-bold uppercase tracking-[0.25em] transition-colors ${isTransparent ? "text-white/80 hover:text-white" : "text-gray-500 hover:text-black"
                      }`}
                  >
                    {label}
                  </Link>
                  <span className={`absolute -bottom-1 left-0 h-[1.5px] bg-emerald-500 transition-all duration-300 ${location.pathname === path ? "w-full" : "w-0 group-hover:w-full"}`}></span>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT: Icons + Search */}
          <div className="flex items-center justify-end gap-2 lg:gap-4 lg:min-w-[250px] transition-all duration-500 ease-in-out">
            
            <div className="hidden lg:flex items-center overflow-hidden" ref={searchRef}>
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 200, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <Searching customColor={isTransparent ? "white" : "black"} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`p-2 transition-transform hover:scale-110 ${isTransparent ? "text-white" : "text-gray-700"}`}
            >
              {isSearchOpen ? <FaXmark size={18} /> : <FaMagnifyingGlass size={18} />}
            </button>

            <button onClick={() => handleProtectedAction("/wishlist")} className="relative p-1">
              <FaRegHeart size={19} className={isTransparent ? "text-white" : "text-gray-700"} />
              {wishlistCount > 0 && (
                <span className="absolute top-0 -right-1 bg-emerald-600 text-white text-[8px] w-3.5 h-3.5 flex items-center justify-center rounded-full font-bold">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button onClick={() => handleProtectedAction("/cart")} className="relative p-1">
              <IoCartOutline size={22} className={isTransparent ? "text-white" : "text-gray-700"} />
              {cartCount > 0 && (
                <span className="absolute top-0 -right-1 bg-emerald-600 text-white text-[8px] w-3.5 h-3.5 flex items-center justify-center rounded-full font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => handleProtectedAction("/userdata")}
              className="flex items-center gap-3 group ml-1"
            >
              {user && (
                <div className="hidden md:flex flex-col items-end leading-none gap-1">
                  <span className={`text-[7px] font-bold uppercase tracking-[0.2em] transition-colors ${isTransparent ? "text-white/60 group-hover:text-white" : "text-gray-400 group-hover:text-black"}`}>
                    Account
                  </span>
                  <span className={`text-[9px] font-black uppercase tracking-widest transition-colors ${isTransparent ? "text-emerald-400" : "text-emerald-800"}`}>
                    {user.displayName || user.name || user.email?.split('@')[0]}
                  </span>
                </div>
              )}
              <HiOutlineUserCircle size={28} className={isTransparent ? "text-white" : "text-gray-700"} />
            </button>
          </div>
        </div>

        {/* MOBILE SEARCH (Separate Row) */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1, marginTop: 16 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden w-full"
            >
              <div className="pb-2">
                <Searching customColor={isTransparent ? "white" : "black"} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "-100%" }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 w-full h-screen bg-black/95 backdrop-blur-lg z-[200] flex flex-col p-10"
          >
            <div className="flex justify-between items-center mb-16">
               <h1 className="text-white text-2xl font-bold tracking-tighter">
                PERF<span className="text-white/80 font-light tracking-[0.1em]">AURA</span>
              </h1>
              <button onClick={() => setIsMenuOpen(false)} className="text-white"><FaXmark size={30} /></button>
            </div>
            
            <div className="flex flex-col gap-8">
              {navLinks.map(([path, label]) => (
                <Link
                  key={path} to={path}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white text-xl font-black tracking-tighter uppercase hover:text-emerald-400 transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;