import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { toast } from "react-toastify";
    
function ForgotPassword() {
  const [step, setStep] = useState(1); 
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const navigate = useNavigate();

  // Handle Countdown Timer for Resend
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleRequestOTP = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      await api.post("/auth/forgot-password-request/", { email: email.trim() });
      toast.success("OTP sent to your email!");
      setStep(2);
      setTimer(30); 
    } catch (err) {
      toast.error("Failed to send OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/auth/forgot-password-confirm/", {
        email: email.trim(),
        otp: otp.trim(),
        new_password: newPassword,
      });
      toast.success("Password updated successfully!");
      navigate("/signin");
    } catch (err) {
      toast.error(err.response?.data?.error || "Reset failed. Check your OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white font-sans items-center justify-center px-6">
      <div className="max-w-sm w-full">
        <div className="mb-10 text-center">
          <h1 className="text-2xl font-bold tracking-tighter mb-8 cursor-pointer" onClick={() => navigate("/")}>
            PERF<span className="text-emerald-800 font-light tracking-[0.1em]">AURA</span>
          </h1>
          <h2 className="text-3xl font-light text-gray-900 mb-2 tracking-tight">
            {step === 1 ? "Forgot Password?" : "Verify OTP"}
          </h2>
          <p className="text-gray-400 text-xs uppercase tracking-widest">
            {step === 1 ? "Enter your email to receive a code" : `Code sent to ${email}`}
          </p>
        </div>

        <form onSubmit={step === 1 ? handleRequestOTP : handleResetPassword} className="space-y-8">
          {step === 1 ? (
            <div className="group">
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 group-focus-within:text-emerald-800">Email Address</label>
              <input
                type="email"
                required
                className="w-full pb-2 text-base border-b border-gray-200 focus:border-emerald-800 outline-none transition-all"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          ) : (
            <>
              <div className="group">
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 group-focus-within:text-emerald-800">6-Digit OTP</label>
                <input
                  type="text"
                  maxLength="6"
                  required
                  className="w-full pb-2 text-base border-b border-gray-200 focus:border-emerald-800 outline-none transition-all tracking-[1em] font-bold"
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <div className="group">
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 group-focus-within:text-emerald-800">New Password</label>
                <input
                  type="password"
                  required
                  className="w-full pb-2 text-base border-b border-gray-200 focus:border-emerald-800 outline-none transition-all"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              
              <div className="flex justify-between items-center mt-2">
                <span className="text-[10px] text-gray-400 font-bold uppercase">Didn't get it?</span>
                {timer > 0 ? (
                  <span className="text-[10px] text-emerald-800 font-bold uppercase">Resend in {timer}s</span>
                ) : (
                  <button type="button" onClick={handleRequestOTP} className="text-[10px] text-emerald-800 font-bold uppercase border-b border-emerald-800">Resend Code</button>
                )}
              </div>
            </>
          )}

          <button disabled={loading} className="w-full bg-[#1a3a32] text-white py-4 text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-[#122b25] transition-all shadow-lg">
            {loading ? "Processing..." : step === 1 ? "Send Code" : "Reset Password"}
          </button>
        </form>

        <Link to="/signin" className="block mt-8 text-center text-[10px] text-gray-400 uppercase tracking-widest font-bold hover:text-emerald-800">
          Back to Login
        </Link>
      </div>
    </div>
  );
}

export default ForgotPassword;