import React from "react";
import { FaPause, FaPlay, FaRedo } from "react-icons/fa";

const Controls = ({ activeStatus, handleReset }) => {
  const [active, setActive] = activeStatus;
  return (
    <div className="controls-wrapper">
      <button id="start_stop" onClick={() => setActive(!active)}>
        {active ? (
          <span>
            <FaPause />
          </span>
        ) : (
          <span>
            <FaPlay />
          </span>
        )}
      </button>
      <button id="reset" onClick={handleReset}>
        <FaRedo />
      </button>
    </div>
  );
};

export default Controls;
