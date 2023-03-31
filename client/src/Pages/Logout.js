import "./Forms.css";

function Logout() {
  return (
    <div>
      <div className="home">
        <h1>Logout was successful!</h1>
        <a href="/login">Log in</a>
        <a href="/home">Home</a>
      </div>
    </div>
  );
}

export default Logout;
