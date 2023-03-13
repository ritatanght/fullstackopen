const Results = ({ search, searchResult, showCountry }) => {
  if (!search) {
    return null;
  } else if (search && searchResult.length > 10) {
    return <p>Too many matches, please be more specfic</p>;
  } else if (searchResult.length === 1) {
    const country = searchResult[0];
    const languages = Object.entries(country.languages);

    return (
      <>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
        <h3>Languages</h3>
        <ul>
          {languages.map((language) => (
            <li key={language[0]}>{language[1]}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt={country.flags.alt} />
      </>
    );
  }

  return (
    <ul>
      {searchResult.map((result) => (
        <li key={result.cca2}>
          {result.name.common}{" "}
          <button onClick={() => showCountry(result.name.common)}>show</button>
        </li>
      ))}
    </ul>
  );
};

export default Results;
