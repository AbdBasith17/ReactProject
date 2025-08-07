import React from "react";
import { useNavigate, Link } from "react-router-dom";
  import { toast } from 'react-toastify';

function UserDetailes() {
  const navigate = useNavigate();

  
  const user = JSON.parse(localStorage.getItem("user"));



const handleLogout = () => {
  toast.info(
    <div className="flex items-center justify-between gap-4 w-200">
      <span>Are you sure you want to logout?</span>
      <div className="flex w-200 gap-2 ">
        <button
          onClick={() => {
            localStorage.removeItem("user");
            toast.dismiss(); 
            navigate("/");
          }}
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
     style: { width: "350px", minWidth: "350px" },
      closeButton: false
    }
  );
};


  if (!user) {
    return (
      <div className="text-center  m-20 text-gray-700 text-lg">
        Already have an account?<Link to="/signin" className="text-green-600 font-bold hover:text-green-800 text-5xl">Login</Link> 
        <br />
        <br /><br />

        Don't have an account?<Link to="/register" className="text-green-600 font-bold hover:text-green-800 text-5xl">Register</Link> 
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20 max-w-md text-center ">
      <h2 className="text-3xl font-bold  mb-2">Hello <span className="text-green-600">{user.name}</span></h2>
      <p className="text-gray-600 mb-6">{user.email}</p>
      <button
        onClick={handleLogout}
        className="px-4 py-2 border border-red-300 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition"
      >
        Logout
      </button>
    </div>
  );
}

export default UserDetailes;
