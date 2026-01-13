import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import './Header.less';

const { Header: AntHeader } = Layout;

const Header = () => {
  const menuItems = [
    {
      key: 'home',
      label: <Link to="/">首页</Link>,
    },
    {
      key: 'schedule',
      label: <Link to="/schedule">赛程</Link>,
    },
    {
      key: 'standings',
      label: <Link to="/standings">排名</Link>,
    },
  ];

  return (
    <AntHeader className="header">
      <div className="header-content">
        <div className="logo">
          <Link to="/">Football Live</Link>
        </div>
        <Menu 
          className="nav-menu"
          theme="dark"
          mode="horizontal"
          items={menuItems}
        />
        <div className="mobile-menu-icon">
          <MenuOutlined />
        </div>
      </div>
    </AntHeader>
  );
};

export default Header;