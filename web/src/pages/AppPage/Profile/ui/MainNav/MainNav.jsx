import React from "react";
import { Link } from "react-router-dom";
import "./MainNav.scss";
function MainNav({ url }) {
  return (
    <>
      <div className="mainNav">
        <nav>
          <Link to={`${url}/feed`}>Feed</Link>
          <Link to={`${url}/shop`}>Shop</Link>
          <Link to={`${url}/stats`}>Stats</Link>
        </nav>
      </div>
    </>
  );
}

export default MainNav;
