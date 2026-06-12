import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { HelmetProvider } from "react-helmet-async";
import { ProfileProvider } from "./context/ProfileContext";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <ProfileProvider>
          <App />
        </ProfileProvider>
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);