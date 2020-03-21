import React from "react";
import { Link } from "react-router-dom";
import { MdExitToApp, MdHome, MdPeople, MdStore } from "react-icons/md";
import "./SideNav.scss";

function SideNav() {
  return (
    <>
      <div className="sidebar">
        <nav>
          <Link to={`/home`}>
            <MdHome />
            <span>Feed</span>
          </Link>
          <Link to={`/home`}>
            <MdPeople />
            <span>Social</span>
          </Link>
          <Link to={`/home`}>
            <MdStore />
            <span>Shop</span>
          </Link>
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