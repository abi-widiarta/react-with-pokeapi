import Navbar from "../fragments/Navbar";
import { motion } from "framer-motion";

const PokemonPageLayout = (props) => {
  const { children } = props;
  return (
    <motion.div className="relative w-full min-h-screen px-12 pt-20 pb-6 bg-[#FFFAFA]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Navbar type="pokedex" />

      <main>
        <h1 className="mb-8 text-2xl font-bold tracking-normal text-textDarkBlue">Welcome Trainers!, Catch em all!</h1>
        {children}
      </main>
    </motion.div>
  );
};

export default PokemonPageLayout;
