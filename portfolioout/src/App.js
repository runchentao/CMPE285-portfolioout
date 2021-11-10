import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";

import logo from "./logo.svg";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Fragment>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Fragment>
    </Router>
  );
};

export default App;
