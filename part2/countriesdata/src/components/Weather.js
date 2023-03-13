const Weather = ({ weather }) => {
  return (
    <>
      <h2>Weather in {weather.location.name}</h2>
      <img src={weather.current.condition.icon} />
      <p>Temperature: {weather.current.temp_c} Celcius</p>
      <p>Wind: {weather.current.wind_mph} m/h</p>
    </>
  );
};

export default Weather;
