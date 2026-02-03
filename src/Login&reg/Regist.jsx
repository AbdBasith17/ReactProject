import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

// --- CHILD COMPONENT: OTP VERIFICATION ---
function OTPVerification({ email, onSuccess }) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (!otp || otp.length < 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }
    setLoading(true);
    try {
      await api.post("auth/verify-otp/", { email, otp });
      toast.success("Email verified successfully!");
      onSuccess();
    } catch (err) {
      toast.error(err.response?.data?.error || "Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white font-sans text-center px-6">
      <div className="max-w-sm w-full">
        <h2 className="text-3xl font-light text-gray-900 mb-2 tracking-tight">Verify Email</h2>
        <p className="text-gray-400 text-[10px] tracking-[0.2em] uppercase mb-8 leading-relaxed">
          Verification code sent to <br />
          <span className="text-emerald-800 font-bold lowercase break-all">{email}</span>
        </p>
        <form onSubmit={handleVerifyOTP} className="space-y-6">
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))} // Only numbers
            className="w-full text-center text-3xl tracking-[0.4em] pb-2 border-b-2 border-gray-100 focus:border-emerald-800 outline-none transition-all font-light bg-transparent"
            placeholder="000000"
            maxLength={6}
            required
          />
          <button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-[#1a3a32] text-white py-4 rounded-sm text-[12px] uppercase tracking-[0.3em] font-bold hover:bg-[#122b25] transition-all shadow-lg disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Confirm Code"}
          </button>
        </form>
      </div>
    </div>
  );
}

// --- MAIN COMPONENT: REGISTER ---
function Register() {
  const navigate = useNavigate();
  const { setUser, refreshWishlist, refreshCart } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    setLoading(true);
    try {
      const response = await api.post("auth/register/", {
        name: form.name,
        email: form.email,
        password: form.password
      });

      toast.success(response.data.message || "Verification code sent!");
      setOtpSent(true);
    } catch (err) {
      toast.error(err.response?.data?.error || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const res = await api.post("auth/google/", {
        token: credentialResponse.credential,
      });
      const userData = res.data.user;
      setUser(userData);
      await Promise.all([refreshWishlist(), refreshCart()]);
      toast.success(`Welcome, ${userData.name.split(' ')[0]}`);
      navigate("/");
    } catch (err) {
      toast.error("Google Sign-In failed.");
    }
  };

  // Switch to OTP view if registration successful
  if (otpSent) {
    return <OTPVerification email={form.email} onSuccess={() => navigate("/signin")} />;
  }

  return (
    <div className="min-h-screen w-full flex bg-white font-sans overflow-y-auto">
      {/* Left Column: Form */}
      <div className="w-full lg:w-1/2 flex flex-col p-6 md:p-10 relative">
        <div className="w-full flex justify-center py-4">
          <h1 className="text-2xl font-bold tracking-tighter cursor-pointer" onClick={() => navigate("/")}>
            PERF<span className="text-emerald-800 font-light tracking-[0.1em]">AURA</span>
          </h1>
        </div>

        <div className="flex-1 flex flex-col justify-center max-w-sm w-full mx-auto">
          <header className="mb-4 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-1 tracking-tight">Create Account</h2>
            <p className="text-gray-400 text-sm tracking-wide">Join the world of Perfaura.</p>
          </header>

          <form onSubmit={handleRegister} className="space-y-3">
            {[
              { label: "Full Name", name: "name", type: "text", placeholder: "John Doe" },
              { label: "Email Address", name: "email", type: "email", placeholder: "name@company.com" },
              { label: "Password", name: "password", type: "password", placeholder: "••••••••" },
              { label: "Confirm Password", name: "confirmPassword", type: "password", placeholder: "••••••••" },
            ].map((input) => (
              <div key={input.name} className="group">
                <label className="block text-[9px] uppercase tracking-[0.2em] font-bold text-gray-400 mb-0.5 group-focus-within:text-emerald-800 transition-colors">
                  {input.label}
                </label>
                <input
                  type={input.type}
                  name={input.name}
                  value={form[input.name]}
                  onChange={handleChange}
                  placeholder={input.placeholder}
                  className="w-full pb-1 text-base border-b border-gray-100 focus:border-emerald-800 outline-none transition-all bg-transparent text-gray-800 placeholder:text-gray-200"
                  required
                />
              </div>
            ))}

            <button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-[#1a3a32] text-white py-3.5 rounded-sm text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-[#122b25] transition-all shadow-lg mt-3 disabled:opacity-70"
            >
              {loading ? "Creating Account..." : "Register"}
            </button>
          </form>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-100"></span></div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-[0.2em]"><span className="bg-white px-4 text-gray-400 font-bold">Or</span></div>
          </div>

          <div className="flex justify-center">
            <GoogleLogin 
              onSuccess={handleGoogleLogin} 
              onError={() => toast.error("Login Failed")} 
              theme="outline" 
              shape="rectangular" 
              width="320" 
            />
          </div>

          <footer className="mt-4 text-center">
            <p className="text-[11px] text-gray-400 uppercase tracking-widest">
              Already a member? <Link to="/signin" className="text-emerald-800 font-bold border-b border-emerald-800/30 ml-1">Sign In</Link>
            </p>
          </footer>
        </div>
      </div>

      {/* Right Column: Aesthetic Image */}
      <div className="hidden lg:block lg:w-1/2 relative bg-[#1a3a32]">
        <img 
          src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=2000&auto=format&fit=crop" 
          alt="Luxury Essence" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay" 
        />
        <div className="absolute inset-0 flex flex-col justify-end p-20 bg-gradient-to-t from-[#0a1a15]/80 to-transparent">
          <h3 className="text-white text-5xl font-extralight leading-tight mb-4">
            Begin Your <br />
            <span className="italic font-serif text-emerald-100/90">Aromatic Journey.</span>
          </h3>
          <div className="w-12 h-[1px] bg-emerald-500"></div>
        </div>
      </div>
    </div>
  );
}

export default Register;