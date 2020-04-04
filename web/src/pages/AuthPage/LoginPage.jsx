import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import "./AuthPage.scss";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginError, setLoginError] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    localStorage.authToken ? setIsLoggedIn(true) : setIsLoading(false);
  }, []);

  const submitForm = async e => {
    e.preventDefault();

    let response = await fetch("/api/user/login", {
      method: "Post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    }).catch(err => {
      alert(err);
    });
    if (response.headers.get("authToken")) {
      localStorage.authToken = response.headers.get("authToken");
      setIsLoggedIn(true);
    } else {
      setLoginError("Username/Password combination doesn't exist.");
      setUsername("");
      setPassword("");
    }
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
      {isLoggedIn ? <Redirect to="/" /> : null}

      <div className="auth-wrapper">
        <div className="auth-form">
          <img alt="" src="https://i.imgur.com/JD1htQS.png" />
          <div>{loginError}</div>
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
              required
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
            <Link to="/register">REGISTER</Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
