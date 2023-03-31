//Importing the necessary libraries

import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./Forms.css";
import { useNavigate } from "react-router-dom";

function Login() {
  //Declaring the variables for the input fiels, email and password
  const [email, getEmail] = useState("");
  const [password, getPassword] = useState("");
  //Declaring the state for the loginStatus, if the user is logged in or not
  const [loginStatus, getLoginStatus] = useState("");

  //Using the navigate functions from React Router
  const navigate = useNavigate();

  //Setting up Axios to use cookies, so the user can stay logged in after refreshing the page
  Axios.defaults.withCredentials = true;

  const login = () => {
    Axios.post("http://localhost:3001/login", {
      // Sending POST requests to the server with email and password
      email: email,
      password: password,
    }).then((response) => {
      // Handles the response from the server
      if (response.data.message) {
        // If response contains errors, update the login status
        getLoginStatus(response.data.message);
      } else {
        //If the login is successfull, is stores the data in localStorage and navigates to the home page
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("email", email);
        localStorage.setItem("username", response.data.username);
        //redirecting the user to the home page
        navigate("/home");
      }
      console.log(response);
    });
  };

  return (
    <div>
      <div className="login">
        <div className="login-form">
          <h1>Login</h1>
          <label>Email</label>
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => {
              getEmail(e.target.value);
            }}
          ></input>
          <label>Password</label>
          <input
            type="text"
            placeholder="Password"
            onChange={(e) => {
              getPassword(e.target.value);
            }}
          ></input>
          <button onClick={login}>Login</button>{" "}
          <a href="/register">Create an account</a>{" "}
        </div>
        <h1>{loginStatus}</h1>
      </div>
    </div>
  );
}

export default Login;
