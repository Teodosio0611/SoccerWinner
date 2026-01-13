import React from 'react';
import { Button, Space } from 'antd';
import './LeagueFilter.less';

const LeagueFilter = ({ selectedLeagues, onChange }) => {
  const leagues = [
    { id: 'all', name: '全部联赛' },
    { id: 'premier', name: '英超' },
    { id: 'la_liga', name: '西甲' },
    { id: 'serie_a', name: '意甲' },
    { id: 'bundesliga', name: '德甲' },
    { id: 'ligue_1', name: '法甲' },
    { id: 'chinese', name: '中超' }
  ];

  const handleLeagueToggle = (leagueId) => {
    if (leagueId === 'all') {
      // 如果点击"全部联赛"，只选择全部
      onChange(['all']);
    } else {
      // 如果点击其他联赛
      const newSelected = selectedLeagues.includes(leagueId)
        ? selectedLeagues.filter(id => id !== leagueId && id !== 'all')
        : [...selectedLeagues.filter(id => id !== 'all'), leagueId];
      
      // 如果没有选择任何联赛，则选择全部
      onChange(newSelected.length > 0 ? newSelected : ['all']);
    }
  };

  return (
    <div className="league-filter">
      <Space wrap>
        {leagues.map(league => (
          <Button
            key={league.id}
            className={`league-button ${selectedLeagues.includes(league.id) ? 'selected' : ''}`}
            onClick={() => handleLeagueToggle(league.id)}
          >
            {league.name}
          </Button>
        ))}
      </Space>
    </div>
  );
};

export default LeagueFilter;