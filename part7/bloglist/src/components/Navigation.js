//import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'

const Navigation = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const handleLogout = () => {
    dispatch(logoutUser())
  }
  return (
    <Navbar bg="light">
      <Nav>
        <Nav.Item>
          <Nav.Link href="/">Home</Nav.Link>
        </Nav.Item>{' '}
        <Nav.Item>
          <Nav.Link href="/users">Users</Nav.Link>{' '}
        </Nav.Item>
      </Nav>
      {user && (
        <span>
          {user.name} logged in{' '}
          <Button variant="secondary" size="sm" onClick={handleLogout}>
            logout
          </Button>
        </span>
      )}
    </Navbar>
  )
}

export default Navigation
