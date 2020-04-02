import React, { useState, useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";

import "./Ad.scss";

function Ad() {
  let { adId } = useParams();
  const [ad, setAd] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  async function getAd() {
    setIsLoading(false);
    let response = await fetch("/api/store/getAd", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.authToken
      },
      body: JSON.stringify({
        adId: adId
      })
    }).catch(err => {
      alert(err);
    });

    response = await response.json();
    setAd(response);
  }
  useEffect(() => {
    getAd();
  }, []);

  if (isLoading) {
    return <>LOADING...</>;
  }
  return (
    <>
      {error == true ? <Redirect to="/store" /> : null}
      {ad.title}
      <br />
      {ad.description} <br />
      {ad.price} <br />
      {ad.username}
    </>
  );
}

export default Ad;
