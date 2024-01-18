import { createContext, useState } from "react";

const AllPokemonContext = createContext();

const AllPokemonContextProvider = ({ children }) => {
  const [allPokemons, setAllPokemons] = useState([]);

  return <AllPokemonContext.Provider value={{ allPokemons, setAllPokemons }}>{children}</AllPokemonContext.Provider>;
};

export { AllPokemonContextProvider, AllPokemonContext };
