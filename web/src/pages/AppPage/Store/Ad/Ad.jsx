import React, { useState, useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";

import "./Ad.scss";

function Ad() {
  let { adId } = useParams();
  const [ad, setAd] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getAd() {
      let response = await fetch("/api/store/getAd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authToken: localStorage.authToken,
        },
        body: JSON.stringify({
          adId: adId,
        }),
      }).catch((err) => {
        alert(err);
      });
      if (!response.ok) {
        setError(true);
        setIsLoading(false);
      } else {
        response = await response.json();
        setAd(response);
        setIsLoading(false);
      }
    }
    getAd();
  }, [adId]);

  if (isLoading) {
    return <>LOADING...</>;
  }
  return (
    <>
      {error === true ? <Redirect to="/store" /> : null}
      {ad.title}
      <br />
      {ad.description} <br />
      {ad.price} <br />
      {ad.username}
    </>
  );
}

export default Ad;
