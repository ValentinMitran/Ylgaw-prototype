import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import "./NewAd.scss";
const jwt = require("jsonwebtoken");

function NewAd({ history }) {
  const [adTitle, setAdTitle] = useState("");
  const [adDescription, setAdDescription] = useState("");
  const [price, setPrice] = useState("");

  const submitForm = async e => {
    e.preventDefault();
    let response = await fetch("/api/store/ads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.authToken
      },
      body: JSON.stringify({
        title: adTitle,
        description: adDescription,
        price: price
      })
    }).catch(err => {
      alert(err);
    });
    response = await response.text();
    if (response == "Success") {
      alert(response);
      history.push(`myads`);
    }
  };

  useEffect(() => {}, []);

  return (
    <div>
      <form className="adForm" onSubmit={submitForm}>
        Title:
        <input
          required
          type="text"
          name="adTitle"
          value={adTitle}
          id="adTitle"
          onChange={e => setAdTitle(e.target.value)}
        />
        Description:
        <input
          required
          type="text"
          name="adDescription"
          value={adDescription}
          id="adDescription"
          onChange={e => setAdDescription(e.target.value)}
        />
        Price:
        <input
          required
          min="1"
          type="number"
          name="price"
          value={price}
          pattern="[0-9]"
          id="price"
          onChange={e => setPrice(e.target.value)}
        />
        <button type="submit">Post Ad</button>
      </form>
    </div>
  );
}

export default withRouter(NewAd);
