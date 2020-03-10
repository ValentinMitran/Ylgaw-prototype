import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import CoreNav from "../../components/AppPage/CoreNav/CoreNav";
import TopNav from "../../components/AppPage/TopNav/TopNav";
import Error404 from "./../ErrorPage/Error404";
import "./AppPage.scss";

function AppPage() {
  return (
    <>
      <TopNav />

      <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/home">
          <div className="main">
            HOME PAGE
            <CoreNav />
          </div>
        </Route>
        <Route path="/search">
          <div className="main">SEARCH</div>
          <CoreNav />
        </Route>
        <Route path="/apps">
          <div className="main">MORE APPS</div>
          <CoreNav />
        </Route>
        <Route path="/notifications">
          <div className="main">NOTIFICATIONS</div>
          <CoreNav />
        </Route>
        <Route path="/profile">
          <div className="main">PROFILE</div>
          <CoreNav />
        </Route>
        <Route path="*">
          <Error404 />
        </Route>
      </Switch>
    </>
  );
}

export default AppPage;