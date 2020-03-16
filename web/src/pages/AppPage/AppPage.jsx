import React from "react";
import { Route, Switch, Redirect, Link } from "react-router-dom";
import CoreNav from "../../components/AppPage/CoreNav/CoreNav";
import TopNav from "../../components/AppPage/TopNav/TopNav";
import Error404 from "./../ErrorPage/Error404";
import "./AppPage.scss";
import { MdAccountBalance } from "react-icons/md";

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
            <div className="moreApps">

              <Link to="">
                <div className="appBox">
                  <MdAccountBalance />
                  <span>M1</span>
                </div>
              </Link>

              <Link to="">
                <div className="appBox">
                  <MdAccountBalance />
                  <span>M2</span>
                </div>
              </Link>

              <Link to="">
                <div className="appBox">
                  <MdAccountBalance />
                  <span>M3</span>
                </div>
              </Link>

              <Link to="">
                <div className="appBox">
                  <MdAccountBalance />
                  <span>M4</span>
                </div>
              </Link>

              <Link to="">
                <div className="appBox">
                  <MdAccountBalance />
                  <span>M5</span>
                </div>
              </Link>

              <Link to="">
                <div className="appBox">
                  <MdAccountBalance />
                  <span>M6</span>
                </div>
              </Link>

          </div>
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