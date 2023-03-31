import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

const Navbar = () => {
  //useNavigate hook is initialised for navigation between pages
  const navigate = useNavigate();
  const [loggedIn, getLoggedIn] = useState(
    //Stores if the user is logged in or not
    localStorage.getItem("loggedIn") === "true"
  );
  //Variables if the navbar is sticky or not
  const [isSticky, getIsSticky] = useState(false);

  const handleLogout = () => {
    // Function to handle user logout
    Axios.post("http://localhost:3001/logout").then(() => {
      //Removes the loggedIN value from local storage
      localStorage.removeItem("loggedIn");
      //Navigates the user to the logout page
      navigate("/logout");
      //Updates LoggedIn to false
      getLoggedIn(false);
    });
  };

  //Detects if the user scrolls, so the navbar will stick
  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 0) {
        // If the user scrolled down the page, make navbar sticky
        getIsSticky(true);
      } else {
        // If the user is at the top of the page make the Navbar not sticky
        getIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`Navbar ${isSticky ? "is-sticky" : ""}`}>
      <span className="nav-logo">
        <a href="/home ">TBA</a>
      </span>
      <div className="nav-items">
        {loggedIn ? (
          <>
            <a href="/myaccount">My Account</a>
            <a onClick={handleLogout}>Logout</a>
          </>
        ) : null}
        {!loggedIn ? (
          <>
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Navbar;
