import { createContext, useState } from "react";

const CardPokemonLoadingContext = createContext();

const CardPokemonLoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  return <CardPokemonLoadingContext.Provider value={{ loading, setLoading }}>{children}</CardPokemonLoadingContext.Provider>;
};

export { CardPokemonLoadingProvider, CardPokemonLoadingContext };
