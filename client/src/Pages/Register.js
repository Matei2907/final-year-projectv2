import React, { useState } from "react";
import Axios from "axios";
import "./Forms.css";

function Register() {
  // Declare state variables for the username, email and the password input fields
  const [Reg_Username, getReg_Username] = useState("");
  const [Reg_Email, getReg_Email] = useState("");
  const [Reg_Password, getReg_Password] = useState("");

  const register = () => {
    // Send a POST request to the server with the user's registration information
    Axios.post("http://localhost:3001/register", {
      username: Reg_Username,
      email: Reg_Email,
      password: Reg_Password,
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <div className="login">
      <div className="login-form">
        <h1>Registration</h1>
        <label>Email</label>
        <input
          type="text"
          onChange={(e) => {
            // Update the Reg_Email state when the input value changes
            getReg_Email(e.target.value);
          }}
        ></input>
        <label>Username</label>
        <input
          type="text"
          onChange={(e) => {
            // Update the Reg_Username state when the input value changes
            getReg_Username(e.target.value);
          }}
        ></input>
        <label>Password</label>
        <input
          type="text"
          onChange={(e) => {
            //Update the Reg_password state when the input value changes
            getReg_Password(e.target.value); //
          }}
        ></input>
        <button onClick={register}>Register</button>
        <a href="/home">Home</a>
      </div>
    </div>
  );
}

export default Register;
