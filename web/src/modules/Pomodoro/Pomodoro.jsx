import React, { useState, useEffect } from "react";
import { FaPause, FaPlay, FaPlus, FaMinus } from "react-icons/fa";
import { GiBackwardTime } from "react-icons/gi";
import "./Pomodoro.scss";

function Pomodoro(props) {
  const [session, setSession] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [minutes, setMinutes] = useState(session);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  function reset() {
    setMinutes(session);
    setSeconds(0);
    setIsActive(false);
  }
  function toggle() {
    setMinutes(session);
    setSeconds(0);
    setIsActive(!isActive);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      let countDownDate = new Date();
      countDownDate.setMinutes(countDownDate.getMinutes() + session);
      countDownDate = countDownDate.getTime();

      interval = setInterval(() => {
        let now = new Date().getTime();
        let distance = countDownDate - now;
        setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
        setSeconds(Math.floor((distance % (1000 * 60)) / 1000));
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, session, seconds]);

  return (
    <>
      <div
        className={
          props.isSidebarOpen ? "main pomodoro" : "mainSideClosed pomodoro"
        }
      >
        <div className="timer">
          <p>Session</p>
          <span>
            {isActive ? (
              <>
                {minutes}:{seconds}
              </>
            ) : (
              session
            )}
          </span>
          <div className="controllers">
            {isActive ? (
              <FaPause onClick={() => toggle()} />
            ) : (
              <FaPlay onClick={() => toggle()} />
            )}
            <GiBackwardTime onClick={() => reset()} />
          </div>{" "}
        </div>
        <div className="settings">
          <div className="session">
            <p>Session</p>
            <span>{session}</span>
            <div className="controllers">
              <FaPlus onClick={() => setSession(session + 1)} />
              <FaMinus onClick={() => setSession(session - 1)} />
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
