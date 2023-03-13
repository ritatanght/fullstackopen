import axios from "axios";
const API_KEY = process.env.REACT_APP_API_KEY;

const getAll = () => {
  const request = axios.get("https://restcountries.com/v3.1/all");
  return request.then((response) => response.data);
};

const getWeather = (capital) => {
  const request = axios.get(
    `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${capital}`
  );
  return request.then((response) => response.data);
};

export default { getAll, getWeather };
