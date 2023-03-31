import { useState } from "react";
import { useQuery } from "@apollo/client";
import { BOOK_BY_GENRE } from "../queries";

const Books = ({ books }) => {
  const [genre, setGenre] = useState("");
  const list = useQuery(BOOK_BY_GENRE, {
    variables: { genre },
    skip: !genre,
  });
  if (!books) {
    return null;
  }
  let genreList = [];
  books.allBooks.forEach((book) => {
    genreList = genreList.concat(book.genres);
    return genreList;
  });
  const addFilter = (e) => {
    setGenre(e.target.textContent);
  };

  if (genre && list.data) {
    return (
      <>
        <h2>books</h2>
        in genere <strong>{genre}</strong>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {list.data.allBooks.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          {[...new Set(genreList)].map((genre) => (
            <button onClick={addFilter} key={genre}>
              {genre}
            </button>
          ))}
          <button onClick={() => setGenre("")}>all genres</button>
        </div>
      </>
    );
  }
  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {[...new Set(genreList)].map((genre) => (
          <button onClick={addFilter} key={genre}>
            {genre}
          </button>
        ))}
        <button onClick={() => setGenre("")}>all genres</button>
      </div>
    </div>
  );
};

export default Books;
