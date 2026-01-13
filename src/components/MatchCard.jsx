import React from 'react';
import { Card, Tag, Progress } from 'antd';
import { ClockCircleOutlined, PlayCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import './MatchCard.less';

const MatchCard = ({ match }) => {
  // 获取比赛状态标签
  const getStatusTag = () => {
    switch (match.status) {
      case 'live':
        return <Tag icon={<PlayCircleOutlined />} color="#10b981">进行中 {match.time}'</Tag>;
      case 'finished':
        return <Tag icon={<CheckCircleOutlined />} color="#ef4444">已结束</Tag>;
      case 'upcoming':
      default:
        return <Tag icon={<ClockCircleOutlined />} color="#f59e0b">未开始</Tag>;
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
    <Card className={`match-card ${match.status === 'live' ? 'live' : ''}`} bordered={false}>
      <div className="match-header">
        <span className="league-name">{getLeagueName()}</span>
        {getStatusTag()}
      </div>
      
      <div className="match-content">
        <div className="team">
          <img 
            src={`https://www.weavefox.cn/api/bolt/unsplash_image?keyword=${match.homeTeam},football&width=60&height=60&random=${match.homeTeam}_60_60`} 
            alt={match.homeTeam} 
            className="team-logo"
          />
          <span className="team-name">{match.homeTeam}</span>
        </div>
        
        <div className="score">
          {match.status === 'live' || match.status === 'finished' ? (
            <>
              <span className="score-number">{match.homeScore}</span>
              <span className="score-divider">-</span>
              <span className="score-number">{match.awayScore}</span>
            </>
          ) : (
            <span className="vs">VS</span>
          )}
        </div>
        
        <div className="team">
          <img 
            src={`https://www.weavefox.cn/api/bolt/unsplash_image?keyword=${match.awayTeam},football&width=60&height=60&random=${match.awayTeam}_60_60`} 
            alt={match.awayTeam} 
            className="team-logo"
          />
          <span className="team-name">{match.awayTeam}</span>
        </div>
      </div>
      
      {match.status === 'live' && (
        <div className="match-progress">
          <Progress 
            percent={Math.min(100, Math.max(0, (match.time / 90) * 100))} 
            showInfo={false} 
            strokeColor="#10b981" 
            trailColor="#334155"
          />
        </div>
      )}
      
      <div className="match-time">
        {match.date} {match.time !== 'N/A' ? `${match.time}` : ''}
      </div>
    </Card>
  );
};

export default MatchCard;