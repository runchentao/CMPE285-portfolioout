import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Switch } from "antd";
import Item from "antd/lib/list/Item";

import {
  SettingOutlined,
  BankOutlined,
  PieChartOutlined,
} from "@ant-design/icons";

import logo from "../../assets/logo/portfolioout-logo-light-small.png";
import "./index.css";

const DARK = 1;
const LIGHT = 0;

const { SubMenu } = Menu;

const Navigation = () => {
  const [darkMode, setDarkMode] = useState(DARK);
  const [current, setCurrent] = useState("My Portfolio");

  const changeTheme = (value) => {
    setDarkMode(value ? DARK : LIGHT);
  };

  const handleClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <>
      <div className={darkMode ? "container darkMode" : "container"}>
        <img className="app-logo" src={logo} alt="" />
        <Menu
          theme={darkMode ? "dark" : "light"}
          onClick={handleClick}
          defaultOpenKeys={["sub1"]}
          defaultSelectedKeys={["1"]}
          selectedKeys={[current]}
          mode="inline"
        >
          <SubMenu key="sub1" icon={<BankOutlined />} title="Dashboard">
            <Menu.Item key="My Portfolio">
              <Link to="/portfolio">My Portfolio</Link>
            </Menu.Item>
            <Menu.Item key="Weekly Summary">Weekly Summary</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<PieChartOutlined />} title="Invest">
            <Menu.Item key="Ethical Investing">Ethical Investing</Menu.Item>
            <Menu.Item key="Growth Investing">Growth Investing</Menu.Item>
            <Menu.Item key="Index Investing">Index Investing</Menu.Item>
            <Menu.Item key="Quality Investing">Quality Investing</Menu.Item>
            <Menu.Item key="Value Investing">Value Investing</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="8">Option 7</Menu.Item>
              <Menu.Item key="9">Option 8</Menu.Item>
            </SubMenu>
          </SubMenu>
          {/* <SubMenu key="sub4" icon={<SettingOutlined />} title="Settings">
              <Item key="9" className="darkModeSwitch">
                Dark Mode
                <Switch
                  style={{ marginLeft: 10 }}
                  checked={darkMode === DARK}
                  onChange={changeTheme}
                />
              </Item>
            </SubMenu> */}
        </Menu>

        {/* <img className="logo" src={logo} alt="" /> */}
      </div>
    </>
  );
};

export default Navigation;
