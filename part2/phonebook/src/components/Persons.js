const Persons = ({ searchResult }) => {
  return (
    <>
      {searchResult.map((result) => (
        <p key={result.name}>
          {result.name} {result.number}
        </p>
      ))}
    </>
  );
};

export default Persons;
