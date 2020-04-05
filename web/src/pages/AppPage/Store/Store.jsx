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
  const [search, setSearch] = useState("");

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
        <Switch>
          <Route exact path={path}>
            <div className="shopTitle">Baazar</div>
            <div className="shopNavBtn">
              <Link to={`${path}/add`}>
                <MdAdd />
              </Link>
              <Link to={`${path}/myads`}>
                <MdList />
              </Link>
            </div>
            <div className="adSearcher">
              <input
                id=""
                type="text"
                name="searchAds"
                value={search}
                onChange={e => setSearch(e.target.value)}
                id=""
                placeholder="Search..."
              />
            </div>
            <div className="listings">
              {ads.map(ad => (
                <div key={ad._id} className="listingCard">
                  <img
                    className="listingPicture"
                    src="https://raw.githubusercontent.com/ValentinMitran/Ylgaw/master/Ylgaw.png"
                    alt=""
                  />
                  <div className="listingText">
                    <span className="title">
                      {ad.title
                        .split(" ")
                        .slice(0, 7)
                        .join(" ")}
                    </span>
                    <span className="price">Price: {ad.price}&euro;</span>
                    <span className="seller">
                      Sold by:{" "}
                      <Link to={`/u/${ad.username}`}>{ad.username}</Link>
                    </span>
                    <Link id="viewAdButton" to={`${url}/ad/${ad._id}`}>
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Route>
          <Route path={`${path}/add`}>
            <div className="shopTitle">Ad posting</div>
            <div className="shopNavBtn">
              <Link to={`${url}`}>
                <MdKeyboardReturn />
              </Link>
            </div>
            <NewAd />
          </Route>
          <Route path={`${path}/myads`}>
            <div className="shopTitle">My Ads</div>
            <div className="shopNavBtn">
              <Link to={`${url}`}>
                <MdKeyboardReturn />
              </Link>
            </div>
            <MyAds />
          </Route>
          <Route path={`${path}/ad/:adId`}>
          <div className="shopTitle">Ad Viewer</div>
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
