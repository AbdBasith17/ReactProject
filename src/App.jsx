import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import SignIn from './Signin';
import Register from './Regist';
import ProductOverview from './POverview';
import ProductPage from './Productpage';
import Cart from './Cart';
import Checkout from './Checkout';
import Home from './Home';
import MenPage from './Men';
import WomenPage from './women';
import Footer from './Footer';
import Routeprotect from './Routeprotector';
import UserDetailes from './userdetails';
import ScrollToTop from './scrolltop';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';
import Wishlist from './wishlist';

function AppLayout() {
  const location = useLocation();
  const hideNav = ['/signin', '/register'];
  const hideLayout = hideNav.includes(location.pathname);

  return (
    <>
      <ScrollToTop />
      {!hideLayout && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/productpage" element={<ProductPage />} />
        <Route path="/productview/:id" element={<ProductOverview />} />
        <Route path="/men" element={<MenPage />} />
        <Route path="/women" element={<WomenPage />} />
        <Route path="/cart" element={<Routeprotect><Cart /></Routeprotect>} />
        <Route path="/wishlist" element={<Wishlist />} />

        <Route path="/checkout" element={<Checkout />} />
        <Route path="/userdata" element={<UserDetailes />} />

      </Routes>
      {!hideLayout && <Footer />}
      <ToastContainer position="top-center" />
    </>
  );
}

export default AppLayout;
