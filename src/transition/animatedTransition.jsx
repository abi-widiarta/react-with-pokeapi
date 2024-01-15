import React from "react";
import { RouterProvider, createBrowserRouter, BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import PokemonPage from "../page/pokemon";
import ItemPage from "../page/item";
import { AnimatePresence } from "framer-motion";

const AnimatedTransition = () => {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PokemonPage />} />
        <Route path="/pokemart" element={<ItemPage />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedTransition;
