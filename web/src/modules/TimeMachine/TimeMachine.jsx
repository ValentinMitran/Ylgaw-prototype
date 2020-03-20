import React, { useEffect, useState } from "react";
import Uploader from "./Uploader";
import Remover from "./Remover/Remover";

import "./TimeMachine.scss";

function TimeMachine() {
  const [date, setDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [src, setSrc] = useState("");

  function initiateDate() {
    let date = new Date();
    setDate(date);
    getPicture(date);
  }

  function nextDay() {
    let nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    setDate(nextDay);
    getPicture(nextDay);
  }
  function previousDay() {
    let previousDay = new Date(date);
    previousDay.setDate(previousDay.getDate() - 1);
    setDate(previousDay);
    getPicture(previousDay);
  }
  async function getPicture(date) {
    setIsLoading(true);
    let response = await fetch("/api/timeMachine/get", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.authToken
      },
      body: JSON.stringify({
        date: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear()
      })
    }).catch(err => {
      alert(err);
    });
    response = await response.text();
    response == "false" ? setSrc(false) : setSrc(response);
    setIsLoading(false);
  }

  useEffect(() => {
    initiateDate();
  }, []);

  if (isLoading) {
    return (
      <>
        <div className="timeMachine">
          <h4>Time Machine</h4>
          Loading...
        </div>
      </>
    );
  }

  return (
    <>
      <div className="timeMachine">
        <h4>Time Machine</h4>
        {!src ? null : <img src={src} alt="" />}

        {!src ? (
          <Uploader
            date={date.getDate()}
            month={date.getMonth() + 1}
            year={date.getFullYear()}
          />
        ) : (
          <Remover date={date.getDate()}
          month={date.getMonth() + 1}
          year={date.getFullYear()} />
        )}
        <div className="dateController">
          <button
            onClick={() => {
              previousDay();
            }}
          >
            &lt;
          </button>
          <span>
            {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}{" "}
          </span>
          <button
            onClick={() => {
              nextDay();
            }}
          >
            &gt;
          </button>
        </div>
      </div>
    </>
  );
}

export default TimeMachine;