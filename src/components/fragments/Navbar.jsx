import React from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  const { type } = props;

  switch (type) {
    case "pokemart":
      return <PokeMart />;
    case "pokedex":
      return <PokeDex />;
  }
};

const PokeMart = () => {
  return (
    <nav className="fixed top-0 left-0 z-50 flex justify-between w-full px-12 py-3 shadow-lg bg-lighBlue shadow-gray-200">
      <div className="flex items-center space-x-2">
        <img src="./logo.png" alt="logo" />
        <p className="text-lg font-bold tracking-widest text-darkBlue">PokeMart</p>
      </div>
      <Link to="/" className="flex items-center px-4 py-1 space-x-2 border-2 rounded-full bg-white border-[#F04037]">
        <img className="w-6" src="./pokedex.svg" alt="logo" />
        <p className="text-sm font-bold tracking-widest text-[#F04037]">PokeDex</p>
        <img src="./chevron-right-red.svg" alt="right" />
      </Link>
    </nav>
  );
};

const PokeDex = () => {
  return (
    <nav className="fixed top-0 left-0 z-50 flex justify-between w-full px-12 py-3 bg-white shadow-lg shadow-gray-200">
      <div className="flex items-center space-x-2">
        <img src="./pokedex.svg" alt="logo" />
        <p className="text-lg font-bold tracking-widest text-[#F04037]">PokeDex</p>
      </div>
      <Link to="/pokemart" className="flex items-center px-4 py-1 space-x-2 border-2 rounded-full bg-lightBlue2 border-darkBlue">
        <img className="w-6" src="./logo.png" alt="logo" />
        <p className="text-sm font-bold tracking-widest text-darkBlue">PokeMart</p>
        <img src="./chevron-right.svg" alt="right" />
      </Link>
    </nav>
  );
};

export default Navbar;
