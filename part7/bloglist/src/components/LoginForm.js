import { useState } from 'react'
import Message from './Message'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(loginUser({ username, password }))
    setUsername('')
    setPassword('')
  }
  return (
    <>
      <h2>Log in to application</h2>
      <Message />
      <Form onSubmit={handleLogin}>
        <Form.Label>
          username
          <Form.Control
            value={username}
            name="Username"
            onChange={(e) => setUsername(e.target.value)}
            id="username"
          />
        </Form.Label>
        <br />
        <Form.Label>
          password
          <Form.Control
            type="password"
            value={password}
            name="Password"
            onChange={(e) => setPassword(e.target.value)}
            id="password"
          />
        </Form.Label>
        <br />
        <Button type="submit">login</Button>
      </Form>
    </>
  )
}

export default LoginForm
