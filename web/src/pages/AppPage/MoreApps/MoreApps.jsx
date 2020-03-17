import React from "react";
import {Link } from "react-router-dom";
import "./MoreApps.scss";
import { MdAccountBalance } from "react-icons/md";

function MoreApps() {
  return (
    <>
      <div className="moreApps">
        <Link to="/m1">
          <div className="appBox">
            <MdAccountBalance />
            <span>M1</span>
          </div>
        </Link>

        <Link to="">
          <div className="appBox">
            <MdAccountBalance />
            <span>M2</span>
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