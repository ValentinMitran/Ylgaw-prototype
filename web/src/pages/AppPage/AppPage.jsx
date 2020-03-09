import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import Error404 from "./../ErrorPage/Error404";
import './AppPage.css';
import {MdHome,MdPerson,MdSearch} from 'react-icons/md';
import {FiPlusSquare} from 'react-icons/fi';
import {IoMdHeartEmpty} from 'react-icons/io';

function AppPage() {
  return (
    <>
      <nav className="coreNav">
        <Link to="/u"> <MdHome/></Link>
        <Link to="/u"> <MdSearch/></Link>
        <Link to="/u"> <FiPlusSquare/></Link>
        <Link to="/u"> <IoMdHeartEmpty/></Link>
        <Link to="/u"> <MdPerson/></Link>
      </nav>

      <Switch>
        <Route exact path="/">

          FIRST PAGE
    

        </Route>
        <Route path="/u">user module</Route>
        <Route path="*">
          <Error404 />
        </Route>
      </Switch>
    </>
  );
}

export default AppPage;
