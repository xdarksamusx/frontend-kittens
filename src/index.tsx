import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { LoginForm } from "./pages/LoginForm";
import Testing from "./pages/Testing";
import SignUpForm from "./pages/SignUpForm";
import { KittenProvider } from "./context/KittenContext";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <KittenProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </KittenProvider>
  </React.StrictMode>
);

reportWebVitals();
