import React, { useState, useEffect } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import "./AuthPage.scss";

function RegisterPage({ history }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [registerError, setRegisterError] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    localStorage.authToken ? setIsLoggedIn(true) : setIsLoading(false);
  }, []);

  const submitForm = async e => {
    e.preventDefault();

    let response = await fetch("/api/user/register", {
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
    response = await response.text();
    if (response === "Success") {
      alert("Registration Successful");
      history.push("/login");
    } else {
      setRegisterError(response);
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
          <img
            alt=""
            src="https://raw.githubusercontent.com/ValentinMitran/Ylgaw/master/Ylgaw.png"
          />
          <div>{registerError}</div>
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
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button type="submit">Register</button>
          </form>
          <a href="/login">LOGIN</a>
        </div>
      </div>
    </>
  );
}

export default withRouter(RegisterPage);