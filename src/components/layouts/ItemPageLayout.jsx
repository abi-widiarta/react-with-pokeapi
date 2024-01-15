import Navbar from "../fragments/Navbar";
import { motion } from "framer-motion";

const ItemPageLayout = (props) => {
  const { children } = props;
  return (
    <motion.div className="relative w-full min-h-screen px-12 pt-20 pb-6 bg-lightBlue2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Navbar type="pokemart" />

      <main>
        <h1 className="mb-8 text-2xl font-bold tracking-normal text-textDarkBlue">Welcome Trainers!, choose your item!</h1>
        {children}
      </main>
    </motion.div>
  );
};

export default ItemPageLayout;
