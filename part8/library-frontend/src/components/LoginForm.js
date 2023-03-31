import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries";
const LoginForm = ({ setToken }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      window.alert(error.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("user-token", token);
      navigate("/");
    }
  }, [result.data]); // eslint-disable-line
  const handleSubmit = (e) => {
    e.preventDefault();
    login({ variables: { username, password } });
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        username
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br />
      <label>
        password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
