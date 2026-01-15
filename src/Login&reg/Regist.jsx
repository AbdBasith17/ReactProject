import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

/* ----------------------------------
    OTP VERIFICATION COMPONENT
---------------------------------- */
function OTPVerification({ email, onSuccess }) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (!otp) {
      toast.error("Please enter OTP");
      return;
    }
    setLoading(true);
    try {
      await axios.post("http://127.0.0.1:8000/api/auth/verify-otp/", { email, otp });
      toast.success("Email verified!");
      onSuccess();
    } catch (err) {
      toast.error("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-white font-sans">
      <div className="max-w-sm w-full px-10 text-center">
        <h2 className="text-3xl font-light text-gray-900 mb-2 tracking-tight">Verify Email</h2>
        <p className="text-gray-400 text-[10px] tracking-[0.2em] uppercase mb-8">
          Code sent to <span className="text-emerald-800 font-bold lowercase">{email}</span>
        </p>
        <form onSubmit={handleVerifyOTP} className="space-y-6">
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full text-center text-3xl tracking-[0.4em] pb-2 border-b-2 border-gray-100 focus:border-emerald-800 outline-none transition-all font-light"
            placeholder="000000"
            maxLength={6}
          />
          <button type="submit" disabled={loading} className="w-full bg-[#1a3a32] text-white py-4 rounded-sm text-[12px] uppercase tracking-[0.3em] font-bold hover:bg-[#122b25] transition-all shadow-lg">
            {loading ? "Verifying..." : "Confirm Code"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ----------------------------------
    REGISTER COMPONENT
---------------------------------- */
function Register() {
  const navigate = useNavigate();
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
      await axios.post("http://127.0.0.1:8000/api/auth/register/", { 
        name: form.name, email: form.email, password: form.password 
      });
      setOtpSent(true);
    } catch (err) {
      toast.error("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  if (otpSent) return <OTPVerification email={form.email} onSuccess={() => navigate("/signin")} />;

  return (
    <div className="h-screen w-full flex bg-white font-sans overflow-hidden">
      {/* LEFT SIDE: Form */}
      <div className="w-full lg:w-1/2 flex flex-col relative">
        {/* LOGO - Fixed Top Padding */}
        <div className="p-8 lg:pl-20 lg:pt-12">
          <h1 className="text-2xl font-bold tracking-tighter cursor-pointer" onClick={() => navigate("/")}>
            PERF<span className="text-emerald-800 font-light tracking-[0.1em]">AURA</span>
          </h1>
        </div>

        {/* Content Container - Centered */}
        <div className="flex-1 flex flex-col justify-center px-10 md:px-20 lg:px-32">
          <div className="max-w-sm w-full mx-auto -mt-6">
            <header className="mb-6">
              <h2 className="text-4xl font-light text-gray-900 mb-1 tracking-tight">Create Account</h2>
              <p className="text-gray-400 text-sm tracking-wide">Join the world of Perfaura.</p>
            </header>

            <form onSubmit={handleRegister} className="space-y-4">
              {[
                { label: "Full Name", name: "name", type: "text", placeholder: "John Doe" },
                { label: "Email Address", name: "email", type: "email", placeholder: "name@company.com" },
                { label: "Password", name: "password", type: "password", placeholder: "••••••••" },
                { label: "Confirm Password", name: "confirmPassword", type: "password", placeholder: "••••••••" },
              ].map((input) => (
                <div key={input.name} className="group">
                  <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 mb-1 group-focus-within:text-emerald-800 transition-colors">
                    {input.label}
                  </label>
                  <input
                    type={input.type}
                    name={input.name}
                    value={form[input.name]}
                    onChange={handleChange}
                    placeholder={input.placeholder}
                    className="w-full pb-1.5 text-base border-b border-gray-100 focus:border-emerald-800 outline-none transition-all bg-transparent text-gray-800 placeholder:text-gray-200"
                    required
                  />
                </div>
              ))}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1a3a32] text-white py-4 rounded-sm text-[12px] uppercase tracking-[0.3em] font-bold hover:bg-[#122b25] transition-all shadow-lg active:scale-[0.98] mt-4"
              >
                {loading ? "Creating Account..." : "Register"}
              </button>
            </form>

            <footer className="mt-8 text-center">
              <p className="text-[11px] text-gray-400 uppercase tracking-widest">
                Already a member? <Link to="/signin" className="text-emerald-800 font-bold border-b border-emerald-800/30 hover:border-emerald-800 transition-colors">Sign In</Link>
              </p>
            </footer>
          </div>
        </div>

        {/* Legal Footer */}
        <div className="p-10 lg:pl-20 text-[9px] text-gray-300 tracking-widest uppercase">
          © 2026 Perfaura Fragrances
        </div>
      </div>

      {/* RIGHT SIDE: Visual */}
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