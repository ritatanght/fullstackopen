import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommendations from "./components/Recommendations";
import {
  useMutation,
  useQuery,
  useApolloClient,
  useSubscription,
} from "@apollo/client";
import { Routes, Route, Link } from "react-router-dom";
import {
  ALL_AUTHORS,
  ALL_BOOKS,
  ADD_BOOK,
  BOOK_BY_GENRE,
  BOOK_ADDED,
} from "./queries";
import { useState, useEffect } from "react";

const App = () => {
  const authors = useQuery(ALL_AUTHORS);
  const books = useQuery(ALL_BOOKS);
  const [token, setToken] = useState(null);
  const client = useApolloClient();
  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [
      // { query: ALL_AUTHORS },
      // { query: ALL_BOOKS },
      { query: BOOK_BY_GENRE },
    ],
  });

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded;
      window.alert(`${addedBook.title} added`);
      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(addedBook),
        };
      });
    },
  });

  useEffect(() => {
    if (localStorage.getItem("user-token")) {
      setToken(localStorage.getItem("user-token"));
    }
  }, []);

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };
  return (
    <div>
      <div>
        <Link to="/">authors</Link> <Link to="/books">books</Link>{" "}
        {!token && <Link to="/login">login</Link>}{" "}
        {token && (
          <>
            <Link to="/add">add book</Link>{" "}
            <Link to="/recommend">recommend</Link>{" "}
            <button onClick={logout}>logout</button>
          </>
        )}
      </div>
      <Routes>
        <Route path="/books" element={<Books books={books.data} />} />
        <Route path="/add" element={<NewBook addBook={addBook} />} />
        <Route
          path="/recommend"
          element={<Recommendations books={books.data} />}
        />
        <Route path="/login" element={<LoginForm setToken={setToken} />} />
        <Route path="/" element={<Authors authors={authors.data} />} />
      </Routes>
    </div>
  );
};

export default App;
