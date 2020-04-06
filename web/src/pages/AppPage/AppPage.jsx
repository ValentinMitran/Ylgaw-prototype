import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import TopNav from "../../components/AppPage/TopNav/TopNav";
import SideNav from "../../components/AppPage/SideNav/SideNav";
import Social from "./Social/Social";
import Store from "./Store/Store";
import Apps from "./Apps/Apps";
import ToDo from "./../../modules/ToDo/ToDo";
import Error404 from "./../ErrorPage/Error404";
import TimeMachine from "./../../modules/TimeMachine/TimeMachine";
import NapChart from "./../../modules/NapChart/NapChart";
import Profile from "./Profile/Profile";
import Wallet from "./Wallet/Wallet";
import Pomodoro from "./../../modules/Pomodoro/Pomodoro";
import Settings from "./Settings/Settings";
import "./AppPage.scss";
import { useMediaQuery } from "react-responsive";
import Dashboard from "./Dashboard/Dashboard";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const jwt = require("jsonwebtoken");
toast.configure();
function AppPage() {
  const [decodedjwt] = useState(jwt.decode(localStorage.authToken));
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [isMobile]);
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
            <Dashboard />
          </div>
        </Route>
        <Route path="/social">
          <div className={isSidebarOpen ? "main" : "mainSideClosed"}>
            <Social />
          </div>
        </Route>
        <Route path="/store">
          <div className={isSidebarOpen ? "main" : "mainSideClosed"}>
            <Store />
          </div>
        </Route>
        <Route path="/search">
          <div className={isSidebarOpen ? "main" : "mainSideClosed"}>
            SEARCH
          </div>
        </Route>
        <Route path="/settings">
          <div className={isSidebarOpen ? "main" : "mainSideClosed"}>
            <Settings />
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
