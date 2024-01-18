import { useContext, useState } from "react";
import Navbar from "../fragments/Navbar";
import { AnimatePresence, motion } from "framer-motion";
import DropdownType from "../elements/DropdownType";
import { PokemonTypesProvider } from "../../contexts/PokemonTypesContext";
import { AllPokemonContext } from "../../contexts/AllPokemonContext";
import { CardPokemonLoadingContext } from "../../contexts/CardPokemonLoadingContext";

const PokemonPageLayout = (props) => {
  const { children } = props;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { allPokemons, setAllPokemons } = useContext(AllPokemonContext);
  const { loading, setLoading } = useContext(CardPokemonLoadingContext);

  const handleSearch = (searchValue) => {
    if (searchValue) {
      setLoading(true);
      setAllPokemons([
        {
          name: searchValue,
          url: `https://pokeapi.co/api/v2/pokemon/${searchValue}`,
        },
      ]);
    }
  };

  return (
    <motion.div className="relative w-full min-h-screen px-12 pt-20 pb-6 bg-[#FFFAFA]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Navbar type="pokedex" />

      <main className="max-w-[1440px] mx-auto">
        <h1 className="text-2xl font-bold tracking-normal text-textDarkBlue">Welcome Trainers!, Catch em all!</h1>
        <div className="flex items-center justify-between mt-2 mb-8">
          <div className="relative">
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center justify-between px-4 py-2 space-x-6 text-base font-medium text-gray-600 bg-white rounded-lg shadow-md">
              <p className="text-sm font-medium">Types</p>
              <img src="./chevron-down.svg" alt="" />
            </button>

            <AnimatePresence initial="false" mode="wait">
              {dropdownOpen && (
                <PokemonTypesProvider>
                  <DropdownType onClick={() => setDropdownOpen(!dropdownOpen)} />
                </PokemonTypesProvider>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center space-x-4">
            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch(searchValue)}
              type="text"
              className="px-4 py-2 text-base font-medium text-gray-600 bg-white rounded-lg shadow-md w-60 focus:outline-gray-400"
              placeholder="Search..."
            />
            <button onClick={() => handleSearch(searchValue)} className="flex items-center justify-between p-2 space-x-6 text-base font-medium text-gray-600 transition bg-white rounded-lg shadow-md active:scale-90">
              <img src="./search-icon.svg" alt="" />
            </button>
          </div>
        </div>

        {children}
      </main>
    </motion.div>
  );
};

export default PokemonPageLayout;
