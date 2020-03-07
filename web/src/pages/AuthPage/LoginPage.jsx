import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import "./AuthPage.css";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    localStorage.authToken ? setIsLoggedIn(true) : setIsLoading(false);
  }, []);

  const submitForm = async e => {
    e.preventDefault();
    console.log(username);
    console.log(password);
  };

  if (isLoading) {
    return (
      <>
        Loading...
        {isLoggedIn ? <Redirect to="/" /> : null}
      </>
    );
  }

  return (
    <>
      <div className="authWrapper">
        <div className="authFormContainer">
          <img
            src="https://raw.githubusercontent.com/ValentinMitran/Ylgaw/master/Ylgaw.png"
            alt="Ylgaw Logo"
          />
          <form onSubmit={submitForm}>
            Username:
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            Password:
            <input
              type="text"
              name="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
            <Link to="/register">Register</Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
