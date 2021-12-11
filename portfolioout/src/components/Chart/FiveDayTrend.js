import React from "react";
import Chart from "react-google-charts";

const FiveDayTrend = (props) => {
  return (
    <Chart
      width={"500px"}
      height={"300px"}
      chartType="AreaChart"
      loader={<div>Loading Chart</div>}
      data={[
        ["Date", "Sales", "Expenses"],
        ["5d", 1000, 400],
        ["4d", 1170, 460],
        ["3d", 660, 1120],
        ["2d", 1030, 540],
        ["1d", 1030, 540],
      ]}
      options={{
        isStacked: true,
        height: 300,
        legend: { position: "top", maxLines: 3 },
        vAxis: { minValue: 0 },
      }}
    />
  );
};

export default FiveDayTrend;
