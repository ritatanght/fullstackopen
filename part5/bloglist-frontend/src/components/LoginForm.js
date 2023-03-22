import Message from './Message'
const LoginForm = ({
  message,
  handleSubmit,
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
}) => (
  <>
    <h2>Log in to application</h2>
    {message && <Message message={message} />}
    <form onSubmit={handleSubmit}>
      <label>
        username
        <input
          value={username}
          name="Username"
          onChange={handleUsernameChange}
          id="username"
        />
      </label>
      <br />
      <label>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
          id="password"
        />
      </label>
      <br />
      <input type="submit" value="login" />
    </form>
  </>
)

export default LoginForm
