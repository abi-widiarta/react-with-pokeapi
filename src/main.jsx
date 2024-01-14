import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import HomePage from "./page/home";
import { CartProvider } from "./contexts/CartContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <HomePage />
    </CartProvider>
  </React.StrictMode>
);
