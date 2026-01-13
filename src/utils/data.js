// 模拟数据存储
const mockData = {
  matches: [
    {
      id: 1,
      homeTeam: '曼城',
      awayTeam: '阿森纳',
      homeScore: 2,
      awayScore: 1,
      status: 'live',
      time: 75,
      date: '2026-01-15',
      league: 'premier'
    },
    {
      id: 2,
      homeTeam: '利物浦',
      awayTeam: '切尔西',
      homeScore: 1,
      awayScore: 1,
      status: 'live',
      time: 62,
      date: '2026-01-15',
      league: 'premier'
    },
    {
      id: 3,
      homeTeam: '皇家马德里',
      awayTeam: '巴塞罗那',
      homeScore: 0,
      awayScore: 0,
      status: 'upcoming',
      time: '20:00',
      date: '2026-01-15',
      league: 'la_liga'
    },
    {
      id: 4,
      homeTeam: '拜仁慕尼黑',
      awayTeam: '多特蒙德',
      homeScore: 3,
      awayScore: 2,
      status: 'finished',
      time: 'N/A',
      date: '2026-01-14',
      league: 'bundesliga'
    },
    {
      id: 5,
      homeTeam: '巴黎圣日耳曼',
      awayTeam: '马赛',
      homeScore: 0,
      awayScore: 0,
      status: 'upcoming',
      time: '19:30',
      date: '2026-01-15',
      league: 'ligue_1'
    },
    {
      id: 6,
      homeTeam: '广州恒大',
      awayTeam: '上海申花',
      homeScore: 2,
      awayScore: 0,
      status: 'finished',
      time: 'N/A',
      date: '2026-01-14',
      league: 'chinese'
    }
  ],
  standings: {
    premier: [
      { rank: 1, team: '曼城', played: 20, won: 15, drawn: 3, lost: 2, goalsFor: 45, goalsAgainst: 18, goalDifference: 27, points: 48 },
      { rank: 2, team: '阿森纳', played: 20, won: 14, drawn: 4, lost: 2, goalsFor: 42, goalsAgainst: 15, goalDifference: 27, points: 46 },
      { rank: 3, team: '曼联', played: 20, won: 12, drawn: 5, lost: 3, goalsFor: 38, goalsAgainst: 20, goalDifference: 18, points: 41 },
      { rank: 4, team: '利物浦', played: 20, won: 11, drawn: 6, lost: 3, goalsFor: 35, goalsAgainst: 19, goalDifference: 16, points: 39 },
      { rank: 5, team: '热刺', played: 20, won: 10, drawn: 7, lost: 3, goalsFor: 30, goalsAgainst: 18, goalDifference: 12, points: 37 }
    ],
    la_liga: [
      { rank: 1, team: '皇家马德里', played: 19, won: 14, drawn: 4, lost: 1, goalsFor: 40, goalsAgainst: 12, goalDifference: 28, points: 46 },
      { rank: 2, team: '巴塞罗那', played: 19, won: 13, drawn: 4, lost: 2, goalsFor: 38, goalsAgainst: 15, goalDifference: 23, points: 43 },
      { rank: 3, team: '马德里竞技', played: 19, won: 12, drawn: 5, lost: 2, goalsFor: 32, goalsAgainst: 14, goalDifference: 18, points: 41 },
      { rank: 4, team: '比利亚雷亚尔', played: 19, won: 11, drawn: 6, lost: 2, goalsFor: 30, goalsAgainst: 16, goalDifference: 14, points: 39 },
      { rank: 5, team: '皇家贝蒂斯', played: 19, won: 10, drawn: 7, lost: 2, goalsFor: 28, goalsAgainst: 15, goalDifference: 13, points: 37 }
    ]
  }
};

// 获取比赛数据
export const getMatches = () => {
  // 模拟从localStorage获取数据
  const storedMatches = localStorage.getItem('footballMatches');
  if (storedMatches) {
    return JSON.parse(storedMatches);
  }
  
  // 初始化数据
  localStorage.setItem('footballMatches', JSON.stringify(mockData.matches));
  return mockData.matches;
};

// 获取排名数据
export const getStandings = () => {
  // 模拟从localStorage获取数据
  const storedStandings = localStorage.getItem('footballStandings');
  if (storedStandings) {
    return JSON.parse(storedStandings);
  }
  
  // 初始化数据
  localStorage.setItem('footballStandings', JSON.stringify(mockData.standings));
  return mockData.standings;
};

// 更新比赛数据
export const updateMatch = (matchId, updates) => {
  const matches = getMatches();
  const matchIndex = matches.findIndex(m => m.id === matchId);
  
  if (matchIndex !== -1) {
    matches[matchIndex] = { ...matches[matchIndex], ...updates };
    localStorage.setItem('footballMatches', JSON.stringify(matches));
    return matches[matchIndex];
  }
  
  return null;
};

// 添加新比赛
export const addMatch = (match) => {
  const matches = getMatches();
  const newMatch = { ...match, id: Date.now() };
  matches.push(newMatch);
  localStorage.setItem('footballMatches', JSON.stringify(matches));
  return newMatch;
};