import React, { useContext, useEffect, useState } from "react";
import Backdrop from "./Backdrop";
import { motion } from "framer-motion";
import { Palette } from "color-thief-react";
import { PokemonTypesContext, PokemonTypesProvider } from "../../contexts/PokemonTypesContext";
import { getPokemonSpecies } from "../../services/pokemons.service";

const Modal = (props) => {
  const { item, onClick, stats } = props;
  const { typesColor } = useContext(PokemonTypesContext);
  const [flavorText, setFlavorText] = useState([]);

  let img = item.sprites.other["official-artwork"].front_default;

  if (img == null) {
    img = "./pokedex.svg";
  }

  const hp = stats[0].base_stat;
  const att = stats[1].base_stat;
  const def = stats[2].base_stat;
  const spe = stats[5].base_stat;
  const sp_att = stats[3].base_stat;
  const sp_def = stats[4].base_stat;

  useEffect(() => {
    getPokemonSpecies(item.species.url, (status, response) => {
      if (status) {
        setFlavorText([response.flavor_text_entries[0].flavor_text, response.flavor_text_entries[4].flavor_text]);
      }
    });
  }, [item.species.url]);

  const scaleUp = {
    hidden: {
      scale: 0.5,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.01,
        type: "spring",
        stiffness: 313,
        damping: 23,
      },
      transformOrigin: "bottom",
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

  const fadeIn = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <Backdrop onClick={onClick}>
      <motion.div className="w-[800px] rounded-3xl h-[450px] bg-white overflow-hidden shadow-lg flex" variants={scaleUp} initial="hidden" animate="visible" exit="exit" onClick={(e) => e.stopPropagation()} drag>
        <div className="w-[40%] relative h-full flex items-center p-4">
          <Palette src={img} crossOrigin="anonymous" format="hex" colorCount={4}>
            {({ data, loading }) => {
              if (loading) return;

              return (
                <>
                  <motion.div
                    initial={{ opacity: 0, top: "50%", x: "-80%", y: "-45%" }}
                    animate={{ opacity: 1, top: "50%", x: "-65%", y: "-45%" }}
                    style={{ backgroundColor: `${data[0]}` }}
                    className="absolute -translate-y-[45%] top-[50%] h-[150%]  rounded-full -translate-x-[65%] aspect-square"
                  ></motion.div>

                  <motion.div
                    initial={{ opacity: 0, top: "50%", x: "-80%", y: "-45%" }}
                    animate={{ opacity: 0.3, top: "50%", x: "-60%", y: "-45%" }}
                    style={{ backgroundColor: `${data[0]}` }}
                    className="absolute -translate-y-[45%] top-[50%] h-[150%]  rounded-full -translate-x-[60%] aspect-square"
                  ></motion.div>

                  <motion.div
                    initial={{ opacity: 0, top: "50%", x: "-80%", y: "-45%" }}
                    animate={{ opacity: 0.1, top: "50%", x: "-55%", y: "-45%" }}
                    style={{ backgroundColor: `${data[0]}` }}
                    className="absolute -translate-y-[45%] top-[50%] h-[150%]  rounded-full -translate-x-[55%] aspect-square"
                  ></motion.div>

                  <motion.img draggable="false" variants={scaleUp} initial="hidden" animate="visible" className="z-10 w-96 drop-shadow-[0px_4px_0px_rgba(0,0,0,0.15)]" src={img} alt="" />
                  <p className="absolute z-10 font-bold tracking-normal bottom-2 text-black/10 text-7xl">#{item.id.toString().padStart(4, "0")}</p>
                </>
              );
            }}
          </Palette>
        </div>

        <div className="w-[60%]  px-4 py-8">
          <h1 className="mb-3 text-3xl font-extrabold tracking-widest">{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</h1>
          <div className="mb-6">
            {flavorText.length > 0 &&
              flavorText.map((text, index) => (
                <p key={index} className="mb-2 text-sm font-medium tracking-wide text-gray-600">
                  {text
                    .replace(/\f/g, "\n")
                    .replace(/\u00ad\n/g, "")
                    .replace(/\u00ad/g, "")
                    .replace(" -\n", " - ")
                    .replace(/-\n/g, "-")
                    .replace(/\n/g, " ")}
                </p>
              ))}
            {flavorText.length == 0 && (
              <>
                <div className="h-4 mb-1 text-sm font-medium tracking-wide text-gray-600 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="h-4 mb-3 text-sm font-medium tracking-wide text-gray-600 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="h-4 mb-1 text-sm font-medium tracking-wide text-gray-600 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="h-4 mb-3 text-sm font-medium tracking-wide text-gray-600 bg-gray-200 rounded-lg animate-pulse"></div>
              </>
            )}
          </div>
          <div className="mb-6">
            <h2 className="mb-3 text-base font-extrabold tracking-widest">Type</h2>

            <div className="flex justify-start space-x-1">
              {item.types.map((item, index) => (
                <div
                  style={{ backgroundColor: typesColor[item.type.name] != undefined ? typesColor[item.type.name].bg : "#ababab", color: typesColor[item.type.name] != undefined ? typesColor[item.type.name].text : "#ababab" }}
                  key={index}
                  className="px-4 py-1 text-sm font-semibold rounded-full text-softGreen"
                >
                  {item.type.name.charAt(0).toUpperCase() + item.type.name.slice(1)}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-3 text-base font-extrabold tracking-widest">Stat</h2>

            <div className="flex items-end justify-between">
              <div className="flex justify-start space-x-10">
                <div className="flex space-x-8 text-xs">
                  <div className="space-y-2 font-medium text-gray-400">
                    <p>HP</p>
                    <p>Attack</p>
                    <p>Defense</p>
                    <p>Speed</p>
                  </div>
                  <div className="space-y-2 font-semibold">
                    <p>{hp}</p>
                    <p>{att}</p>
                    <p>{def}</p>
                    <p>{spe}</p>
                  </div>
                </div>
                <div className="flex space-x-8 text-xs">
                  <div className="space-y-2 font-medium text-gray-400">
                    <p>Sp. Attack</p>
                    <p>Sp. Defense</p>
                    <p>Height</p>
                    <p>Weight</p>
                  </div>
                  <div className="space-y-2 font-semibold">
                    <p>{sp_att}</p>
                    <p>{sp_def}</p>
                    <p>{item.height}</p>
                    <p>{item.weight}</p>
                  </div>
                </div>
              </div>

              <img className="translate-y-6 w-14" src={item.sprites.other.showdown.front_default} alt="" />
            </div>
          </div>
        </div>
      </motion.div>
    </Backdrop>
  );
};

export default Modal;
