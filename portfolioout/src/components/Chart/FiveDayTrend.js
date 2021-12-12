import React from "react";
import Chart from "react-google-charts";

const FiveDayTrend = (props) => {
  const chartData = props.data;
  return (
    <Chart
      width={"100%"}
      height={"100%"}
      chartType="LineChart"
      loader={<div>Loading Chart</div>}
      data={chartData}
      options={{
        legend: { position: "top" },
        hAxis: {
          title: "Date",
        },
        vAxis: {
          title: "USD",
        },
      }}
    />
  );
};

export default FiveDayTrend;
