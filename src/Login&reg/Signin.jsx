import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login({ email: email.trim(), password: password.trim() });
      toast.success("Welcome back!");
      user?.role === "admin" ? navigate("/admin/admindash") : navigate("/");
    } catch (err) {
      toast.error("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white font-sans">
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-10 md:px-20 lg:px-32 relative">
        {/* LOGO */}
        <div className="absolute top-10 left-10 lg:left-32">
          <h1 className="text-2xl font-bold tracking-tighter cursor-pointer" onClick={() => navigate("/")}>
            PERF<span className="text-emerald-800 font-light tracking-[0.1em]">AURA</span>
          </h1>
        </div>

        <div className="max-w-sm w-full mx-auto">
          <div className="mb-10 mt-10">
            <h2 className="text-4xl font-light text-gray-900 mb-3 tracking-tight">Welcome Back</h2>
            <p className="text-gray-400 text-base">Please enter your details to sign in.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="group">
              <label className="block text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 group-focus-within:text-emerald-800 transition-colors">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full pb-2 text-base border-b border-gray-200 focus:border-emerald-800 outline-none transition-all bg-transparent text-gray-800 placeholder:text-gray-200"
                required
              />
            </div>

            <div className="group">
              <div className="flex justify-between mb-2">
                <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 group-focus-within:text-emerald-800 transition-colors">Password</label>
                <Link to="/forgot" className="text-[11px] uppercase tracking-widest text-emerald-800 font-bold">Forgot?</Link>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pb-2 text-base border-b border-gray-200 focus:border-emerald-800 outline-none transition-all bg-transparent text-gray-800 placeholder:text-gray-200"
                required
              />
            </div>

            <button disabled={loading} className="w-full bg-[#1a3a32] text-white py-4 rounded-sm text-[12px] uppercase tracking-[0.3em] font-bold hover:bg-[#122b25] transition-all shadow-xl shadow-emerald-900/10 mt-6">
              {loading ? "Verifying..." : "Sign In"}
            </button>
          </form>

          <p className="mt-10 text-center text-[11px] text-gray-400 uppercase tracking-widest">
            New here? <Link to="/register" className="text-emerald-800 font-bold border-b border-emerald-800/30">Create Account</Link>
          </p>
        </div>
      </div>

      <div className="hidden lg:block lg:w-1/2 relative bg-[#1a3a32]">
        <img src="https://images.unsplash.com/photo-1543451921-0972967527a2?q=80&w=2070&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay" alt="" />
        <div className="absolute inset-0 flex flex-col justify-end p-20 bg-gradient-to-t from-[#0a1a15] to-transparent text-white">
          <h3 className="text-5xl font-extralight leading-tight mb-4">Discover Your <br/><span className="italic font-serif">Signature Scent.</span></h3>
          <div className="w-12 h-[1px] bg-emerald-500"></div>
        </div>
      </div>
    </div>
  );
}
export default SignIn;