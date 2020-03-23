import React, { useEffect, useState } from "react";
import Uploader from "./controllers/Uploader/Uploader";
import Remover from "./controllers/Remover/Remover";
import "./TimeMachine.scss";
import ActionContext from "./ActionContext";
import Notes from "./Notes";
const jwt = require("jsonwebtoken");

function TimeMachine() {
  const [date, setDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [src, setSrc] = useState("");
  const [note, setNote] = useState({});
  const [action, setAction] = useState(false);
  const [username, setUsername] = useState("");
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
    const decodedjwt = jwt.decode(localStorage.authToken);
    setUsername(decodedjwt.username);
    let response = await fetch("/api/timeMachine/get", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.authToken
      },
      body: JSON.stringify({
        date: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear()
      })
    }).catch(err => {
      alert(err);
    });
    response = await response.json();
    response.img64 === "false" ? setSrc(false) : setSrc(response.img64);
    response.note
      ? setNote(response.note)
      : setNote({ text: "No notes left..." });
    setIsLoading(false);
  }

  useEffect(() => {
    initiateDate();
  }, [action]);

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
      <div className="main">
        <div className="timeMachine">
          <h4>Time Machine</h4>
          {!src ? (
            <div className="placer">
              <h4>EMPTY</h4>
            </div>
          ) : (
            <img src={`data:image/png;base64,${src}`} alt="" />
          )}
          <ActionContext.Provider value={[action, setAction]}>
            {!src ? (
              <Uploader
                date={date.getDate()}
                month={date.getMonth() + 1}
                year={date.getFullYear()}
                username={username}
              />
            ) : (
              <Remover
                date={date.getDate()}
                month={date.getMonth() + 1}
                year={date.getFullYear()}
              />
            )}
          </ActionContext.Provider>

          <Notes
            text={note.text}
            date={
              date.getDate().toString() +
              (date.getMonth() + 1).toString() +
              date.getFullYear().toString()
            }
          />
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
      </div>
    </>
  );
}

export default TimeMachine;