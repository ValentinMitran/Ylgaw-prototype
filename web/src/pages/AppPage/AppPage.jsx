import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import TopNav from "../../components/AppPage/TopNav/TopNav";
import SideNav from "../../components/AppPage/SideNav/SideNav";
import Apps from "./Apps/Apps";
import ToDo from "./../../modules/ToDo/ToDo";
import Error404 from "./../ErrorPage/Error404";
import TimeMachine from "./../../modules/TimeMachine/TimeMachine";
import NapChart from "./../../modules/NapChart/NapChart";
import Profile from "./Profile/Profile";
import Wallet from "./Wallet/Wallet";
import Pomodoro from "./../../modules/Pomodoro/Pomodoro";
import "./AppPage.scss";
const jwt = require("jsonwebtoken");
function AppPage() {
  const [decodedjwt, setDecodedjwt] = useState([]);

  function decodejwt() {
    const decodedjwt = jwt.decode(localStorage.authToken);
    setDecodedjwt(decodedjwt);
  }

  useEffect(() => {
    decodejwt();
  }, []);
  return (
    <>
      <TopNav />
      <SideNav />
      <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/home">
          <div className="main">HOME PAGE</div>
        </Route>
        <Route path="/search">
          <div className="main">SEARCH</div>
        </Route>
        <Route path="/notifications">
          <div className="main">NOTIFICATIONS</div>
        </Route>

        <Route path="/profile">
          <Redirect to={`/u/${decodedjwt}`} />
        </Route>
        <Route path="/u/:username">
          <Profile />
        </Route>
        <Route path="/wallet">
          <Wallet />
        </Route>

        <Route path="/apps">
          <Apps />
        </Route>
        {/* MODULES */}
        <Route path="/todo">
          <ToDo />
        </Route>
        <Route path="/napchart">
          <NapChart />
        </Route>
        <Route path="/timemachine">
          <TimeMachine />
        </Route>
        <Route path="/pomodoro">
          <Pomodoro />
        </Route>

        <Route path="*">
          <Error404 />
        </Route>
      </Switch>
    </>
  );
}

export default AppPage;
