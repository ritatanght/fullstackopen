const PersonForm = ({
  addPerson,
  newName,
  updateName,
  newPhone,
  updatePhone,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={updateName} />
        <div>
          number: <input value={newPhone} onChange={updatePhone} />
        </div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
