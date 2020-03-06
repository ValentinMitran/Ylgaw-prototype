import React from "react";
import { Link } from "react-router-dom";
import "./AuthPage.css";

function RegisterPage() {
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
            <button type="submit">Register</button>
            <Link to="/login">Login</Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;