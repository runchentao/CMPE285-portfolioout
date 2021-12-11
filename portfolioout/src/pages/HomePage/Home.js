import React from "react";
import { Row, Col } from "antd";
import useApi from "../../apiHooks/useApi";
import Spinner from "../../components/Spin/Spinner";
import SuggestStockForm from "../../components/SuggestStockForm/SuggestStockForm";

import "./index.css";

const Home = () => {
  //const { loading, data } = useApi("/suggest/5/5000");

  //if (loading) return <Spinner />;
  return (
    <div className="content">
      <h1 className="title">
        Start building your first stock portfolio from here
      </h1>
      {/* <Row>
        <Col xs={2} sm={4} md={2} lg={2} xl={2}></Col>
        <Col xs={20} sm={16} md={20} lg={20} xl={20}>
         
        </Col>
        <Col xs={2} sm={4} md={2} lg={2} xl={2}></Col>
      </Row> */}

      <div className="body">
        <SuggestStockForm />
      </div>
      {/* <p>{JSON.stringify(data)}</p> */}
    </div>
  );
};

export default Home;
