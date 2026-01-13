import React from 'react';
import { Table } from 'antd';
import './StandingsTable.less';

const StandingsTable = ({ standings }) => {
  // 默认显示英超排名
  const defaultLeague = standings.premier || [];
  
  const columns = [
    {
      title: '排名',
      dataIndex: 'rank',
      key: 'rank',
      width: 60,
      render: (text) => <span className="rank">{text}</span>
    },
    {
      title: '球队',
      dataIndex: 'team',
      key: 'team',
      render: (text) => (
        <div className="team-cell">
          <img 
            src={`https://www.weavefox.cn/api/bolt/unsplash_image?keyword=${text},football,jersey&width=30&height=30&random=${text}_30_30`} 
            alt={text} 
            className="team-logo-small"
          />
          <span>{text}</span>
        </div>
      )
    },
    {
      title: '比赛',
      dataIndex: 'played',
      key: 'played',
      width: 60
    },
    {
      title: '胜/平/负',
      dataIndex: 'wdl',
      key: 'wdf',
      render: (_, record) => (
        <span>{record.won}/{record.drawn}/{record.lost}</span>
      )
    },
    {
      title: '进球',
      dataIndex: 'goalsFor',
      key: 'goalsFor',
      width: 60
    },
    {
      title: '失球',
      dataIndex: 'goalsAgainst',
      key: 'goalsAgainst',
      width: 60
    },
    {
      title: '净胜球',
      dataIndex: 'goalDifference',
      key: 'goalDifference',
      width: 80,
      render: (text) => (
        <span className={text > 0 ? 'positive' : text < 0 ? 'negative' : ''}>
          {text > 0 ? `+${text}` : text}
        </span>
      )
    },
    {
      title: '积分',
      dataIndex: 'points',
      key: 'points',
      width: 80,
      render: (text) => <span className="points">{text}</span>
    }
  ];

  return (
    <div className="standings-table">
      <Table
        dataSource={defaultLeague}
        columns={columns}
        pagination={false}
        rowKey="rank"
        scroll={{ y: 400 }}
      />
    </div>
  );
};

export default StandingsTable;