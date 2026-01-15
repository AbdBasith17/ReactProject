import React,{ createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios"; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;

  useEffect(() => {
    const loadUser = async () => {
  try {
    const res = await api.get("/me/");
    setUser(res.data);
  } catch (err) {
    if (err.response?.status === 401) {
      setUser(null);
    }
  } finally {
    setLoading(false);
  }
};


    loadUser();
  }, []);

  const login = async (data) => {
    const res = await api.post("login/", data);
    setUser(res.data.user);
    return res.data.user; 
  };

  const logout = async () => {
    try {
      await api.post("logout/");
    } finally {
      setUser(null);
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
    }}
  >
    {loading ? <p>Loading...</p> : children}
  </AuthContext.Provider>
);
};


export const useAuth = () => useContext(AuthContext);
