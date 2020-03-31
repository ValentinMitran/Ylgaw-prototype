import React, { useEffect, useState } from "react";
import "./MyAds.scss";
const jwt = require("jsonwebtoken");

function MyAds() {
  const [myAds, setMyAds] = useState([]);

  async function fetchPosts() {
    let response = await fetch("/api/store/myads", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.authToken
      }
    }).catch(err => {
      alert(err);
    });
    response = await response.json();
    setMyAds(response);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <div>MyAds</div>
      {myAds.map(myAd => (
        <div key={myAd._id}>
          {myAd.title} | {myAd.description} | {myAd.price}&euro;
          <br />
        </div>
      ))}
    </div>
  );
}

export default MyAds;
