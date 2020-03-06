import React from "react";
import { Link } from "react-router-dom";
import "./AuthPage.css";

function LoginPage() {
  return (
    <>
      <div className="authWrapper">
        <div className="authFormContainer">
          <img
            src="https://raw.githubusercontent.com/ValentinMitran/Ylgaw/master/Ylgaw.png"
            alt="Ylgaw Logo"
          />
          <form>
            Username:
            <input type="text" name="username" id="username" />
            Password:
            <input type="text" name="password" id="password" />
            <button type="submit">Login</button>
            <Link to="/register">Register</Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;