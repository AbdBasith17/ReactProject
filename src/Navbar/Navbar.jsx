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
    // Change your nav tag to this:
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${isTransparent
        ? "bg-transparent py-6"
        : "bg-white shadow-md py-4 border-b border-gray-100"
      }`}>
      <div className="container mx-auto px-5 lg:px-10">
        <div className="flex items-center justify-between">

          {/* LEFT: LOGO */}
          <div className="flex items-center gap-4">
            <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <FaBars size={24} className={isTransparent ? "text-white" : "text-black"} />
            </button>
            <h1
              className={`text-2xl font-bold tracking-tighter cursor-pointer transition-colors ${isTransparent ? "text-white" : "text-black"}`}
              onClick={() => navigate("/")}
            >
              PERF<span className={`${isTransparent ? "text-white/80" : "text-emerald-800"} font-light tracking-[0.1em]`}>AURA</span>
            </h1>
          </div>

          {/* CENTER: DESKTOP LINKS */}
          <div className="hidden lg:block">
            <ul className="flex items-center gap-10">
              {navLinks.map(([path, label]) => (
                <li key={path} className="relative group">
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

          {/* RIGHT: ICONS & ACCOUNT */}
          <div className="flex items-center gap-4 lg:gap-6">

            {/* Search Bar Animation */}
            <div className="hidden lg:flex items-center" ref={searchRef}>
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 220, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <Searching customColor={isTransparent ? "white" : "black"} />
                  </motion.div>
                )}
              </AnimatePresence>
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`ml-2 transition-transform hover:scale-110 ${isTransparent ? "text-white" : "text-gray-700"}`}
              >
                {isSearchOpen ? <FaXmark size={20} /> : <FaMagnifyingGlass size={19} />}
              </button>
            </div>

            {/* Icons Group */}
            <div className={`flex items-center gap-4 lg:gap-5 ${isTransparent ? "text-white" : "text-gray-700"}`}>
              <button onClick={() => handleProtectedAction("/wishlist")} className="relative hover:scale-110 transition-transform">
                <FaRegHeart size={20} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                    {wishlistCount}
                  </span>
                )}
              </button>

              <button onClick={() => handleProtectedAction("/cart")} className="relative hover:scale-110 transition-transform">
                <IoCartOutline size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-emerald-600 text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* USER ACCOUNT SECTION */}
              <div className="ml-1">
                <button className="flex items-center gap-2 group" onClick={() => handleProtectedAction("/userdata")}>
                  {user ? (
                    <div className="flex items-center gap-2">
                      <div className="text-right hidden xl:block leading-tight">
                        <p className={`text-[9px] uppercase tracking-widest font-bold ${isTransparent ? "text-gray-300" : "text-gray-400"}`}>Account</p>
                        <p className={`text-[11px] font-bold uppercase tracking-tighter ${isTransparent ? "text-white" : "text-gray-800"}`}>
                          {user.name ? user.name.split(" ")[0] : "User"}
                        </p>
                      </div>
                      <HiOutlineUserCircle size={26} className="group-hover:scale-110 transition-transform" />
                    </div>
                  ) : (
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      onClick={(e) => { e.stopPropagation(); navigate("/signin"); }}
                      className={`text-[10px] font-bold uppercase tracking-[0.2em] px-5 py-2 rounded-full transition-all ${isTransparent ? "bg-white text-black" : "bg-emerald-900 text-white"}`}
                    >
                      Login
                    </motion.span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.4 }}
            className="fixed inset-0 top-0 left-0 w-full h-screen bg-black z-[110] flex flex-col p-10"
          >
            <button onClick={() => setIsMenuOpen(false)} className="self-end text-white mb-10"><FaXmark size={30} /></button>
            <div className="flex flex-col gap-8">
              {navLinks.map(([path, label]) => (
                <Link key={path} to={path} onClick={() => setIsMenuOpen(false)} className="text-white text-3xl font-serif tracking-widest uppercase italic">{label}</Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;