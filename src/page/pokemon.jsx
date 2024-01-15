import { useEffect, useState } from "react";
import PokemonPageLayout from "../components/layouts/PokemonPageLayout";
import CardPokemon from "../components/fragments/CardPokemon";
import { getPokemon, getPokemonDetail } from "../services/pokemons.service";
import SkeletonCard from "../components/fragments/SkeletonCard";

const PokemonPage = () => {
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [allPokemons, setPokemons] = useState([]);

  const [pokemonDetails, setPokemonDetails] = useState([]);
  const [prevPage, setPrevPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPokemon(url, (status, response, prev, next) => {
      if (status) {
        setPokemons(response);
        setPrevPage(prev);
        setNextPage(next);
      }
    });
  }, [url]);

  useEffect(() => {
    if (allPokemons && allPokemons.length > 0) {
      const fetchItemDetails = async () => {
        const promises = allPokemons.map((item) => {
          return new Promise((resolve) => {
            getPokemonDetail(item.url, (status, response) => {
              if (status) {
                resolve(response);
              } else {
                resolve(null);
              }
            });
          });
        });

        const pokemonDetailsArray = await Promise.all(promises);
        setPokemonDetails(pokemonDetailsArray.filter((detail) => detail !== null));
        console.log(pokemonDetailsArray);
        setLoading(false);
      };

      fetchItemDetails();
    }
  }, [allPokemons]);

  const navigatePage = (url) => {
    setUrl(url);
    setLoading(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <PokemonPageLayout>
      <>
        <div className="flex w-full gap-10 mx-auto">
          <div className="grid items-start w-full grid-cols-4 gap-6">
            {loading == true ? (
              <SkeletonCard />
            ) : (
              pokemonDetails.map((item, index) => {
                return (
                  <CardPokemon key={index}>
                    <CardPokemon.Header img={item.sprites.other["official-artwork"].front_default}></CardPokemon.Header>
                    <div className="px-4 py-4">
                      <CardPokemon.Body name={item.name} id={item.id} types={item.types} />
                      <CardPokemon.Footer stats={item.stats} height={item.height} weight={item.weight}></CardPokemon.Footer>
                    </div>
                  </CardPokemon>
                );
              })
            )}
          </div>
        </div>

        <div className="flex mt-4 space-x-4 ">
          <button onClick={() => navigatePage(prevPage)} className={`p-2 bg-white shadow-md rounded-lg ${prevPage === null ? "opacity-35 pointer-events-none" : ""}`}>
            <img src="./prev.svg" alt="" />
          </button>
          <button onClick={() => navigatePage(nextPage)} className={`p-2 bg-white shadow-md rounded-lg ${nextPage === null ? "opacity-35 pointer-events-none" : ""}`}>
            <img src="./next.svg" alt="" />
          </button>
        </div>
      </>
    </PokemonPageLayout>
  );
};

export default PokemonPage;
