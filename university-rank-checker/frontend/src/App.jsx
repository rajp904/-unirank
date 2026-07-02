import { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import HeroSection from './components/landing/HeroSection';
import Dashboard from './pages/Dashboard';
import useRankChecker from './hooks/useRankChecker';
import { getSearchHistory } from './utils/helpers';

const AppContent = () => {
  const { isDark } = useTheme();
  const { data, loading, error, fetchRank, reset } = useRankChecker();
  const [view, setView] = useState('home');
  const [history, setHistory] = useState(() => getSearchHistory());

  useEffect(() => {
    if (data && !loading) {
      setView('dashboard');
      setHistory(getSearchHistory());
    }
  }, [data, loading]);

  const handleSearch = async (reg) => {
    const result = await fetchRank(reg);
    if (result) {
      setView('dashboard');
      setHistory(getSearchHistory());
    }
  };

  const handleBack = () => { setView('home'); reset(); };

  const handleDashboardSearch = async (reg) => {
    await fetchRank(reg);
    setHistory(getSearchHistory());
  };

  return (
    <div className={isDark ? 'bg-[#09090f] text-white' : 'bg-slate-50 text-gray-900'}>
      {view === 'home' ? (
        <HeroSection
          onSearch={handleSearch}
          loading={loading}
          recentSearches={history}
          error={error}
        />
      ) : (
        <Dashboard
          data={data}
          loading={loading}
          error={error}
          onBack={handleBack}
          onSearch={handleDashboardSearch}
          searchHistory={history}
          onHistoryChange={setHistory}
        />
      )}
    </div>
  );
};

const App = () => (
  <ThemeProvider>
    <AppContent />
  </ThemeProvider>
);

export default App;
