import React, { useState, useEffect, useRef } from "react";
import "./Pomodoro.scss";
import { useInterval } from "./hooks/useInterval";

import TimeSet from "./components/TimeSet";
import Timer from "./components/Timer";
import Controls from "./components/Controls";

import alarm from "./sounds/alarm.mp3";

const Pomodoro = ({ isSidebarOpen }) => {
  const [breakVal, setBreakVal] = useState(5);
  const [sessionVal, setSessionVal] = useState(25);
  const [mode, setMode] = useState("session");
  const [time, setTime] = useState(sessionVal * 60 * 1000);
  const [active, setActive] = useState(false);
  const beep = useRef();

  useInterval(() => setTime(time - 1000), active ? 1000 : null);

  useEffect(() => {
    setTime(sessionVal * 60 * 1000);
  }, [sessionVal]);

  useEffect(() => {
    if (time === 0 && mode === "session") {
      beep.current.play();
      setMode("break");
      setTime(breakVal * 60 * 1000);
    } else if (time === 0 && mode === "break") {
      beep.current.play();
      setMode("session");
      setTime(sessionVal * 60 * 1000);
    }
  }, [time, breakVal, sessionVal, mode]);

  const handleReset = () => {
    beep.current.pause();
    beep.current.currentTime = 0;
    setActive(false);
    setMode("session");
    setBreakVal(5);
    setSessionVal(25);
    setTime(25 * 60 * 1000);
  };

  return (
    <div className={isSidebarOpen ? "main" : "mainSideClosed"}>
      <div className="container">
        <div className="time-wrapper">
          <Timer currentMode={[mode, setMode]} currentTime={[time, setTime]} />
          <Controls
            activeStatus={[active, setActive]}
            handleReset={handleReset}
          />
        </div>
        <div className="timeset-wrapper">
          <TimeSet type={"Session"} value={[sessionVal, setSessionVal]} />
          <TimeSet type={"Break"} value={[breakVal, setBreakVal]} />
        </div>

        <audio id="beep" src={alarm} ref={beep} />
      </div>
    </div>
  );
};

export default Pomodoro;
