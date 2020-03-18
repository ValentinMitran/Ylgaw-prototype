import React from "react";
import {Link } from "react-router-dom";
import "./MoreApps.scss";
import { MdAccountBalance } from "react-icons/md";

function MoreApps() {
  return (
    <>
      <div className="moreApps">
        <Link to="/todo">
          <div className="appBox">
            <MdAccountBalance />
            <span>Todo</span>
          </div>
        </Link>

        <Link to="/timemachine">
          <div className="appBox">
            <MdAccountBalance />
            <span>Time Machine</span>
          </div>
        </Link>

        <Link to="">
          <div className="appBox">
            <MdAccountBalance />
            <span>M3</span>
          </div>
        </Link>

        <Link to="">
          <div className="appBox">
            <MdAccountBalance />
            <span>M4</span>
          </div>
        </Link>

        <Link to="">
          <div className="appBox">
            <MdAccountBalance />
            <span>M5</span>
          </div>
        </Link>

        <Link to="">
          <div className="appBox">
            <MdAccountBalance />
            <span>M6</span>
          </div>
        </Link>
      </div>
    </>
  );
}

export default MoreApps;