import React from "react";
import Navbar from "../Components/Navbar";
import "./Forms.css";

function Home() {
  return (
    <div>
      <Navbar></Navbar>
      <div className="home">
        <a href="/spending">Check your Spending</a>
        <a href="/tips">Saving tips</a>
      </div>
    </div>
  );
}

export default Home;
