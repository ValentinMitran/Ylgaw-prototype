import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MdMoreVert,
  MdClose,
  MdRefresh,
  MdSearch,
  MdMenu
} from "react-icons/md";
import "./TopNav.scss";

function TopNav() {
  const [isSideOpen, setIsSideOpen] = useState(false);

  return (
    <>
      <div className="topBar">
        <button onClick={() => setIsSideOpen(true)}>
          <MdMenu />
        </button>
        <div className="rightSideTopBar">
          <Link to="/apps">
            <MdSearch />
          </Link>
          <Link to="/notifications">
            <MdRefresh />
          </Link>
          <Link to="/profile">
            <MdMoreVert />
          </Link>
        </div>
      </div>
      <nav
        className="sideNav"
        style={isSideOpen ? { display: "block" } : { display: "none" }}
      >
        <button onClick={() => setIsSideOpen(false)}>
          <MdClose />
        </button>
      </nav>
    </>
  );
}

export default TopNav;