import React, { useState } from 'react';
import { Card, Calendar, Typography, Select } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import MatchCard from '../components/MatchCard';
import { getMatches } from '../utils/data';
import './Schedule.less';

const { Title } = Typography;

const Schedule = () => {
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today;
  });
  
  const [selectedLeague, setSelectedLeague] = useState('all');
  
  // 获取所有比赛数据
  const allMatches = getMatches();
  
  // 筛选指定日期的比赛
  const getMatchesForDate = (date) => {
    const dateString = date.toISOString().split('T')[0];
    return allMatches.filter(match => 
      match.date === dateString && 
      (selectedLeague === 'all' || match.league === selectedLeague)
    );
  };
  
  // 获取日期列表（用于日历标记）
  const getMatchDates = () => {
    const dates = {};
    allMatches.forEach(match => {
      const date = new Date(match.date);
      const dateString = date.toISOString().split('T')[0];
      if (!dates[dateString]) {
        dates[dateString] = [];
      }
      dates[dateString].push(match);
    });
    return dates;
  };
  
  const matchDates = getMatchDates();
  const matchesForSelectedDate = getMatchesForDate(selectedDate);
  
  // 日期单元格渲染
  const dateCellRender = (date) => {
    const dateString = date.toISOString().split('T')[0];
    const matches = matchDates[dateString] || [];
    
    if (matches.length > 0) {
      return (
        <div className="calendar-date-marker">
          <div className="date-number">{date.getDate()}</div>
          <div className="match-count">{matches.length} 场</div>
        </div>
      );
    }
    
    return <div className="calendar-date-number">{date.getDate()}</div>;
  };
  
  // 选择日期
  const onSelectDate = (date) => {
    setSelectedDate(date);
  };
  
  // 格式化日期显示
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    const weekday = weekdays[date.getDay()];
    
    return `${year}年${month}月${day}日 ${weekday}`;
  };
  
  // 联赛选项
  const leagueOptions = [
    { value: 'all', label: '全部联赛' },
    { value: 'premier', label: '英超' },
    { value: 'la_liga', label: '西甲' },
    { value: 'serie_a', label: '意甲' },
    { value: 'bundesliga', label: '德甲' },
    { value: 'ligue_1', label: '法甲' },
    { value: 'chinese', label: '中超' }
  ];

  return (
    <div className="schedule">
      <div className="schedule-header">
        <Title level={2}>
          <CalendarOutlined /> 赛程日历
        </Title>
      </div>
      
      <Card className="calendar-card">
        <Calendar
          className="schedule-calendar"
          dateCellRender={dateCellRender}
          onSelect={onSelectDate}
          fullscreen={false}
        />
      </Card>
      
      <div className="schedule-content">
        <div className="schedule-controls">
          <Title level={4} className="selected-date">
            {formatDate(selectedDate)} 赛程
          </Title>
          <Select
            className="league-filter-select"
            defaultValue="all"
            options={leagueOptions}
            onChange={setSelectedLeague}
            placeholder="选择联赛"
          />
        </div>
        
        {matchesForSelectedDate.length > 0 ? (
          <div className="matches-list">
            {matchesForSelectedDate.map(match => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        ) : (
          <Card className="empty-card">
            <div className="empty-state">
              <p>所选日期无比赛安排</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Schedule;