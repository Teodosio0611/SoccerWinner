import React from 'react';
import { Layout } from 'antd';
import './Footer.less';

const { Footer: AntFooter } = Layout;

const Footer = () => {
  return (
    <AntFooter className="footer">
      <div className="footer-content">
        <p>© 2026 Football Live. All rights reserved.</p>
        <p>联系我们: contact@football-live.com</p>
      </div>
    </AntFooter>
  );
};

export default Footer;