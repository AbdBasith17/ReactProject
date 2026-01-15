import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import AppLayout from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AppLayout />
      </AuthProvider>
    </BrowserRouter>
  // </StrictMode>
);
