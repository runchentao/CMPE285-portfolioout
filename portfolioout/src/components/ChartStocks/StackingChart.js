import React from "react";
import Chart from "react-google-charts";

const StackingChart = (props) => {
  const chartData = props.data;
  return (
    <Chart
      width={"100%"}
      height={"100%"}
      chartType="AreaChart"
      loader={<div>Loading Chart</div>}
      data={chartData}
      options={{
        isStacked: true,
        height: 300,
        hAxis: { title: "Date" },
        chartArea: { width: "60%", height: "70%" },
        vAxis: { title: "Daily Gain/Loss in %", minValue: 0 },
      }}
    />
  );
};

export default StackingChart;
