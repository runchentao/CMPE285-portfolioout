import React, { Fragment, useState } from "react";
import { Menu, Switch } from "antd";

import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import logo from "../../assets/logo/portfolioout-logo-light-small.png";

import "./index.css";

const DARK = 1;
const LIGHT = 0;

const { SubMenu } = Menu;

const Navigation = () => {
  const [darkMode, setDarkMode] = useState(DARK);
  const [current, setCurrent] = useState();

  const changeTheme = (value) => {
    setDarkMode(value ? DARK : LIGHT);
  };

  const handleClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <div className={darkMode ? "container darkMode" : "container"}>
      <Menu
        theme={darkMode ? "dark" : "light"}
        onClick={handleClick}
        style={{ width: 256 }}
        defaultOpenKeys={["sub1"]}
        selectedKeys={[current]}
        mode="inline"
      >
        <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
          <Menu.Item key="1">Option 1</Menu.Item>
          <Menu.Item key="2">Option 2</Menu.Item>
          <Menu.Item key="3">Option 3</Menu.Item>
          <Menu.Item key="4">Option 4</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
        </SubMenu>
        <SubMenu key="sub4" icon={<SettingOutlined />} title="Dark Mode">
          <Switch
            checked={darkMode === DARK}
            onChange={changeTheme}
            checkedChildren={"Dark Mode"}
            unCheckedChildren={"Dark Mode"}
          />
        </SubMenu>
        <div className="logoContainer">
          <img className="logo" src={logo} alt="" />
        </div>
      </Menu>
    </div>
  );
};

export default Navigation;
