import React from "react";
import Chart from "react-google-charts";

const PieChart = (props) => {
  const chartData = props.data;
  return (
    <Chart
      width={"100%"}
      height={"100%"}
      chartType="PieChart"
      loader={<div>Loading Chart</div>}
      data={chartData}
      options={{
        title: "My Investments (USD)",
      }}
    />
  );
};

export default PieChart;
