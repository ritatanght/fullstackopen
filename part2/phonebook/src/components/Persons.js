const Persons = ({ searchResult, delPerson }) => {
  return (
    <>
      {searchResult.map((result) => (
        <p key={result.name}>
          {result.name} {result.number}{" "}
          <button
            key={result.id}
            onClick={() => delPerson(result.id, result.name)}
          >
            delete
          </button>
        </p>
      ))}
    </>
  );
};

export default Persons;
