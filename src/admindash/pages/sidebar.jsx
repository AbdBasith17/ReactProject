import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Sidebar() {
  const navigate = useNavigate();

  const confirmLogout = () => {
    toast.info(
      ({ closeToast }) => (
        <div>
          <p className="mb-2">Are you sure you want to logout?</p>
          <div className="flex justify-end gap-2">
            <button
              className="px-3 py-1 bg-gray-300 text-sm rounded hover:bg-gray-400"
              onClick={closeToast}
            >
              Cancel
            </button>
            <button
              className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
              onClick={() => {
                localStorage.removeItem('user');
                closeToast();
                navigate('/signin');
              }}
            >
              Logout
            </button>
          </div>
        </div>
      ),
      {
        position: 'top-center',
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
      }
    );
  };

  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-green-900 text-white shadow-lg z-50 flex flex-col justify-between">
      <div>
        <div className="p-6 text-2xl font-bold border-b border-green-800">
          Admin Panel
        </div>
        <nav className="flex flex-col gap-2 p-4">
          <NavLink
            to="/admin/admindash"
            className={({ isActive }) =>
              `px-4 py-2 rounded hover:bg-green-800 ${isActive ? 'bg-green-800' : ''}`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/product"
            className={({ isActive }) =>
              `px-4 py-2 rounded hover:bg-green-800 ${isActive ? 'bg-green-800' : ''}`
            }
          >
            Products
          </NavLink>
          <NavLink
            to="/admin/user"
            className={({ isActive }) =>
              `px-4 py-2 rounded hover:bg-green-800 ${isActive ? 'bg-green-800' : ''}`
            }
          >
            Users
          </NavLink>
          <NavLink
            to="/admin/order"
            className={({ isActive }) =>
              `px-4 py-2 rounded hover:bg-green-800 ${isActive ? 'bg-green-800' : ''}`
            }
          >
            Orders
          </NavLink>
        </nav>
      </div>

      <div className="p-4 border-t border-green-800">
        <button
          onClick={confirmLogout}
          className="w-full px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
