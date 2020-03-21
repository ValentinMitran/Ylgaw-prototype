import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdMoreVert, MdSearch, MdMenu, MdKeyboardReturn } from "react-icons/md";
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
          <Link to="/profile">
            <MdMoreVert />
          </Link>
        </div>
      </div>
      <div
        className="sideNav"
        style={isSideOpen ? { display: "block" } : { display: "none" }}
      >
        <div className="header">
          <img
            src="https://images-na.ssl-images-amazon.com/images/M/MV5BOWViYjUzOWMtMzRkZi00MjNkLTk4M2ItMTVkMDg5MzE2ZDYyXkEyXkFqcGdeQXVyODQwNjM3NDA@._V1_UY256_CR36,0,172,256_AL_.jpg"
            alt=""
          />
          <span>@username</span>
          <nav>
            <MdKeyboardReturn onClick={() => setIsSideOpen(false)} />
          </nav>
        </div>
        <nav>
          <Link>ONE</Link>
          <Link>TWO</Link>
          <Link>THREE</Link>
        </nav>
      </div>
      <div
        className="blur"
        style={isSideOpen ? { display: "block" } : { display: "none" }}
        onClick={() => setIsSideOpen(false)}
      ></div>
    </>
  );
}

export default TopNav;