import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import AppPage from "./../pages/AppPage/AppPage";
import Error404 from "./../pages/ErrorPage/Error404";
import LoginPage from "./../pages/AuthPage/LoginPage";
import RegisterPage from "./../pages/AuthPage/RegisterPage";
import Logout from "./../utils/Logout";

function Routes() {
  return (
    <>
      <Router>
        <Switch>
          <PrivateRoute exact path="/">
            <AppPage />
          </PrivateRoute>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/register">
            <RegisterPage />
          </Route>
          <Route path="/logout">
            <Logout />
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
