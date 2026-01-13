import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./Navbar/Navbar";
import Footer from "./Footer";

// auth
import SignIn from "./Login&reg/Signin";
import Register from "./Login&reg/Regist";

// user pages
import Home from "./Home/Home";
import ProductPage from "./PageComonents/ProductPage";
import ProductOverview from "./PageComonents/POverview";
import Cart from "./PageComonents/Cart";
import Checkout from "./PageComonents/Checkout";
import Wishlist from "./Wishlist/wishlist";
import OrderPlaced from "./PageComonents/orderplaced";
import UserDashboard from "./Navbar/Userdash/userdash";
import MenPage from "./Otherpages/Men";
import WomenPage from "./Otherpages/women";

// admin
import AdminLayout from "./admindash/adminlayout";
import Dashboard from "./admindash/pages/dashboard";
import Products from "./admindash/pages/product";
import Users from "./admindash/pages/user";
import Orders from "./admindash/pages/order";

// route guards
import Routeprotect from "./Routeprotector/Routeprotector";
import AdminRouteProtect from "./Routeprotector/adminrouteprotect";
import NonAdminRoute from "./Routeprotector/NonAdminroute";
import LogRoute from "./Routeprotector/Loginprotect";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AppLayout() {
  const location = useLocation();

 
  const hideLayout =
    location.pathname.startsWith("/admin") ||
    ["/signin", "/register"].includes(location.pathname);

  return (
    <>
      {!hideLayout && <Navbar />}

      <Routes>
        
        <Route path="/" element={<NonAdminRoute><Home /></NonAdminRoute>} />
        <Route path="/men" element={<NonAdminRoute><MenPage /></NonAdminRoute>} />
        <Route path="/women" element={<NonAdminRoute><WomenPage /></NonAdminRoute>} />


        <Route path="/signin" element={<LogRoute><SignIn /></LogRoute>} />
        <Route path="/register" element={<LogRoute><Register /></LogRoute>} />

        
        <Route
          path="/productpage"
          element={<NonAdminRoute><ProductPage /></NonAdminRoute>}
        />
        <Route
          path="/productview/:id"
          element={<NonAdminRoute><ProductOverview /></NonAdminRoute>}
        />

       
        <Route
          path="/cart"
          element={
            <NonAdminRoute>
              <Routeprotect>
                <Cart />
              </Routeprotect>
            </NonAdminRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <NonAdminRoute>
              <Routeprotect>
                <Checkout />
              </Routeprotect>
            </NonAdminRoute>
          }
        />

        <Route
          path="/wishlist"
          element={
            <NonAdminRoute>
              <Routeprotect>
                <Wishlist />
              </Routeprotect>
            </NonAdminRoute>
          }
        />

        <Route
          path="/orderplaced"
          element={
            <NonAdminRoute>
              <Routeprotect>
                <OrderPlaced />
              </Routeprotect>
            </NonAdminRoute>
          }
        />

        <Route
          path="/userdata"
          element={
            <NonAdminRoute>
              <Routeprotect>
                <UserDashboard />
              </Routeprotect>
            </NonAdminRoute>
          }
        />

        
        <Route
          path="/admin"
          element={
            <AdminRouteProtect>
              <AdminLayout />
            </AdminRouteProtect>
          }
        >
          <Route path="admindash" element={<Dashboard />} />
          <Route path="product" element={<Products />} />
          <Route path="user" element={<Users />} />
          <Route path="order" element={<Orders />} />
        </Route>
      </Routes>

      {!hideLayout && <Footer />}
      <ToastContainer position="top-center" />
    </>
  );
}

export default AppLayout;
