import React, { useState, useEffect } from "react";
import useApi from "../../apiHooks/useApi";
import Spinner from "../../components/Spin/Spinner";
import SuggestStockForm from "../../components/SuggestStockForm/SuggestStockForm";
import FiveDayTrend from "../../components/Chart/FiveDayTrend";
import StackingChart from "../../components/ChartStocks/StackingChart";
import PieChart from "../../components/PieChart/PieChart";

import "./index.css";

const Home = () => {
  const { loading, pieData, chartData, portfolioData, fetchApi } = useApi();

  const [toggle, setToggle] = useState(false);

  const onSubmit = (e) => {
    setToggle(true);
    fetchApi("/suggest/" + e.strategy + "/" + e.investment);
  };

  return (
    <div className="content">
      <h1 className="title">
        Start building your first stock portfolio from here
      </h1>
      <div className="body">
        <SuggestStockForm onSubmit={(e) => onSubmit(e)} />

        {toggle ? (
          loading ? (
            <Spinner />
          ) : (
            <div>
              <h2>Here is your weekly portfolio summary</h2>
              <div className="charts">
                <div>
                  <FiveDayTrend data={portfolioData} />
                </div>
                <br />
                <div>
                  <PieChart data={pieData} />
                </div>
                <br />
                <div>
                  <StackingChart data={chartData} />
                </div>
              </div>
            </div>
          )
        ) : null}
      </div>
    </div>
  );
};

export default Home;
