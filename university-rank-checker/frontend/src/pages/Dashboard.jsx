import { useState } from 'react';
import { ArrowLeft, Search, GraduationCap } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from '../components/ui/ThemeToggle';
import StudentHeroCard from '../components/dashboard/StudentHeroCard';
import RankProgress from '../components/dashboard/RankProgress';
import AcademicDetails from '../components/dashboard/AcademicDetails';
import PlacementDetails from '../components/dashboard/PlacementDetails';
import PepFeeDetails from '../components/dashboard/PepFeeDetails';
import ContactDetails from '../components/dashboard/ContactDetails';
import SearchHistory from '../components/dashboard/SearchHistory';
import { DashboardSkeleton } from '../components/ui/SkeletonLoader';
import ErrorState from '../components/ui/ErrorState';

const Dashboard = ({ data, loading, error, onBack, onSearch, searchHistory, onHistoryChange }) => {
  const { isDark } = useTheme();
  const [input, setInput] = useState('');
  const [inputErr, setInputErr] = useState('');

  const bg      = isDark ? 'bg-[#09090f]'       : 'bg-slate-50';
  const navBg   = isDark ? 'bg-[#09090f]/95 border-white/8' : 'bg-white/95 border-gray-200';
  const divider = isDark ? 'border-white/8'      : 'border-gray-200';

  const handleSearch = (e) => {
    e.preventDefault();
    const v = input.trim();
    if (!v) return;
    if (!/^\d{8,12}$/.test(v)) { setInputErr('8–12 digits required'); return; }
    setInputErr('');
    setInput('');
    onSearch(v);
  };

  return (
    <div className={`min-h-screen ${bg}`}>
      {/* ── Sticky nav ── */}
      <nav className={`sticky top-0 z-50 border-b backdrop-blur-xl ${navBg}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          {/* Logo */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow shadow-indigo-500/25">
              <GraduationCap size={13} className="text-white" />
            </div>
            <span className={`font-extrabold text-sm tracking-tight hidden sm:block ${isDark ? 'text-white' : 'text-gray-900'}`}>
              UniRank
            </span>
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 max-w-sm mx-auto">
            <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-colors ${
              isDark
                ? 'bg-white/5 border-white/10 focus-within:border-indigo-500/50'
                : 'bg-gray-50 border-gray-200 focus-within:border-indigo-300 focus-within:bg-white'
            }`}>
              <Search size={13} className="text-gray-400 flex-shrink-0" />
              <input
                type="text"
                inputMode="numeric"
                value={input}
                onChange={e => { setInput(e.target.value); setInputErr(''); }}
                placeholder="Registration number…"
                maxLength={12}
                disabled={loading}
                className={`flex-1 bg-transparent text-sm outline-none ${
                  isDark ? 'text-white placeholder:text-gray-600' : 'text-gray-900 placeholder:text-gray-400'
                }`}
              />
              <button
                type="submit"
                disabled={loading}
                className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors disabled:opacity-50 cursor-pointer flex-shrink-0"
              >
                {loading ? <span className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin block" /> : 'Go'}
              </button>
            </div>
            {inputErr && <p className="text-red-400 text-[11px] mt-1 pl-1">{inputErr}</p>}
          </form>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <ThemeToggle />
            <button
              onClick={onBack}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-medium cursor-pointer transition-colors ${
                isDark
                  ? 'border-white/10 hover:bg-white/8 text-gray-400 hover:text-white'
                  : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-600'
              }`}
            >
              <ArrowLeft size={13} />
              <span className="hidden sm:block">Home</span>
            </button>
          </div>
        </div>
      </nav>

      {/* ── Content ── */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-4">
        {/* Loading */}
        {loading && <DashboardSkeleton />}

        {/* Error */}
        {!loading && error && (
          <ErrorState message={error} onRetry={onBack} />
        )}

        {/* Dashboard */}
        {!loading && !error && data && (
          <>
            {/* Page title */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className={`text-base font-extrabold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Student Dashboard
                </h1>
                <p className={`text-xs mt-0.5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  {data.RegistrationNumber} · Last updated just now
                </p>
              </div>
            </div>

            {/* Hero card — profile + stats */}
            <StudentHeroCard data={data} />

            {/* Rank progress */}
            <RankProgress
              rank={data.Rank || data.overallRank}
              total={data.TotalStudents}
              percentile={data.Percentage || parseFloat(data.percentile)}
            />

            {/* Details grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AcademicDetails  data={data} />
              <PlacementDetails data={data} />
              <PepFeeDetails    data={data} />
            </div>

            {/* Contact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ContactDetails data={data} />
            </div>
          </>
        )}

        {/* Search History */}
        {!loading && searchHistory?.length > 0 && (
          <>
            <div className={`border-t pt-2 ${divider}`} />
            <SearchHistory
              history={searchHistory}
              onSearch={onSearch}
              onHistoryChange={onHistoryChange}
            />
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
