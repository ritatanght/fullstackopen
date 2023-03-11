const PersonForm = ({ search, updateSearch }) => {
  return (
    <div>
      Filter shown with <input value={search} onChange={updateSearch} />
    </div>
  );
};

export default PersonForm;
