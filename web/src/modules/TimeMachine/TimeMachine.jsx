import React, { useEffect, useState } from "react";
import Uploader from "./Uploader";

import "./TimeMachine.scss";

function TimeMachine() {
  const [file, setFile] = useState(false);
  const [date, setDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  function initiateDate() {
    let date = new Date();
    setDate(date);
  }
  function nextDay() {
    let nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    setDate(nextDay);
  }
  function previousDay() {
    let previousDay = new Date(date);
    previousDay.setDate(previousDay.getDate() - 1);
    setDate(previousDay);
  }

  useEffect(() => {
    initiateDate();
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <>
      <div className="timeMachine">
        Time Machine
        {!file ? <Uploader /> : null}
        <div className="dateController">
          <button
            onClick={() => {
              previousDay();
            }}
          >
            &lt;
          </button>
          <span>
            {date.getDate()}/{date.getMonth()}/{date.getFullYear()}{" "}
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