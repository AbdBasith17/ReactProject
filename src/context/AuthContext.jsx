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

 //wshlst
  const fetchWishlist = async () => {
    try {
      const res = await api.get("wishlist/");
      setWishlist(res.data);
    } catch (err) {
      console.error("Wishlist sync failed", err);
    }
  };

  //cart
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

  //auth
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await api.get("auth/me/");
        setUser(res.data);
        
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

  const login = async (credentials) => {
    try {
      const res = await api.post("auth/login/", credentials);
      
      
      const userData = res.data.user; 
      
      setUser(userData);
      
     
      await Promise.all([fetchWishlist(), fetchCart()]);

      // FIX: Added optional chaining and fallback to prevent 'split' crash if name is null
      const displayName = userData?.name?.trim() 
        ? userData.name.split(' ')[0] 
        : (userData?.role === 'admin' ? "Admin" : "User");

      toast.success(`Welcome back, ${displayName}!`);
      
      return userData; // Returning the user object directly to the component
    } catch (err) {
      
      const errorMessage = err.response?.data?.error || "Invalid credentials";
      toast.error(errorMessage);
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