import React from "react";
import  { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./Navbar/Navbar";
import Footer from "./Footer";

import SignIn from "./Login&reg/Signin";
import Register from "./Login&reg/Regist";

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

import AdminLayout from "./admindash/adminlayout";
import Dashboard from "./admindash/pages/dashboard";
import Products from "./admindash/pages/product";
import Users from "./admindash/pages/user";
import Orders from "./admindash/pages/order";

import RouteProtect from "./Routeprotector/Routeprotector";
import AdminRouteProtect from "./Routeprotector/adminrouteprotect";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ForgotPassword from "./Login&reg/ForgotPassword";


function AppLayout() {
  const location = useLocation();

  const hideLayout =
    location.pathname.startsWith("/admin") ||
    ["/signin", "/register","/forgot"].includes(location.pathname);

  return (
    <>
      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/men" element={<MenPage />} />
        <Route path="/women" element={<WomenPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/productpage" element={<ProductPage />} />
        <Route path="/productview/:id" element={<ProductOverview />} />

        <Route path="/forgot" element={<ForgotPassword />} />

        
        <Route
          path="/cart"
          element={
            <RouteProtect>
              <Cart />
            </RouteProtect>
          }
        />

        <Route
          path="/checkout"
          element={
            <RouteProtect>
              <Checkout />
            </RouteProtect>
          }
        />

        <Route
          path="/wishlist"
          element={
            <RouteProtect>
              <Wishlist />
            </RouteProtect>
          }
        />

        <Route
          path="/orderplaced"
          element={
            <RouteProtect>
              <OrderPlaced />
            </RouteProtect>
          }
        />

        <Route
          path="/userdata"
          element={
            
              <UserDashboard />
          
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
