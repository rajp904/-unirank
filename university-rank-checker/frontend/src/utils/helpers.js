export const getInitials = (name) => {
  if (!name) return '??';
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
};

export const getAvatarColor = (name) => {
  const colors = [
    { from: '#6366f1', to: '#8b5cf6' },
    { from: '#3b82f6', to: '#06b6d4' },
    { from: '#8b5cf6', to: '#ec4899' },
    { from: '#10b981', to: '#0d9488' },
    { from: '#f59e0b', to: '#ef4444' },
    { from: '#06b6d4', to: '#3b82f6' },
    { from: '#ec4899', to: '#f43f5e' },
    { from: '#14b8a6', to: '#6366f1' },
  ];
  if (!name) return colors[0];
  return colors[name.charCodeAt(0) % colors.length];
};

export const getPerformanceTier = (percentile) => {
  const p = parseFloat(percentile);
  if (p >= 90) return { label: 'Top 10%',    color: '#10b981', bg: 'rgba(16,185,129,0.1)',  border: 'rgba(16,185,129,0.25)' };
  if (p >= 75) return { label: 'Top 25%',    color: '#6366f1', bg: 'rgba(99,102,241,0.1)',  border: 'rgba(99,102,241,0.25)' };
  if (p >= 50) return { label: 'Top 50%',    color: '#3b82f6', bg: 'rgba(59,130,246,0.1)',  border: 'rgba(59,130,246,0.25)' };
  if (p >= 25) return { label: 'Top 75%',    color: '#f59e0b', bg: 'rgba(245,158,11,0.1)',  border: 'rgba(245,158,11,0.25)' };
  return         { label: 'Bottom 25%', color: '#ef4444', bg: 'rgba(239,68,68,0.1)',   border: 'rgba(239,68,68,0.25)' };
};

export const getRankAccentColor = (percentile) => {
  const p = parseFloat(percentile);
  if (p >= 75) return '#10b981';
  if (p >= 50) return '#6366f1';
  if (p >= 25) return '#f59e0b';
  return '#ef4444';
};

export const safeVal = (v, fallback = 'N/A') => {
  if (!v || v === 'N/A' || v === 'NA' || String(v).trim() === '' || v === 'null') return fallback;
  return String(v).trim();
};

export const HISTORY_KEY = 'unirank_history';

export const getSearchHistory = () => {
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]'); }
  catch { return []; }
};

export const addToHistory = (data) => {
  try {
    const prev = getSearchHistory();
    const entry = {
      registrationNumber: data.RegistrationNumber,
      name: data.Name,
      rank: data.Rank || data.overallRank,
      cgpa: data.CGPA,
      percentile: data.Percentage,
      ts: Date.now(),
    };
    const list = [entry, ...prev.filter(h => h.registrationNumber !== entry.registrationNumber)].slice(0, 8);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(list));
    return list;
  } catch { return []; }
};

export const clearHistory = () => localStorage.removeItem(HISTORY_KEY);
