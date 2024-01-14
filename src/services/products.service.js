import axios from "axios";

const getItems = (url, callback) => {
  axios
    .get(url)
    .then((response) => {
      callback(true, response.data.results, response.data.previous, response.data.next);
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
