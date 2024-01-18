import { useState } from "react";
import Navbar from "../fragments/Navbar";
import { AnimatePresence, motion } from "framer-motion";
import DropdownType from "../elements/DropdownType";
import { PokemonTypesProvider } from "../../contexts/PokemonTypesContext";

const PokemonPageLayout = (props) => {
  const { children } = props;
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <motion.div className="relative w-full min-h-screen px-12 pt-20 pb-6 bg-[#FFFAFA]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Navbar type="pokedex" />

      <main>
        <div className="flex items-center justify-between mt-2 mb-8">
          <h1 className="text-2xl font-bold tracking-normal text-textDarkBlue">Welcome Trainers!, Catch em all!</h1>

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
        </div>

        {children}
      </main>
    </motion.div>
  );
};

export default PokemonPageLayout;
