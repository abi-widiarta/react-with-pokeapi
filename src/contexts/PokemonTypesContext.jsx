import { createContext, useState } from "react";

const PokemonTypesContext = createContext();

const PokemonTypesProvider = ({ children }) => {
  const [typesColor, setTypes] = useState({
    grass: {
      bg: "#03E43429",
      text: "#03E434",
    },
    poison: {
      bg: "#D763FF29",
      text: "#D763FF",
    },
    normal: {
      bg: "#AAAA9929",
      text: "#AAAA99",
    },
    flying: {
      bg: "#8899FF29",
      text: "#8899FF",
    },
    dark: {
      bg: "#77554429",
      text: "#775544",
    },
    dragon: {
      bg: "#7766EE29",
      text: "#7766EE",
    },
    water: {
      bg: "#3399FF29",
      text: "#3399FF",
    },
    fire: {
      bg: "#FF442829",
      text: "#FF4422",
    },
    bug: {
      bg: "#AABB2229",
      text: "#AABB22",
    },
    electric: {
      bg: "#FFCC3329",
      text: "#FFCC33",
    },
    psychic: {
      bg: "#FF559929",
      text: "#FF5599",
    },
    ground: {
      bg: "#DDBB5529",
      text: "#DDBB55",
    },
    ice: {
      bg: "#66CCFF29",
      text: "#66CCFF",
    },
    steel: {
      bg: "#AAAABB29",
      text: "#AAAABB",
    },
    fairy: {
      bg: "#EE99EE29",
      text: "#EE99EE",
    },
    fighting: {
      bg: "#BB554429",
      text: "#BB5544",
    },
    ghost: {
      bg: "#6666BB29",
      text: "#6666BB",
    },
    rock: {
      bg: "#BBAA6629",
      text: "#BBAA66",
    },
  });

  return <PokemonTypesContext.Provider value={{ typesColor }}>{children}</PokemonTypesContext.Provider>;
};

export { PokemonTypesProvider, PokemonTypesContext };
