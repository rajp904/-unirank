import { useState } from 'react';
import { Search, ArrowRight, GraduationCap, Sun, Moon, TrendingUp, Users, Zap } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const HeroSection = ({ onSearch, loading, recentSearches = [] }) => {
  const { isDark, toggle } = useTheme();
  const [regNum, setRegNum] = useState('');
  const [err, setErr] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const v = regNum.trim();
    if (!v) { setErr('Please enter your registration number'); return; }
    if (!/^\d{8,12}$/.test(v)) { setErr('Enter a valid 8–12 digit registration number'); return; }
    setErr('');
    onSearch(v);
  };

  const quickSearch = (num) => { setRegNum(num); setErr(''); onSearch(num); };

  const bg = isDark ? 'bg-[#09090f]' : 'bg-slate-50';
  const card = isDark ? 'card-dark' : 'card-light';
  const text = isDark ? 'text-white' : 'text-gray-900';
  const muted = isDark ? 'text-gray-400' : 'text-gray-500';
  const inputBg = isDark
    ? 'bg-white/5 border-white/10 focus-within:border-indigo-500/60'
    : 'bg-white border-gray-200 focus-within:border-indigo-400 shadow-sm';
  const navBorder = isDark ? 'border-white/8' : 'border-gray-200';

  return (
    <div className={`min-h-screen flex flex-col ${bg} relative overflow-hidden`}>
      {/* Subtle grid */}
      <div className={`absolute inset-0 pointer-events-none ${isDark ? 'bg-grid-dark' : 'bg-grid-light'}`} />

      {/* Glow blobs — static, no animation */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-indigo-600/8 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-violet-600/6 blur-3xl pointer-events-none" />

      {/* Navbar */}
      <nav className={`relative z-10 flex items-center justify-between px-5 sm:px-8 py-4 border-b ${navBorder}`}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <GraduationCap size={15} className="text-white" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className={`font-extrabold text-base tracking-tight ${text}`}>UniRank</span>
            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-indigo-500/15 text-indigo-400 border border-indigo-500/20">
              LIVE
            </span>
          </div>
        </div>
        <button
          onClick={toggle}
          className={`p-2 rounded-xl border cursor-pointer transition-colors ${
            isDark
              ? 'border-white/10 hover:bg-white/8 text-gray-400 hover:text-white'
              : 'border-gray-200 hover:bg-gray-100 text-gray-500 hover:text-gray-900'
          }`}
          aria-label="Toggle theme"
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </nav>

      {/* Hero */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-16 text-center max-w-3xl mx-auto w-full">
        {/* Top label */}
        <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-medium mb-8 ${
          isDark
            ? 'bg-indigo-500/10 border-indigo-500/25 text-indigo-400'
            : 'bg-indigo-50 border-indigo-200 text-indigo-600'
        }`}>
          <span className="status-dot" />
          Real-Time Student Ranking System
        </div>

        {/* Headline */}
        <h1 className={`text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] mb-5 ${text}`}>
          University{' '}
          <span className="gradient-text">Rank Checker</span>
        </h1>

        <p className={`text-base sm:text-lg max-w-xl mb-10 leading-relaxed ${muted}`}>
          Enter your registration number to instantly view your rank, percentile, CGPA, placement status, and detailed academic profile.
        </p>

        {/* Search */}
        <div className="w-full max-w-lg mb-3">
          <form onSubmit={handleSubmit}>
            <div className={`flex items-center rounded-2xl border overflow-hidden transition-all ${inputBg}`}>
              <div className="pl-4 flex-shrink-0">
                <Search size={18} className={isDark ? 'text-indigo-400' : 'text-indigo-500'} />
              </div>
              <input
                type="text"
                inputMode="numeric"
                value={regNum}
                onChange={e => { setRegNum(e.target.value); setErr(''); }}
                placeholder="e.g. 12320802"
                maxLength={12}
                disabled={loading}
                className={`flex-1 px-3 py-4 bg-transparent outline-none text-sm sm:text-base ${
                  isDark ? 'text-white placeholder:text-gray-600' : 'text-gray-900 placeholder:text-gray-400'
                }`}
              />
              <button
                type="submit"
                disabled={loading}
                className="m-1.5 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700
                  text-white text-sm font-semibold flex items-center gap-2 transition-colors
                  disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap
                  shadow-lg shadow-indigo-500/25"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Searching
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    Check Rank
                    <ArrowRight size={15} />
                  </span>
                )}
              </button>
            </div>
          </form>
          {err && (
            <p className="text-red-400 text-xs mt-2 text-left pl-1">{err}</p>
          )}
        </div>

        {/* Recent searches */}
        {recentSearches.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            <span className={`text-xs self-center ${muted}`}>Recent:</span>
            {recentSearches.slice(0, 4).map(item => (
              <button
                key={item.registrationNumber}
                onClick={() => quickSearch(item.registrationNumber)}
                className={`text-xs px-3 py-1.5 rounded-full border cursor-pointer transition-colors ${
                  isDark
                    ? 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-indigo-500/40'
                    : 'bg-white border-gray-200 text-gray-600 hover:bg-indigo-50 hover:border-indigo-300'
                }`}
              >
                {item.registrationNumber}
                {item.name && <span className="opacity-60"> · {item.name.split(' ')[0]}</span>}
              </button>
            ))}
          </div>
        )}

        {/* Feature pills */}
        <div className="flex flex-wrap gap-3 justify-center">
          {[
            { icon: Users, text: '7,000+ Students' },
            { icon: TrendingUp, text: 'Live Rankings' },
            { icon: Zap, text: 'Instant Results' },
          ].map(({ icon: Icon, text: t }) => (
            <div
              key={t}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm ${
                isDark
                  ? 'bg-white/4 border-white/8 text-gray-400'
                  : 'bg-white border-gray-200 text-gray-500 shadow-sm'
              }`}
            >
              <Icon size={14} className="text-indigo-400" />
              {t}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default HeroSection;
