import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { CartProvider } from "./contexts/CartContext";
import ItemPage from "./page/item";
import PokemonPage from "./page/pokemon";
import AnimatedTransition from "./transition/animatedTransition";
import { BrowserRouter as Router } from "react-router-dom";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <PokemonPage />,
//   },
//   {
//     path: "/pokemart",
//     element: <ItemPage />,
//   },
// ]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <Router>
        <AnimatedTransition />
      </Router>
    </CartProvider>
  </React.StrictMode>
);

{
  /* <RouterProvider router={router}>
<PokemonPage />
</RouterProvider> */
}
