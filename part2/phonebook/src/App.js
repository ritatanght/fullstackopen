import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        // replace the old number with the new one
        const person = persons.find((person) => person.name === newName);
        const changedPerson = { ...person, number: newPhone };
        personService
          .update(changedPerson.id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === changedPerson.id ? returnedPerson : person
              )
            );
            setMessage(`Number for ${returnedPerson.name} updated`);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
            setNewName("");
            setNewPhone("");
          })
          .catch((error) => {
            setError(error.response.data.error);
            setTimeout(() => {
              setError(null);
            }, 5000);
          });
      }
    } else {
      const personObject = {
        name: newName,
        number: newPhone,
      };
      personService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setMessage(`Added ${returnedPerson.name}`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setError(error.response.data.error);
          setTimeout(() => {
            setError(null);
          }, 5000);
        });
      setNewName("");
      setNewPhone("");
    }
  };

  const delPerson = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService
        .del(id)
        .then(() => setPersons(persons.filter((person) => person.id !== id)))
        .catch((error) => {
          setError(
            `Information of ${name} has already been removed from server`
          );
          setTimeout(() => {
            setError(null);
          }, 5000);
          setPersons(persons.filter((person) => person.id !== id));
        });
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

  useEffect(() => {
    personService.getAll().then((returnedPerson) => setPersons(returnedPerson));
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} error={error} />
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
      <Persons searchResult={searchResult()} delPerson={delPerson} />
    </div>
  );
};

export default App;
