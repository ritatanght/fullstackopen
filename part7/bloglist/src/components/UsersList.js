import { Link } from 'react-router-dom'
import User from './User'
import Table from 'react-bootstrap/Table'
const UsersList = ({ users }) => {
  return (
    <>
      <h2>Users</h2>
      <Table striped  hover size="sm">
        <thead>
          <tr>
            <td></td>
            <td>
              <strong>blogs created</strong>
            </td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`} element={<User />}>
                  {user.name}
                </Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default UsersList
