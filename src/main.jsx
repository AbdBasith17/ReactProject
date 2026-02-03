import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google'; 

import AppLayout from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId="43587773755-lju0k0i38psitibubt8sp2355i7rm1kp.apps.googleusercontent.com">
      <AuthProvider>
        <AppLayout />
      </AuthProvider>
    </GoogleOAuthProvider>
  </BrowserRouter>
);