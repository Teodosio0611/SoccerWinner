import React from 'react';
import { Layout, theme } from 'antd';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Schedule from './pages/Schedule';
import Standings from './pages/Standings';
import MatchDetail from './pages/MatchDetail';
import './App.less';

const { Content } = Layout;

const App = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <HashRouter>
      <Layout className="layout">
        <Header />
        <Content 
          className="content"
          style={{
            background: colorBgContainer,
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/standings" element={<Standings />} />
            <Route path="/match/:id" element={<MatchDetail />} />
          </Routes>
        </Content>
        <Footer />
      </Layout>
    </HashRouter>
  );
};

export default App;