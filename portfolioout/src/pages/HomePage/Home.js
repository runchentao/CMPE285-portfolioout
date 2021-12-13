import React, { useState } from "react";
import useApi from "../../apiHooks/useApi";
import Spinner from "../../components/Spin/Spinner";
import SuggestStockForm from "../../components/SuggestStockForm/SuggestStockForm";
import FiveDayTrend from "../../components/Chart/FiveDayTrend";
import StackingChart from "../../components/ChartStocks/StackingChart";
import PieChart from "../../components/PieChart/PieChart";

import "./index.css";
import { Button } from "antd";

const Home = () => {
  const { loading, pieData, chartData, portfolioData, fetchApi } = useApi();
  const [toggle, setToggle] = useState(false);
  const [req, setReq] = useState([]);
  const [initialInvestment, setInitialInvestment] = useState();
  const stratMap = {
    1: "Ethical Investing",
    2: "Growth Investing",
    3: "Index Investing",
    4: "Quality Investing",
    5: "Value Investing",
  };

  const onSubmit = (e) => {
    setReq(e.strategy);
    setInitialInvestment(e.investment);
  };

  const showStrat = (strat) => {
    setToggle(true);
    fetchApi(
      "/suggest/" + strat + "/" + (initialInvestment / req.length).toFixed()
    );
  };

  return (
    <div className="content">
      <h1 className="title">
        Start building your first stock portfolio from here
      </h1>
      <div className="body">
        <SuggestStockForm onSubmit={(e) => onSubmit(e)} />
        {req.length > 0 ? (
          <div style={{ marginBottom: "40px" }}>
            <h3>View your selected investment strategy</h3>
            {req.map((item) => (
              <Button
                style={{ marginLeft: "20px" }}
                key={item}
                onClick={() => showStrat(item)}
              >
                {stratMap[item]}
              </Button>
            ))}
          </div>
        ) : null}

        {toggle ? (
          loading ? (
            <Spinner />
          ) : (
            <div>
              <h3>Here is your weekly portfolio summary</h3>
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
