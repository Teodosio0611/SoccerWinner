import React, { useState, useEffect } from 'react';
import { Card, Button, Space, Typography, Divider, Spin } from 'antd';
import { ReloadOutlined, CalendarOutlined, TrophyOutlined } from '@ant-design/icons';
import LeagueFilter from '../components/LeagueFilter';
import MatchCard from '../components/MatchCard';
import StandingsTable from '../components/StandingsTable';
import { getMatches, getStandings } from '../utils/data';
import './Home.less';

const { Title } = Typography;

const Home = () => {
  const [selectedLeagues, setSelectedLeagues] = useState(['all']);
  const [liveMatches, setLiveMatches] = useState([]);
  const [todayMatches, setTodayMatches] = useState([]);
  const [standings, setStandings] = useState({});
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // 获取数据
  const fetchData = () => {
    setLoading(true);
    try {
      // 获取比赛数据
      const matches = getMatches();
      const live = matches.filter(match => 
        match.status === 'live' && 
        (selectedLeagues.includes('all') || selectedLeagues.includes(match.league))
      );
      
      const today = matches.filter(match => 
        match.status !== 'live' && 
        (selectedLeagues.includes('all') || selectedLeagues.includes(match.league))
      );
      
      setLiveMatches(live);
      setTodayMatches(today);
      
      // 获取排名数据
      const standingsData = getStandings();
      setStandings(standingsData);
      
      setLastUpdated(new Date());
    } catch (error) {
      console.error('获取数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  // 初始化数据
  useEffect(() => {
    fetchData();
    
    // 设置定时刷新
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [selectedLeagues]);

  // 处理联赛筛选
  const handleLeagueChange = (leagues) => {
    setSelectedLeagues(leagues);
  };

  return (
    <div className="home">
      <div className="home-header">
        <Title level={2} className="home-title">足球赛事中心</Title>
        <Space>
          <Button 
            icon={<ReloadOutlined />} 
            onClick={fetchData}
            disabled={loading}
          >
            刷新
          </Button>
          <div className="last-updated">
            最后更新: {lastUpdated.toLocaleTimeString('zh-CN', { hour12: false })}
          </div>
        </Space>
      </div>

      <Card className="filter-card">
        <div className="filter-header">
          <Title level={4}>
            <CalendarOutlined /> 筛选您的关注
          </Title>
        </div>
        <LeagueFilter 
          selectedLeagues={selectedLeagues} 
          onChange={handleLeagueChange} 
        />
      </Card>

      <Divider />

      {loading ? (
        <div className="loading-container">
          <Spin size="large" />
          <p>正在加载数据...</p>
        </div>
      ) : (
        <>
          <Card className="section-card">
            <div className="section-header">
              <Title level={4}>
                <TrophyOutlined /> 实时比分
              </Title>
            </div>
            {liveMatches.length > 0 ? (
              <div className="matches-grid">
                {liveMatches.map(match => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>当前无进行中的比赛</p>
              </div>
            )}
          </Card>

          <Divider />

          <Card className="section-card">
            <div className="section-header">
              <Title level={4}>今日赛程</Title>
            </div>
            {todayMatches.length > 0 ? (
              <div className="matches-list">
                {todayMatches.map(match => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>今日无比赛安排</p>
              </div>
            )}
          </Card>

          <Divider />

          <Card className="section-card">
            <div className="section-header">
              <Title level={4}>联赛排名</Title>
            </div>
            <StandingsTable standings={standings} />
          </Card>
        </>
      )}
    </div>
  );
};

export default Home;