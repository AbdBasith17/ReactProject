import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;

  const fetchWishlist = async () => {
    try {
      const res = await api.get("wishlist/");
      setWishlist(res.data);
    } catch (err) {
      console.warn("Guest user: Wishlist empty");
    }
  };

  const fetchCart = async () => {
    try {
      const res = await api.get("cart/");
      setCart(res.data);
    } catch (err) {
      // Quietly fail for guests
    }
  };

  // Auth Logic on Mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await api.get("auth/me/");
        setUser(res.data);
        await Promise.all([fetchWishlist(), fetchCart()]);
      } catch (err) {
        // If 401 or any error occurs, user remains null (Guest mode)
        setUser(null);
      } finally {
        // IMPORTANT: Always set loading to false so the App can render
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = async (credentials) => {
    try {
      const res = await api.post("auth/login/", credentials);
      const userData = res.data.user; 
      setUser(userData);
      await Promise.all([fetchWishlist(), fetchCart()]);
      const displayName = userData?.name?.split(' ')[0] || "User";
      toast.success(`Welcome back, ${displayName}!`);
      return userData; 
    } catch (err) {
      toast.error(err.response?.data?.error || "Invalid credentials");
      throw err; 
    }
  };

  const logout = async () => {
    try {
      await api.post("auth/logout/");
    } catch (err) {
      console.warn("Already logged out on server");
    } finally {
      setUser(null);
      setWishlist([]);
      setCart([]);
      toast.success("Logged out successfully");
    }
  };

  const addToCart = async (productId, quantity) => {
    try {
      await api.post("cart/add/", { product_id: productId, quantity });
      await fetchCart();
      toast.success("Added to cart!");
    } catch (err) {
      toast.error("Please login to add items to cart");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        logout,
        addToCart,
        cart,
        wishlist,
        refreshCart: fetchCart,
        refreshWishlist: fetchWishlist
      }}
    >
      {/* Show a centered spinner while checking initial auth status */}
      {loading ? (
        <div className="h-screen flex items-center justify-center bg-white text-emerald-900 font-bold tracking-widest uppercase text-xs">
          <div className="flex flex-col items-center gap-3">
            <div className="w-6 h-6 border-2 border-emerald-800 border-t-transparent rounded-full animate-spin"></div>
            Perfaura
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);