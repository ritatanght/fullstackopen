import AuthorForm from "./AuthorForm";
const Authors = ({ authors }) => {
  // if (!props.show) {
  //   return null
  // }
  if (!authors) {
    return null;
  }
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <AuthorForm authors={authors.allAuthors} />
    </div>
  );
};

export default Authors;
