import { useState } from "react";
import "../css/styles-login.css";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";

export const connect = async (username, password) => {
  //var tokenset = false;
  var token = "";
  const data = {
    Correo: username,
    Clave: password,
  };
  const user = JSON.stringify(data);

  //if (!tokenset) {
  await axios
    .put("http://localhost:9080/iniciosesion", user)
    .then((e) => {
      localStorage.setItem("Session", e.data.Value);
      localStorage.setItem("lastlogin", Date.now());
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(() => {
      token = localStorage.getItem("Session");
    });
  //}
  return token;
};

const Login = (t) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);

  const onSubmit = async (e) => {
    e.preventDefault();
    const ll = await connect(username, password);
    if (ll) {
      setToken(ll);
    } else {
      console.log("Error");
    }
  };

  if (localStorage.getItem("Session") === null) {
    return (
      <form className="box" onSubmit={onSubmit}>
        <h2>Loging</h2>
        <input
          onChange={onUsernameChanged}
          type="text"
          name="username"
          placeholder="Username"
        />
        <input
          onChange={onPasswordChanged}
          type="password"
          name="password"
          placeholder="Password"
        />
        <button type="submit" value="Login">
          Loging
        </button>
        <Link to="./newUser">
          <h3>Nuevo usuario</h3>
        </Link>
      </form>
    );
  } else {
    //dispatch(setTok(token || ""));
    return <Navigate to="/home" />;
  }
};

export default Login;
