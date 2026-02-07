import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { GoogleLogin } from '@react-oauth/google';
import api from "../api/axios";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  // Destructure functions from context
  const { login, setUser, refreshWishlist, refreshCart } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login({ email: email.trim(), password: password.trim() });
      if (user && user.role) {
        if (user.role.toLowerCase() === "admin") navigate("/admin/admindash");
        else navigate("/");
      }
    } catch (err) {
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    setLoading(true);
    try {
      // 1. Verify with backend
      const res = await api.post("auth/google/", {
        token: credentialResponse.credential,
      });
      
      const userData = res.data.user;

      if (userData) {
        // 2. Update Global Context State
        setUser(userData);
        
        // 3. Sync Cart and Wishlist before moving
        await Promise.all([refreshWishlist(), refreshCart()]);
        
        const firstName = userData?.name?.trim() ? userData.name.split(' ')[0] : "User";
        toast.success(`Welcome back, ${firstName}!`);
        
        // 4. Navigate based on role
        const userRole = userData.role?.toLowerCase();
        if (userRole === "admin") {
          navigate("/admin/admindash");
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      console.error("Google login error:", err);
      toast.error("Google Sign-In failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-white font-sans overflow-y-auto">
      {/* MOBILE TOP PORTION */}
      <div className="lg:hidden w-full bg-[#1a3a32] py-10 flex flex-col items-center justify-center shadow-lg">
        <h1 
          className="text-2xl font-bold tracking-tighter cursor-pointer text-white" 
          onClick={() => navigate("/")}
        >
          PERF<span className="text-emerald-400 font-light tracking-[0.1em]">AURA</span>
        </h1>
        <div className="w-12 h-[2px] bg-emerald-400 mt-3 opacity-60"></div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col p-6 md:p-10 relative">
        <div className="hidden lg:flex w-full justify-center py-4">
          <h1 className="text-2xl font-bold tracking-tighter cursor-pointer" onClick={() => navigate("/")}>
            PERF<span className="text-emerald-800 font-light tracking-[0.1em]">AURA</span>
          </h1>
        </div>

        <div className="max-w-sm w-full mx-auto flex-1 flex flex-col justify-center py-6">
          <div className="mb-6 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-2 tracking-tight">Welcome Back</h2>
            <p className="text-gray-400 text-sm tracking-wide">Please enter your details to sign in.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="group">
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-1 group-focus-within:text-emerald-800 transition-colors">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full pb-1 text-base border-b border-gray-200 focus:border-emerald-800 outline-none transition-all bg-transparent text-gray-800 placeholder:text-gray-200"
                required
              />
            </div>

            <div className="group">
              <div className="flex justify-between mb-1">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 group-focus-within:text-emerald-800 transition-colors">Password</label>
                <Link to="/forgot" className="text-[10px] uppercase tracking-widest text-emerald-800 font-bold">Forgot?</Link>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pb-1 text-base border-b border-gray-200 focus:border-emerald-800 outline-none transition-all bg-transparent text-gray-800 placeholder:text-gray-200"
                required
              />
            </div>

            <button disabled={loading} className="w-full bg-[#1a3a32] text-white py-3.5 rounded-sm text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-[#122b25] transition-all shadow-xl mt-4 disabled:opacity-50">
              {loading ? "Verifying..." : "Sign In"}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-100"></span></div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-[0.2em]"><span className="bg-white px-4 text-gray-400 font-bold">Or</span></div>
          </div>

          <div className="flex justify-center">
            {/* The Google Button */}
            <GoogleLogin 
                onSuccess={handleGoogleLogin} 
                onError={() => toast.error("Login Failed")} 
                theme="outline" 
                shape="rectangular" 
                width="320" 
            />
          </div>

          <p className="mt-8 text-center text-[11px] text-gray-400 uppercase tracking-widest">
            New here? <Link to="/register" className="text-emerald-800 font-bold border-b border-emerald-800/30">Create Account</Link>
          </p>
        </div>
      </div>

      {/* DESKTOP SIDE IMAGE */}
      <div className="hidden lg:block lg:w-1/2 relative bg-[#1a3a32]">
        <img src="https://images.unsplash.com/photo-1587017539504-67cfbddac569?q=80&w=2000&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay" alt="" />
        <div className="absolute inset-0 flex flex-col justify-end p-20 bg-gradient-to-t from-[#0a1a15] to-transparent text-white">
          <h3 className="text-5xl font-extralight leading-tight mb-4">Discover Your <br/><span className="italic font-serif">Signature Scent.</span></h3>
          <div className="w-12 h-[1px] bg-emerald-500"></div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;