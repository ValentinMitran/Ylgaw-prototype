import React, { useState, useEffect } from "react";
import { FaPause, FaPlay, FaPlus, FaMinus } from "react-icons/fa";
import { GiBackwardTime } from "react-icons/gi";
import "./Pomodoro.scss";

function Pomodoro() {
  const [timer, setTimer] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [isActive, setIsActive] = useState(false);

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setIsActive(false);
  }

  useEffect(() => {}, []);
  return (
    <>
      <div className="main pomodoro">
        <div className="timer">
          <p>Session</p>
          <span>{timer}</span>
          <div className="controllers">
            {isActive ? (
              <FaPause onClick={() => toggle()} />
            ) : (
              <FaPlay onClick={() => toggle()} />
            )}
            <GiBackwardTime />
          </div>{" "}
        </div>
        <div className="settings">
          <div className="session">
            <p>Session</p>
            <span>{timer}</span>
            <div className="controllers">
              <FaPlus onClick={() => setTimer(timer + 1)} />
              <FaMinus onClick={() => setTimer(timer - 1)} />
            </div>
          </div>
          <div className="break ">
            <p>Break</p>
            <span>{breakTime}</span>{" "}
            <div className="controllers">
              <FaPlus onClick={() => setBreakTime(breakTime + 1)} />
              <FaMinus onClick={() => setBreakTime(breakTime - 1)} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Pomodoro;
