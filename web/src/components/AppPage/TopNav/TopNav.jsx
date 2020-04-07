import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdClose, MdMenu, MdNotifications } from "react-icons/md";
import { FaMinus, FaPlus } from "react-icons/fa";
import { BalanceContext } from "../../../utils/BalanceContext";

import "./TopNav.scss";
const jwt = require("jsonwebtoken");
function TopNav(props) {
  const [balance] = useContext(BalanceContext);
  const [decodedjwt] = useState(jwt.decode(localStorage.authToken));
  const [pfp, setPfp] = useState("");

  useEffect(() => {
    async function getPfp() {
      let response = await fetch("/api/profile/pfp", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          authToken: localStorage.authToken,
        },
      });
      response = await response.text();
      setPfp(response);
    }

    getPfp();
  }, []);
  return (
    <>
      <div className="topbar">
        <div className="menuNBrand">
          {props.isSidebarOpen ? (
            <MdClose onClick={() => props.setIsSidebarOpen(false)} />
          ) : (
            <MdMenu onClick={() => props.setIsSidebarOpen(true)} />
          )}
          <img src="https://i.imgur.com/JD1htQS.png" alt="Ylgaw" />
        </div>

        <div className="userArea">
          <div className="dropdown">
            <button className="dropwalletbtn">{balance}&euro;</button>
            <div className="dropdown-content">
              <Link to={`/wallet`}>
                <FaPlus /> Deposit
              </Link>
              <Link to={`/wallet`}>
                <FaMinus />
                Withdraw
              </Link>
            </div>
          </div>

          <MdNotifications />

          <div className="dropdown">
            <button className="dropbtn">
              {!pfp ? (
                <img
                  src="https://www.awesomecreative.co.uk/wp-content/uploads/2018/07/placeholder-profile.jpg"
                  alt="Profile"
                />
              ) : (
                <img src={`data:image/png;base64,${pfp}`} alt="Profile" />
              )}
            </button>
            <div className="dropdown-content">
              <Link to={`/u/${decodedjwt.username}`}>Profile</Link>
              <Link to={`/settings`}>Settings</Link>
              <Link to={`/logout`}>Logout</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TopNav;
