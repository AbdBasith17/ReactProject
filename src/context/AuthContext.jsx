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
      console.warn("Guest user: Cart empty");
    }
  };

  // ADD TO CART FUNCTIONALITY
  const addToCart = async (productId, quantity = 1) => {
    try {
      const res = await api.post("cart/add/", { 
        product_id: productId, 
        quantity: quantity 
      });
      await fetchCart(); 
      toast.success("Added to bag");
      return res.data;
    } catch (err) {
      const errorMsg = err.response?.data?.detail || "Could not add to cart";
      toast.error(errorMsg);
      throw err;
    }
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await api.get("auth/me/");
        setUser(res.data);
        await Promise.all([fetchWishlist(), fetchCart()]);
      } catch (err) {
        setUser(null);
      } finally {
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
      console.warn("Already logged out");
    } finally {
      setUser(null);
      setWishlist([]);
      setCart([]);
      toast.success("Logged out successfully");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        loading,
        login,
        logout,
        cart,
        setCart,
        wishlist,
        setWishlist,
        addToCart, 
        refreshCart: fetchCart,
        refreshWishlist: fetchWishlist
      }}
    >
      {loading ? (
        <div className="h-screen flex items-center justify-center bg-white text-emerald-900 font-bold tracking-[0.3em] uppercase text-[10px]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-6 h-6 border-2 border-emerald-900 border-t-transparent rounded-full animate-spin"></div>
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