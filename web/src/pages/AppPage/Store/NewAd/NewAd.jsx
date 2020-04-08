import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import "./NewAd.scss";
import { toast } from "react-toastify";
import { TextField, Button } from "@material-ui/core";

function NewAd({ history }) {
  const [adTitle, setAdTitle] = useState("");
  const [adDescription, setAdDescription] = useState("");
  const [price, setPrice] = useState("");

  const notify = () => toast.success("Ad posted successfully!");
  const submitForm = async (e) => {
    e.preventDefault();
    let response = await fetch("/api/store/ads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.authToken,
      },
      body: JSON.stringify({
        title: adTitle,
        description: adDescription,
        price: price,
      }),
    }).catch((err) => {
      alert(err);
    });
    response = await response.text();
    if (response === "Success") {
      notify();
      history.push(`myads`);
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="newAd">
      <form className="adForm" onSubmit={submitForm}>
        <TextField
          id="standard-basic"
          label="Ad Title"
          placeholder="Ad Title"
          variant="outlined"
          value={adTitle}
          onChange={(e) => setAdTitle(e.target.value)}
          style={{ marginBottom: "20px" }}
        />

        <TextField
          id="outlined-textarea"
          label="Ad Description"
          placeholder="Ad Description"
          multiline
          variant="outlined"
          value={adDescription}
          onChange={(e) => setAdDescription(e.target.value)}
          style={{ marginBottom: "20px" }}
        />
        <TextField
          id="outlined-number"
          label="Number"
          type="number"
          inputProps={{ min: "1", max: "999" }}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{ marginBottom: "20px" }}
        />
        <Button variant="contained" color="primary" type="submit">
          Primary
        </Button>
      </form>
    </div>
  );
}

export default withRouter(NewAd);