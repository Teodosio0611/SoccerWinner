import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, Typography, Progress, Statistic } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { getMatches } from '../utils/data';
import './MatchDetail.less';

const { Title, Text } = Typography;

const MatchDetail = () => {
  const { id } = useParams();
  
  // 获取比赛数据
  const matches = getMatches();
  const match = matches.find(m => m.id === parseInt(id));
  
  // 如果未找到比赛，显示错误信息
  if (!match) {
    return (
      <div className="match-detail">
        <Card className="error-card">
          <Text>未找到比赛信息</Text>
        </Card>
      </div>
    );
  }
  
  // 获取比赛状态文本
  const getStatusText = () => {
    switch (match.status) {
      case 'live':
        return `进行中 ${match.time}'`;
      case 'finished':
        return '已结束';
      case 'upcoming':
      default:
        return '未开始';
    }
  };
  
  // 获取联赛名称
  const getLeagueName = () => {
    const leagueNames = {
      'premier': '英超',
      'la_liga': '西甲',
      'serie_a': '意甲',
      'bundesliga': '德甲',
      'ligue_1': '法甲',
      'chinese': '中超'
    };
    return leagueNames[match.league] || match.league;
  };

  return (
    <div className="match-detail">
      <a href="#/" className="back-link">
        <ArrowLeftOutlined /> 返回首页
      </a>
      
      <Card className="match-header-card">
        <div className="match-info">
          <Text className="league-name">{getLeagueName()}</Text>
          <Title level={3} className="match-title">
            {match.homeTeam} vs {match.awayTeam}
          </Title>
          <Text className="match-date">
            {match.date} {match.time !== 'N/A' ? match.time : ''}
          </Text>
          <Text className={`match-status ${match.status}`}>
            {getStatusText()}
          </Text>
        </div>
      </Card>
      
      <div className="match-scoreboard">
        <div className="team">
          <img 
            src={`https://www.weavefox.cn/api/bolt/unsplash_image?keyword=${match.homeTeam},football&width=100&height=100&random=${match.homeTeam}_100_100`} 
            alt={match.homeTeam} 
            className="team-logo"
          />
          <Text className="team-name">{match.homeTeam}</Text>
        </div>
        
        <div className="score">
          <div className="score-display">
            <span className="score-number">{match.homeScore}</span>
            <span className="score-divider">-</span>
            <span className="score-number">{match.awayScore}</span>
          </div>
          
          {match.status === 'live' && (
            <Progress 
              percent={Math.min(100, Math.max(0, (match.time / 90) * 100))} 
              showInfo={false} 
              strokeColor="#10b981" 
              trailColor="#334155"
              className="match-progress"
            />
          )}
        </div>
        
        <div className="team">
          <img 
            src={`https://www.weavefox.cn/api/bolt/unsplash_image?keyword=${match.awayTeam},football&width=100&height=100&random=${match.awayTeam}_100_100`} 
            alt={match.awayTeam} 
            className="team-logo"
          />
          <Text className="team-name">{match.awayTeam}</Text>
        </div>
      </div>
      
      <Card className="match-stats">
        <Title level={4} className="stats-title">比赛统计</Title>
        <div className="stats-grid">
          <Statistic title="控球率" value="58%" suffix="/42%" />
          <Statistic title="射门" value="12" suffix="/8" />
          <Statistic title="射正" value="5" suffix="/3" />
          <Statistic title="角球" value="6" suffix="/4" />
          <Statistic title="犯规" value="10" suffix="/14" />
          <Statistic title="黄牌" value="2" suffix="/1" />
        </div>
      </Card>
    </div>
  );
};

export default MatchDetail;