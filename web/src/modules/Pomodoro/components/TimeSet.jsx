import React from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const TimeSet = ({ type, value }) => {
  const [val, setVal] = value;
  const handleIncrement = () => {
    if (val >= 60) {
      return null;
    } else {
      setVal(val + 1);
    }
  };
  const handleDecrement = () => {
    if (val === 1) {
      return null;
    } else {
      setVal(val - 1);
    }
  };
  return (
    <div class="control">
      <h2 id={`${type.toLowerCase()}-label`}>{type} Length</h2>
      <button id={`${type.toLowerCase()}-increment`} onClick={handleIncrement}>
        <FaPlus />{" "}
      </button>
      <h3 id={`${type.toLowerCase()}-length`}>{val}</h3>
      <button id={`${type.toLowerCase()}-decrement`} onClick={handleDecrement}>
        <FaMinus />{" "}
      </button>
    </div>
  );
};

export default TimeSet;
