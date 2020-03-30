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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  function decodejwt() {
    const decodedjwt = jwt.decode(localStorage.authToken);
    setDecodedjwt(decodedjwt);
  }

  useEffect(() => {
    decodejwt();
  }, []);
  return (
    <>
      <TopNav
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      {isSidebarOpen ? <SideNav /> : null}
      <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/home">
          <div className={isSidebarOpen ? "main" : "mainSideClosed"}>
            HOME PAGE
          </div>
        </Route>
        <Route path="/search">
          <div className={isSidebarOpen ? "main" : "mainSideClosed"}>
            SEARCH
          </div>
        </Route>
        <Route path="/notifications">
          <div className={isSidebarOpen ? "main" : "mainSideClosed"}>
            NOTIFICATIONS
          </div>
        </Route>

        <Route path="/profile">
          <Redirect to={`/u/${decodedjwt}`} />
        </Route>
        <Route path="/u/:username">
          <Profile isSidebarOpen={isSidebarOpen} />
        </Route>
        <Route path="/wallet">
          <Wallet isSidebarOpen={isSidebarOpen} />
        </Route>

        <Route path="/apps">
          <Apps isSidebarOpen={isSidebarOpen} />
        </Route>
        {/* MODULES */}
        <Route path="/todo">
          <ToDo isSidebarOpen={isSidebarOpen} />
        </Route>
        <Route path="/napchart">
          <NapChart isSidebarOpen={isSidebarOpen} />
        </Route>
        <Route path="/timemachine">
          <TimeMachine isSidebarOpen={isSidebarOpen} />
        </Route>
        <Route path="/pomodoro">
          <Pomodoro isSidebarOpen={isSidebarOpen} />
        </Route>

        <Route path="*">
          <Error404 />
        </Route>
      </Switch>
    </>
  );
}

export default AppPage;
