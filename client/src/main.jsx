import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";
import { ProfileProvider } from "./context/ProfileContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <ProfileProvider>
      <App />
    </ProfileProvider>
  </HelmetProvider>
);