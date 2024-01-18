import Color, { Palette } from "color-thief-react";
import { PokemonTypesContext, PokemonTypesProvider } from "../../contexts/PokemonTypesContext";
import { useContext } from "react";
import { motion } from "framer-motion";

const CardPokemon = (props) => {
  const { children, onClick } = props;
  return (
    <PokemonTypesProvider>
      <div onClick={onClick} className="flex flex-col pb-2 overflow-hidden transition-all duration-150 bg-white border shadow-lg hover:cursor-pointer group hover:scale-105 rounded-2xl shadow-gray-400/10">
        {children}
      </div>
    </PokemonTypesProvider>
  );
};

const Header = (props) => {
  let { item, img } = props;

  if (img == null) {
    img = "./pokedex.svg";
  }

  return (
    <Palette src={img} crossOrigin="anonymous" format="hex" colorCount={4}>
      {({ data, loading }) => {
        if (loading) return <div className="relative grid w-full bg-gray-200 h-44 place-items-center animate-pulse"></div>;
        return (
          <div className="relative grid w-full mb-6 h-44 place-items-center">
            <div style={{ backgroundColor: `${data[0]}` || "#000" }} className="absolute  w-[150%] -translate-y-[10rem] rounded-full aspect-square"></div>
            <img src={img} className="group-hover:scale-125 group-hover:translate-y-8 transition-all duration-150 z-30 w-44 translate-y-12 aspect-square drop-shadow-[0px_4px_0px_rgba(0,0,0,0.15)]"></img>
          </div>
        );
      }}
    </Palette>
  );
};

const Body = (props) => {
  const { name, id, types } = props;
  const { typesColor } = useContext(PokemonTypesContext);

  return (
    <div className="relative z-20">
      <h1 className="mb-1 text-2xl font-extrabold tracking-wider "> {name.charAt(0).toUpperCase() + name.slice(1)}</h1>
      <p className="mb-2 text-sm text-gray-400">#{id.toString().padStart(4, "0")}</p>
      <div className="flex justify-start w-full gap-1 mb-4">
        {types.map((item, index) => (
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
  );
};

const Footer = (props) => {
  const { stats, height, weight } = props;
  const hp = stats[0].base_stat;
  const att = stats[1].base_stat;
  const def = stats[2].base_stat;
  const spe = stats[5].base_stat;
  const sp_att = stats[3].base_stat;
  const sp_def = stats[4].base_stat;

  return (
    <div className="w-[90%] flex justify-between">
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
          <p>{height}</p>
          <p>{weight}</p>
        </div>
      </div>
    </div>
  );
};

CardPokemon.Header = Header;
CardPokemon.Body = Body;
CardPokemon.Footer = Footer;

export default CardPokemon;
