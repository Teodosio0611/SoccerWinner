import React, { useState } from 'react';
import { Card, Select, Typography } from 'antd';
import { TrophyOutlined } from '@ant-design/icons';
import StandingsTable from '../components/StandingsTable';
import { getStandings } from '../utils/data';
import './Standings.less';

const { Title } = Typography;

const Standings = () => {
  const [selectedLeague, setSelectedLeague] = useState('premier');
  
  // 获取排名数据
  const standingsData = getStandings();
  
  // 联赛选项
  const leagueOptions = [
    { value: 'premier', label: '英超' },
    { value: 'la_liga', label: '西甲' },
    { value: 'serie_a', label: '意甲' },
    { value: 'bundesliga', label: '德甲' },
    { value: 'ligue_1', label: '法甲' },
    { value: 'chinese', label: '中超' }
  ];
  
  // 获取联赛名称
  const getLeagueName = (leagueKey) => {
    const names = {
      'premier': '英超',
      'la_liga': '西甲',
      'serie_a': '意甲',
      'bundesliga': '德甲',
      'ligue_1': '法甲',
      'chinese': '中超'
    };
    return names[leagueKey] || leagueKey;
  };

  return (
    <div className="standings">
      <div className="standings-header">
        <Title level={2}>
          <TrophyOutlined /> 联赛排名
        </Title>
      </div>
      
      <Card className="standings-card">
        <div className="standings-controls">
          <Title level={4} className="standings-title">
            {getLeagueName(selectedLeague)} 积分榜
          </Title>
          <Select
            className="league-select"
            defaultValue="premier"
            options={leagueOptions}
            onChange={setSelectedLeague}
            placeholder="选择联赛"
          />
        </div>
        
        <StandingsTable standings={{ [selectedLeague]: standingsData[selectedLeague] || [] }} />
      </Card>
    </div>
  );
};

export default Standings;