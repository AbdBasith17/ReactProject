import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import SignIn from './Login&reg/Signin';
import Register from './Login&reg/Regist';
import ProductOverview from './PageComonents/POverview';
import ProductPage from './PageComonents/ProductPage';
import Cart from './PageComonents/Cart';
import Checkout from './PageComonents/Checkout';
import Home from './Home/Home';
import MenPage from './Otherpages/Men';
import WomenPage from './Otherpages/women';
import Footer from './Footer';
import Routeprotect from './Routeprotector/Routeprotector';

import ScrollToTop from './Othercomponets/scrolltop';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';
import Wishlist from './Wishlist/wishlist';
import OrderPlaced from './PageComonents/orderplaced';
import UserDashboard from './Navbar/Userdash/userdash';
import Sidebar from './admindash/pages/sidebar';
import Dashboard from './admindash/pages/dashboard';
import AdminLayout from './admindash/adminlayout';
import Products from './admindash/pages/product';
import Users from './admindash/pages/user';
import Orders from './admindash/pages/order';
import AdminRouteProtect from './Routeprotector/adminrouteprotect';
import LogRoute from './Routeprotector/Loginprotect';
import NonAdminRoute from './Routeprotector/NonAdminroute';




function AppLayout() {
  const location = useLocation();
  const hideNav = ['/signin','/flag', '/register','/admin','/admin/admindash','/admin/product','/admin/user','/admin/order'];
  const hideLayout = hideNav.includes(location.pathname);

  return (
    <>
      {/* <ScrollToTop /> */}
      {!hideLayout && <Navbar />}
      <Routes>
        <Route path="/" element={<NonAdminRoute><Home /></NonAdminRoute>} />
        <Route path="/signin" element={<LogRoute><SignIn /></LogRoute> }/>
        <Route path="/register" element={<Register />} />
        <Route path="/productpage" element={<NonAdminRoute><ProductPage /></NonAdminRoute>} />
        <Route path="/productview/:id" element={<NonAdminRoute><ProductOverview /></NonAdminRoute>} />
        <Route path="/men" element={<MenPage />} />
        <Route path="/women" element={<WomenPage />} />
        <Route path="/cart" element={<NonAdminRoute><Routeprotect><Cart /></Routeprotect></NonAdminRoute>} />
        <Route path="/orderplaced" element={<NonAdminRoute><Routeprotect><OrderPlaced /></Routeprotect></NonAdminRoute>} />

        <Route path="/wishlist" element={<NonAdminRoute><Wishlist /></NonAdminRoute>} />

        <Route path="/checkout" element={<Routeprotect><Checkout /></Routeprotect>} />
        <Route path="/userdata" element={<NonAdminRoute><UserDashboard /></NonAdminRoute>} />
       




  {/* adminnnnnnn*/}


  <Route path='/admin' element={<AdminRouteProtect><AdminLayout/></AdminRouteProtect>}>
       <Route path="admindash" element={<Dashboard/>}/>
       <Route path="product" element={<Products/>}/>
       <Route path="user" element={<Users/>}/>
       <Route path="order" element={<Orders/>}/>
  </Route>
      

      </Routes>
      {!hideLayout && <Footer />}
      <ToastContainer position="top-center" />
    </>
  );
}

export default AppLayout;
