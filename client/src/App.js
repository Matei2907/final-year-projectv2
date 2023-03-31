import "./App.css";
import React from "react";
import "./Pages/Forms.css";

function App() {
  return (
    <div className="App">
      <div>
        <h1>Welcome to the Budgeting App</h1>
        <h2>Log in if you are an existing user, or register</h2>
        <div className="Login-register">
          <a href="login">Log In</a>
          <a href="login">Register</a>
        </div>
      </div>
    </div>
  );
}

export default App;
