import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { getAllPokemonOnOneType, getAllPokemonTypes } from "../../services/pokemons.service";
import { PokemonTypesContext } from "../../contexts/PokemonTypesContext";
import { AllPokemonContext } from "../../contexts/AllPokemonContext";
import { CardPokemonLoadingContext } from "../../contexts/CardPokemonLoadingContext";

const DropdownType = (props) => {
  const { onClick } = props;
  const [types, setTypes] = useState([]);
  const { typesColor } = useContext(PokemonTypesContext);
  const { setAllPokemons } = useContext(AllPokemonContext);
  const { loading, setLoading } = useContext(CardPokemonLoadingContext);

  useEffect(() => {
    getAllPokemonTypes("https://pokeapi.co/api/v2/type", (status, res) => {
      if (status) {
        setTypes(res);
      }
    });
  }, []);

  const handleChooseType = (url) => {
    onClick();
    setLoading(true);
    getAllPokemonOnOneType(url, (status, res) => {
      if (status) {
        const filteredPokemons = res.map((item) => item.pokemon);
        setAllPokemons(filteredPokemons);
      }
    });
  };

  const scaleUp = {
    hidden: {
      scale: 0.5,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: "0.01s",
        type: "spring",
        stiffness: 313,
        damping: 23,
      },
      transformOrigin: "top left",
    },
    exit: {
      scale: 0.5,
      opacity: 0,
      transition: {
        duration: 0.01,
        type: "spring",
        stiffness: 313,
        damping: 23,
      },
    },
  };
  return (
    <motion.div variants={scaleUp} initial="hidden" animate="visible" exit="exit" className="absolute left-0 z-50 p-6 bg-white rounded-lg shadow-xl top-14 w-96">
      <h3 className="mb-4 text-sm font-semibold text-gray-500">Choose One :</h3>

      <div className="grid justify-center grid-cols-4 grid-rows-5 gap-2">
        {types.length > 0 &&
          types.map((type, index) => (
            <div
              style={{ backgroundColor: typesColor[type.name] != undefined ? typesColor[type.name].bg : "#ababab19", color: typesColor[type.name] != undefined ? typesColor[type.name].text : "#00000080" }}
              key={index}
              onClick={() => handleChooseType(type.url)}
              className="py-1 text-sm font-semibold text-center transition-all duration-150 rounded-full hover:opacity-70 hover:cursor-pointer bg-lightSoftGreen/50"
            >
              {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
            </div>
          ))}
      </div>
    </motion.div>
  );
};

export default DropdownType;
