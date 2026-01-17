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

  // --- WISHLIST LOGIC ---
  const fetchWishlist = async () => {
    try {
      const res = await api.get("wishlist/");
      setWishlist(res.data);
    } catch (err) {
      console.error("Wishlist sync failed", err);
    }
  };

  // --- CART LOGIC ---
  const fetchCart = async () => {
    try {
      const res = await api.get("cart/");
      setCart(res.data);
    } catch (err) {
      if (err.response?.status !== 401) {
        console.error("Error fetching cart", err);
      }
    }
  };

  const addToCart = async (productId, quantity) => {
    try {
      await api.post("cart/add/", { product_id: productId, quantity });
      await fetchCart(); 
      toast.success("Added to cart successfully!");
    } catch (err) {
      toast.error("Please login to add items to cart");
    }
  };

  const updateCartQty = async (productId, newQty) => {
    try {
      await api.patch(`cart/update/${productId}/`, { quantity: newQty });
      await fetchCart();
    } catch (err) {
      toast.error("Failed to update quantity");
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await api.delete(`cart/remove/${productId}/`);
      await fetchCart();
      toast.info("Item removed from cart");
    } catch (err) {
      toast.error("Failed to remove item");
    }
  };

  // --- AUTH LOGIC ---
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await api.get("auth/me/");
        setUser(res.data);
        // Sync data if user is found
        fetchWishlist();
        fetchCart();
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = async (data) => {
    try {
      const res = await api.post("auth/login/", data);
      setUser(res.data.user);
      await fetchWishlist();
      await fetchCart();
      toast.success(`Welcome back, ${res.data.user.name.split(' ')[0]}!`);
      return res.data.user;
    } catch (err) {
      toast.error("Invalid credentials");
      throw err;
    }
  };

  const logout = async () => {
    try {
      await api.post("auth/logout/");
      toast.success("Logged out successfully");
    } finally {
      setUser(null);
      setWishlist([]);
      setCart([]);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        wishlist,
        setWishlist,
        cart,
        setCart,
        isAuthenticated,
        loading,
        login,
        logout,
        addToCart,
        updateCartQty,
        removeFromCart,
        refreshWishlist: fetchWishlist,
        refreshCart: fetchCart
      }}
    >
      {loading ? (
        <div className="h-screen flex items-center justify-center">
           <p className="text-gray-400 animate-pulse tracking-widest uppercase text-xs">Loading Perfaura...</p>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);