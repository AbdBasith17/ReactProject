import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

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
import GuestRoute from "./Routeprotector/GuestRoute";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ForgotPassword from "./Login&reg/ForgotPassword";
import NotFound from "./Othercomponets/notfound";

function AppLayout() {
  const location = useLocation();

  // Pages that should not show the main Navbar/Footer
  const isAuthOrAdmin =
    location.pathname.startsWith("/admin") ||
    ["/signin", "/register", "/forgot"].includes(location.pathname);

  // Check if we are on the Home page to allow the transparent overlay effect
  const isHomePage = location.pathname === "/";

  return (
    <>
      {/* 1. Main Navbar - only shown on non-admin/auth pages */}
      {!isAuthOrAdmin && <Navbar />}

      {/* 2. Content Wrapper: 
          - Adds padding-top (pt) only on white-background pages to prevent overlap.
          - Home page gets pt-0 so the hero section slides under the transparent nav.
      */}
      <main 
        className={`min-h-screen flex flex-col transition-all duration-300 ${
          !isHomePage && !isAuthOrAdmin 
            ? "pt-[72px] lg:pt-[68px]" 
            : "pt-0"
        }`}
      >
        <div className="flex-1">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/men" element={<MenPage />} />
            <Route path="/women" element={<WomenPage />} />
            <Route path="/productpage" element={<ProductPage />} />
            <Route path="/productview/:id" element={<ProductOverview />} />

            {/* Guest Only Routes */}
            <Route path="/signin" element={<GuestRoute><SignIn /></GuestRoute>} />
            <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />
            <Route path="/forgot" element={<GuestRoute><ForgotPassword /></GuestRoute>} />

            {/* Protected Customer Routes */}
            <Route path="/cart" element={<RouteProtect><Cart /></RouteProtect>} />
            <Route path="/checkout" element={<RouteProtect><Checkout /></RouteProtect>} />
            <Route path="/wishlist" element={<RouteProtect><Wishlist /></RouteProtect>} />
            <Route path="/orderplaced" element={<RouteProtect><OrderPlaced /></RouteProtect>} />
            <Route path="/userdata" element={<UserDashboard />} />

            {/* Admin Routes */}
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

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

        {/* 3. Footer - only shown on non-admin/auth pages */}
        {!isAuthOrAdmin && <Footer />}
      </main>

      {/* Toast Notifications */}
      <ToastContainer 
        position="top-center" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        pauseOnHover 
      />
    </>
  );
}

export default AppLayout;