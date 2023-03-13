import { useState, useEffect } from "react";
import Results from "./components/Results";
import Weather from "./components/Weather";
import countriesService from "./services/countries";

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [capital, setCapital] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    countriesService
      .getAll()
      .then((returnedCountries) => setCountries(returnedCountries));
  }, []);

  useEffect(() => {
    if (capital) {
      countriesService
        .getWeather(capital)
        .then((returnedWeather) => setWeather(returnedWeather));
    }
  }, [capital]);

  useEffect(() => {
    if (searchResult().length === 1) {
      setCapital(searchResult()[0].capital[0]);
    } else {
      setCapital(null);
      setWeather(null);
    }
  }, [search]);

  const updateSearch = (event) => {
    setSearch(event.target.value);
  };

  const showCountry = (country) => {
    setSearch(country);
  };

  const searchResult = () => {
    return countries.filter((country) =>
      country.name.common.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <div>
      <h1>Data for Countries</h1>
      <label>
        Find Countries{" "}
        <input value={search} onChange={updateSearch} autoFocus />
      </label>
      <Results
        search={search}
        searchResult={searchResult()}
        showCountry={showCountry}
      />
      {weather && <Weather weather={weather} />}
    </div>
  );
}

export default App;
