import React from "react";
import { Route, Switch, Link,Redirect } from "react-router-dom";
import Error404 from "./../ErrorPage/Error404";
import "./AppPage.scss";
import { MdHome, MdPerson, MdSearch } from "react-icons/md";
import { FiPlusSquare } from "react-icons/fi";
import { IoMdHeartEmpty } from "react-icons/io";

function AppPage() {
  return (
    <>
      <nav className="coreNav">
        <Link to="/home"><MdHome /></Link>
        <Link to="/search"><MdSearch /></Link>
        <Link to="/apps"><FiPlusSquare /></Link>
        <Link to="/notifications"><IoMdHeartEmpty /></Link>
        <Link to="/profile"><MdPerson /></Link>
      </nav>

      <Switch>
        <Route exact path="/"><Redirect to="/home"/></Route>
        <Route path="/home">HOME PAGE</Route>
        <Route path="/search">SEARCH</Route>
        <Route path="/apps">MORE APPS</Route>
        <Route path="/notifications">NOTIFICATIONS </Route>
        <Route path="/profile">PROFILE</Route>
        <Route path="*">
          <Error404 />
        </Route>
      </Switch>
    </>
  );
}

export default AppPage;
