import React from "react";
import { FaRegHeart } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Serching from "./Search/search";
import { toast } from "react-toastify";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, loading, wishlist, cart } = useAuth();

  if (loading) return null;

  const isActive = (path) => location.pathname === path;

  const wishlistCount = wishlist?.length || 0;
  const cartCount = cart?.length || 0;


  const handleProtectedAction = (path) => {
    if (user) {
      navigate(path);
    } else {
      toast.info(
        ({ closeToast }) => (
          <div className="flex flex-col items-start gap-2">
            <p className="text-sm font-medium text-gray-800">
              Please login to continue
            </p>
            <button
              onClick={() => {
                navigate("/signin");
                closeToast();
              }}
              className="bg-emerald-800 text-white px-4 py-1.5 rounded text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-700 transition-colors"
            >
              Login Now
            </button>
          </div>
        ),
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false, 
          pauseOnHover: true,
          draggable: true,
          icon: false, 
        }
      );
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        
        <h1
          className="text-2xl font-bold tracking-tighter cursor-pointer min-w-fit"
          onClick={() => navigate("/")}
        >
          PERF
          <span className="text-emerald-800 font-light tracking-[0.1em]">
            AURA
          </span>
        </h1>

        
        <ul className="hidden lg:flex items-center gap-10 mx-auto">
          {[
            ["/", "Home"],
            ["/productpage", "Collection"],
            ["/men", "Men"],
            ["/women", "Women"],
          ].map(([path, label]) => (
            <li key={path} className="relative group">
              <Link
                to={path}
                className={`text-[13px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 ${
                  isActive(path)
                    ? "text-emerald-800"
                    : "text-gray-500 hover:text-emerald-700"
                }`}
              >
                {label}
              </Link>
              <span
                className={`absolute -bottom-1.5 left-0 h-[2px] bg-emerald-800 transition-all duration-300 ${
                  isActive(path) ? "w-full" : "w-0 group-hover:w-full"
                }`}
              ></span>
            </li>
          ))}
        </ul>

        
        <div className="flex items-center gap-4">
          <Serching />
          <div className="flex items-center gap-5 text-gray-700">
            
            <button
              onClick={() => handleProtectedAction("/wishlist")}
              className="relative hover:text-emerald-700 transition-transform"
            >
              <FaRegHeart size={22} />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-emerald-800 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-white">
                  {wishlistCount}
                </span>
              )}
            </button>

        
            <button
              onClick={() => handleProtectedAction("/cart")}
              className="relative hover:text-emerald-700 transition-transform"
            >
              <IoCartOutline size={25} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-emerald-800 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-white">
                  {cartCount}
                </span>
              )}
            </button>

            <div className="border-l pl-5 border-gray-100 ml-1">
              <button
                className="flex items-center gap-2 group"
                onClick={() => handleProtectedAction("/userdata")}
              >
                {user ? (
                  <div className="flex items-center gap-2">
                    <div className="text-right hidden xl:block leading-tight">
                      <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                        Account
                      </p>
                      <p className="text-[12px] font-bold text-gray-800">
                        {user.name.split(" ")[0]}
                      </p>
                    </div>
                    <HiOutlineUserCircle
                      size={28}
                      className="text-emerald-800 group-hover:scale-110 transition-transform"
                    />
                  </div>
                ) : (
                  <span 
                    className="text-[11px] font-bold uppercase tracking-[0.2em] px-6 py-2.5 bg-emerald-900 text-white rounded-full hover:bg-emerald-800 transition-all shadow-md"
                    onClick={(e) => {
                       e.stopPropagation();
                       navigate("/signin");
                    }}
                  >
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