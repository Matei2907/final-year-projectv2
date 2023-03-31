import React from "react";
import Navbar from "../Components/Navbar";
import "./Forms.css";
import Axios from "axios";

function Account() {
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");

  const handleDelete = () => {
    Axios.post("http://localhost:3001/delete", {
      email: email,
    }).then((response) => {
      console.log(response);
      localStorage.clear();
      window.location.href = "/login";
    });
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="home">
        <h1>Welcome, {username}</h1>
        <p>Your account information:</p>
        <p>Email address: {email}</p>
        <button className="delete" onClick={handleDelete}>
          Delete account
        </button>
      </div>
    </div>
  );
}

export default Account;
