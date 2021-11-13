import React, { Fragment, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout, Breadcrumb, Row, Col } from "antd";

import Navigation from "./components/Navigation/Navigation";
import Home from "./pages/Home";
import "./App.css";

const App = () => {
  const { Header, Content, Footer, Sider } = Layout;

  const [collapsed, setCollapsed] = useState(false);

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
              {/* <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item>
              </Breadcrumb>
              <div style={{ padding: 24, minHeight: 360 }}>Bill is a cat.</div> */}
            </Content>
            <Footer style={{ textAlign: "center" }}>Portfolioout ©2021</Footer>
          </Layout>
        </Layout>

        {/* <Row>
          <Col>
            <Navigation />
          </Col>
          <Col>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/portfolio" element={<Home />} />
            </Routes>
          </Col>
        </Row> */}
      </div>
    </Router>
  );
};

export default App;
