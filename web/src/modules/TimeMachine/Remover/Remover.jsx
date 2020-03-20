import React, { useState, useEffect } from "react";
import "./Remover.scss";

function Remover(props) {
  async function removeImg() {
    let response = await fetch("/api/timeMachine/remove", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.authToken
      },
      body: JSON.stringify({
        date: props.date,
        month: props.month,
        year: props.year
      })
    }).catch(err => {
      alert(err);
    });
    response = await response.text();
    alert(response);
  }

  useEffect(() => {}, []);
  return (
    <>
      <div className="remover">
        <button onClick={() => removeImg()}>Remover</button>
      </div>
    </>
  );
}

export default Remover;