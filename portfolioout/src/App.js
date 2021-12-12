import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "antd";

import Navigation from "./components/Navigation/Navigation";
import Home from "./pages/HomePage/Home";
import "./App.css";

const App = () => {
  const { Header, Content, Footer, Sider } = Layout;

  const [collapsed, setCollapsed] = useState(true);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  return (
    <Router>
      <div>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <Navigation />
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }} />
            <Content style={{ margin: "0 16px" }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/portfolio" element={<Home />} />
              </Routes>
            </Content>
            <Footer style={{ textAlign: "center" }}>Portfolioout ©2021</Footer>
          </Layout>
        </Layout>
      </div>
    </Router>
  );
};

export default App;
