import React, { useEffect, useState } from "react";
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

  // 🔥 FIX: user state
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // 🔥 FIX: sync from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const isActive = (path) => location.pathname === path;

  const handleClick = async (type) => {
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
        { autoClose: false, style: { width: "340px" } }
      );
      return;
    }

    if (type === "cart") {
      navigate("/cart");
    }

    if (type === "wishlist") {
      navigate("/wishlist");
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between lg:relative">

        {/* hamburger */}
        <button
          className="lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        <h1 className="text-2xl font-semibold mx-auto lg:absolute lg:left-1/2 lg:-translate-x-1/2">
          PERF<span className="text-green-800">AURA</span>
        </h1>

        {/* mobile user */}
        <div className="lg:hidden">
          <button onClick={() => navigate(user ? "/userdata" : "/signin")}>
            {user ? <MdAccountCircle size={28} /> : <p>Login</p>}
          </button>
        </div>

        {/* desktop */}
        <div className="hidden lg:flex justify-between items-center w-full">
          <ul className="flex gap-8 text-lg font-medium">
            <li>
              <Link
                to="/"
                className={`pb-1 transition-colors duration-200 hover:text-green-800 ${isActive("/")
                    ? "text-green-800 border-b-2 border-green-800"
                    : "text-black"
                  }`}
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/productpage"
                className={`pb-1 transition-colors duration-200 hover:text-green-800 ${isActive("/productpage")
                    ? "text-green-800 border-b-2 border-green-800"
                    : "text-black"
                  }`}
              >
                All
              </Link>
            </li>

            <li>
              <Link
                to="/men"
                className={`pb-1 transition-colors duration-200 hover:text-green-800 ${isActive("/men")
                    ? "text-green-800 border-b-2 border-green-800"
                    : "text-black"
                  }`}
              >
                Men
              </Link>
            </li>

            <li>
              <Link
                to="/women"
                className={`pb-1 transition-colors duration-200 hover:text-green-800 ${isActive("/women")
                    ? "text-green-800 border-b-2 border-green-800"
                    : "text-black"
                  }`}
              >
                Women
              </Link>
            </li>
          </ul>


          <div className="flex gap-5 items-center cursor-pointer">
            <Serching />

            <button
              className="cursor-pointer transition-colors duration-200 hover:text-green-800"
              onClick={() => handleClick("wishlist")}
            >
              <FaHeart size={23} />
            </button>


            <button
              className="cursor-pointer transition-colors duration-200 hover:text-green-800"
              onClick={() => handleClick("cart")}
            >
              <IoCartSharp size={27} />
            </button>


            <button
              className="cursor-pointer transition-colors duration-200 hover:text-green-800"
              onClick={() => navigate(user ? "/userdata" : "/signin")}
            >
              {user ? (
                <div className="flex items-center gap-1">
                  <p className="text-sm">
                    Hello{" "}
                    <span className="text-green-800 font-semibold">
                      {user.name || user.email}
                    </span>
                  </p>
                  <MdAccountCircle size={25} />
                </div>
              ) : (
                <p className="text-sm font-medium px-2 py-1 bg-black text-white rounded hover:bg-green-700">
                  Login
                </p>
              )}
            </button>

          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
