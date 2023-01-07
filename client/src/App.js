import "./App.css";
import React, { useState } from "react";
import Axios from "axios";

function App() {
  const [usernameReg, setUsernameReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState("");

  const register = () => {
    Axios.post("http://localhost:3001/register", {
      username: usernameReg,
      email: emailReg,
      password: passwordReg,
    }).then((response) => {
      console.log(response);
    });
  };

  const login = () => {
    Axios.post("http://localhost:3001/login", {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        setLoginStatus(response.data[0].username);
      }
      console.log(response.data);
    });
  };

  return (
    <div className="App">
      <div className="registration">
        <h1>Registration</h1>
        <label>Email</label>
        <input
          type="text"
          onChange={(e) => {
            setEmailReg(e.target.value);
          }}
        ></input>
        <label>Username</label>
        <input type="text"></input>
        <label>Password</label>
        <input
          type="text"
          onChange={(e) => {
            setPasswordReg(e.target.value);
          }}
        ></input>
        <button onClick={register}>Register</button>
      </div>

      <div className="login">
        <h1>Login</h1>
        <label>Email</label>
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
        <label>Password</label>
        <input
          type="text"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        <button onClick={login}>Login</button>
      </div>
      <h1>{loginStatus}</h1>
    </div>
  );
}

export default App;
