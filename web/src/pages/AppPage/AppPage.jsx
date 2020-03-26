import React from "react";
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

import "./AppPage.scss";

function AppPage() {
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

        <Route path="*">
          <Error404 />
        </Route>
      </Switch>
    </>
  );
}

export default AppPage;