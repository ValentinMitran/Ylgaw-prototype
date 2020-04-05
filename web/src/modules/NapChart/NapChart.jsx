import React from "react";
import "./NapChart.scss";

function NapChart(props) {
  return (
    <>
      <div className={props.isSidebarOpen ? "main" : "mainSideClosed"}>
        NapChart
      </div>
    </>
  );
}

export default NapChart;
