import React, { useState, useEffect } from "react";
import { Switch, Route, Link, useRouteMatch, Redirect } from "react-router-dom";
import "./Store.scss";
import NewAd from "./NewAd/NewAd";
import MyAds from "./MyAds/MyAds";
import Ad from "./Ad/Ad";
import { MdAdd, MdList, MdKeyboardReturn } from "react-icons/md";
const jwt = require("jsonwebtoken");

function Store() {
  let { path, url } = useRouteMatch();
  const [ads, setAds] = useState([]);

  async function fetchAds() {
    let response = await fetch("/api/store/ads", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.authToken
      }
    });
    response = await response.json();
    setAds(response);
  }

  useEffect(() => {
    fetchAds();
  }, []);

  return (
    <>
      <div className="shopWrapper">
        <div className="shopTitle">Baazar</div>
        <Switch>
          <Route exact path={path}>
            <div className="shopNavBtn">
              <Link to={`${path}/add`}>
                <MdAdd />
              </Link>
              <Link to={`${path}/myads`}>
                <MdList />
              </Link>
            </div>
<div className="listings">
            {ads.map(ad => (
              <div key={ad._id} className="listingCard">
                <img
                  className="profilePicture"
                  src="https://raw.githubusercontent.com/ValentinMitran/Ylgaw/master/Ylgaw.png"
                  alt=""
                />
                <div className="listingText">
                  <span className="title">{ad.title}</span>
                  <span className="description">
                    {ad.description
                      .split(" ")
                      .slice(0, 5)
                      .join(" ")}
                  </span>
                  <span className="price">Price: {ad.price}</span>
                  <span className="seller">
                    by: <Link to={`/u/${ad.username}`}>{ad.username}</Link>
                  </span>
                  <Link to={`${url}/ad/${ad._id}`}>View</Link>
                </div>
              </div>
            ))}</div>
          </Route>
          <Route path={`${path}/add`}>
            <div className="shopNavBtn">
              <Link to={`${url}`}>
                <MdKeyboardReturn />
              </Link>
            </div>
            <NewAd />
          </Route>
          <Route path={`${path}/myads`}>
            <div className="shopNavBtn">
              <Link to={`${url}`}>
                <MdKeyboardReturn />
              </Link>
            </div>
            <MyAds />
          </Route>
          <Route path={`${path}/ad/:adId`}>
            <div className="shopNavBtn">
              <Link to={`${url}`}>
                <MdKeyboardReturn />
              </Link>
            </div>
            <Ad />
          </Route>
          <Route path={`${path}/*`}>
            <Redirect to={path} />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Store;
