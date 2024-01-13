import axios from "axios";

const getItems = (callback) => {
  axios
    .get("https://pokeapi.co/api/v2/item")
    .then((response) => {
      callback(true, response.data.results);
    })
    .catch((err) => {
      callback(false, err);
    });
};

const getItemDetail = (url, callback) => {
  axios
    .get(url)
    .then((response) => {
      callback(true, response);
    })
    .catch((err) => {
      callback(false, err);
    });
};

export { getItems, getItemDetail };
