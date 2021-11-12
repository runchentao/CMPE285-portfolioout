import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Row, Col } from "antd";

import Navigation from "./components/Navigation/Navigation";
import Home from "./pages/Home";

import "./App.css";

const App = () => {
  return (
    <Router>
      <Fragment>
        <Row>
          <Col>
            <Navigation />
          </Col>
          <Col>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </Col>
        </Row>
      </Fragment>
    </Router>
  );
};

export default App;
