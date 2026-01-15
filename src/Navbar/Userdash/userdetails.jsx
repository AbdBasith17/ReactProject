import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";


function UserDetails() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const confirmLogout = () => {
    toast.info(
      <div className="flex items-center justify-between gap-4">
        <span>Are you sure you want to logout?</span>

        <div className="flex gap-2">
          <button
            onClick={handleLogout}
            className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
          >
            Yes
          </button>

          <button
            onClick={() => toast.dismiss()}
            className="px-3 py-1 text-sm border rounded hover:bg-gray-200"
          >
            Cancel
          </button>
        </div>
      </div>,
      {
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
        style: { width: "400px" },
      }
    );
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/auth/logout/",
        {},
        { withCredentials: true } 
      );

      logout(); 
      toast.dismiss();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Logout failed. Try again.");
    }
  };

  if (!user) {
    return (
      <div className="text-center m-20 text-gray-700 text-lg">
        Already have an account?{" "}
        <Link
          to="/signin"
          className="text-green-600 font-bold hover:text-green-800 text-2xl"
        >
          Login
        </Link>
        <br /><br />
        Don&apos;t have an account?{" "}
        <Link
          to="/register"
          className="text-green-600 font-bold hover:text-green-800 text-2xl"
        >
          Register
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-md text-center">
      <h2 className="text-3xl font-bold mb-2">
        Hello <span className="text-green-600">{user.name}</span>
      </h2>
      <p className="text-gray-600 mb-6">{user.email}</p>

      <button
        onClick={confirmLogout}
        className="px-4 py-2 border border-red-300 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition"
      >
        Logout
      </button>
    </div>
  );
}

export default UserDetails;
