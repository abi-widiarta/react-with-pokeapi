import axios from "axios";

const getPokemon = (url, callback) => {
  axios
    .get(url)
    .then((response) => callback(true, response.data.results, response.data.previous, response.data.next))
    .catch((response) => callback(false, response));
};

const getPokemonDetail = (url, callback) => {
  axios
    .get(url)
    .then((response) => callback(true, response.data))
    .catch((response) => callback(false, response));
};

const getPokemonSpecies = (url, callback) => {
  axios
    .get(url)
    .then((response) => callback(true, response.data))
    .catch((response) => callback(false, response));
};

const getAllPokemonTypes = (url, callback) => {
  axios
    .get(url)
    .then((response) => callback(true, response.data.results))
    .catch((response) => callback(false, response));
};

const getAllPokemonOnOneType = (url, callback) => {
  axios
    .get(url)
    .then((response) => callback(true, response.data.pokemon))
    .catch((response) => callback(false, response));
};

export { getPokemon, getPokemonDetail, getPokemonSpecies, getAllPokemonTypes, getAllPokemonOnOneType };
