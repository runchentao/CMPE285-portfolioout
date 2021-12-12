import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";

import { BankOutlined } from "@ant-design/icons";

import logo from "../../assets/logo/portfolioout-logo-light-small.png";
import "./index.css";

const DARK = 1;

const { SubMenu } = Menu;

const Navigation = () => {
  const [darkMode, setDarkMode] = useState(DARK);
  const [current, setCurrent] = useState("My Portfolio");

  //   const changeTheme = (value) => {
  //     setDarkMode(value ? DARK : LIGHT);
  //   };

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <div className={darkMode ? "container darkMode" : "container"}>
      <img className="app-logo" src={logo} alt="" />
      <Menu
        theme={darkMode ? "dark" : "light"}
        onClick={handleClick}
        defaultSelectedKeys={["1"]}
        selectedKeys={[current]}
        mode="inline"
      >
        <SubMenu key="sub1" icon={<BankOutlined />} title="Dashboard">
          <Menu.Item key="My Portfolio">
            <Link to="/portfolio">My Portfolio</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  );
};

export default Navigation;
