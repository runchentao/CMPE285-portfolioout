import React, { useState } from "react";
import { Button, Spin } from "antd";
import useApi from "../../apiHooks/useApi";
import Spinner from "../../components/Spin/Spinner";
import SuggestStockForm from "../../components/SuggestStockForm/SuggestStockForm";

import "./index.css";

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
      {toggle ? (
        loading ? (
          <Spinner />
        ) : (
          <div>{data ? <p>{JSON.stringify(data)}</p> : <p>No data</p>}</div>
        )
      ) : null}
    </div>
  );
};

export default Home;
