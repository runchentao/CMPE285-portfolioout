import React, { useState } from "react";
import { Button, Spin } from "antd";
import useApi from "../../apiHooks/useApi";
import Spinner from "../../components/Spin/Spinner";
import SuggestStockForm from "../../components/SuggestStockForm/SuggestStockForm";
import FiveDayTrend from "../../components/Chart/FiveDayTrend";

import "./index.css";

const generateChartData = (res) => {
  let data = [];
  return data;
};

const Home = () => {
  const { loading, data, fetchApi } = useApi();
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
      </div>
      <FiveDayTrend data={data} />
      {toggle ? (
        loading ? (
          <Spinner />
        ) : (
          <div>
            <div>{data ? <p>{JSON.stringify(data)}</p> : <p>No data</p>}</div>
          </div>
        )
      ) : null}
    </div>
  );
};

export default Home;
