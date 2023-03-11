import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [search, setSearch] = useState("");
  const addPerson = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const personObject = {
        name: newName,
        number: newPhone,
      };
      setPersons(persons.concat(personObject));
      setNewName("");
      setNewPhone("");
    }
  };

  const updateName = (event) => {
    setNewName(event.target.value);
  };
  const updatePhone = (event) => {
    setNewPhone(event.target.value);
  };
  const updateSearch = (event) => {
    setSearch(event.target.value);
  };
  const searchResult = () => {
    return persons.filter((person) =>
      person.name.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} updateSearch={updateSearch} />
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        updateName={updateName}
        newPhone={newPhone}
        updatePhone={updatePhone}
      />
      <h3>Numbers</h3>
      <Persons searchResult={searchResult()} />
    </div>
  );
};

export default App;
