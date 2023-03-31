import { useQuery } from "@apollo/client";
import { GET_USER, BOOK_BY_GENRE } from "../queries";
const Recommendations = () => {
  const user = useQuery(GET_USER);
  let favoriteGenre = "";
  if (user.data) {
    favoriteGenre = user.data.me.favoriteGenre;
  }
  const list = useQuery(BOOK_BY_GENRE, {
    variables: { genre: favoriteGenre },
    skip: !favoriteGenre,
  });

  if (list.loading || !list.data) {
    return (
      <>
        <h2>Recommendations</h2>
        Loading..
      </>
    );
  }

  return (
    <div>
      <h2>Recommendations</h2>
      books in your favorite genere <strong>{favoriteGenre}</strong>
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
    </div>
  );
};

export default Recommendations;
