import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AppPage from "./../pages/AppPage/AppPage";
import LandingPage from "./../pages/LandingPage/LandingPage";
import Error404 from "./../pages/ErrorPage/Error404";
import LoginPage from "./../pages/AuthPage/LoginPage";
import RegisterPage from "./../pages/AuthPage/RegisterPage";

function Routes() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            {isLoggedIn ? <AppPage /> : <LandingPage />}
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/register">
            <RegisterPage />
          </Route>
          <Route path="/*">
            <Error404 />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default Routes;