import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";
const AuthorForm = ({ authors }) => {
  const [name, setName] = useState(authors[0].name);
  const [year, setYear] = useState("");
  const [edit_author] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    edit_author({ variables: { name, setBornTo: Number(year) } });
    setName("");
    setYear("");
  };
  return (
    <>
      <h3>Set birthyear</h3>
      <form onSubmit={handleSubmit}>
        <label>
          name
          <select
            name="authors"
            value={name}
            onChange={(e) => setName(e.target.value)}
          >
            {authors.map((author) => (
              <option key={author.name} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>{" "}
        </label>
        <br />
        <label>
          born
          <input
            name="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </label>
        <br />
        <button>update author</button>
      </form>
    </>
  );
};

export default AuthorForm;
