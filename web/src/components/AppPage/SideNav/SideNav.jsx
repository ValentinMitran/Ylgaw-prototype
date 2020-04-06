import React from "react";
import { Link } from "react-router-dom";
import { MdExitToApp, MdApps, MdHome, MdPeople, MdStore } from "react-icons/md";
import "./SideNav.scss";

function SideNav() {
  return (
    <>
      <div className="sidebar">
        <nav>
          <Link to={`/home`}>
            <MdHome />
            <span>Home</span>
          </Link>
          <Link to={`/social`}>
            <MdPeople />
            <span>Social</span>
          </Link>
          <Link to={`/store`}>
            <MdStore />
            <span>Store</span>
          </Link>
          <div id="apps">
            <MdApps />
            <span>Apps</span>
            <div className="apps">
              <Link to={`/todo`}>Todo</Link>
              <Link to={`/napchart`}>Napchart</Link>
              <Link to={`/pomodoro`}>Pomodoro</Link>
              <Link to={`/timemachine`}>Time Machine</Link>
            </div>
          </div>

          <Link id="logout" to={`/logout`}>
            <MdExitToApp />
            <span>Logout</span>
          </Link>
        </nav>
      </div>
    </>
  );
}

export default SideNav;
