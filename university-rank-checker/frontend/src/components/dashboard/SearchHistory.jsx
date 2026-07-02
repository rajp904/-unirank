import { History, Trash2, TrendingUp } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { clearHistory } from '../../utils/helpers';

const SearchHistory = ({ history, onSearch, onHistoryChange }) => {
  const { isDark } = useTheme();
  const card = isDark ? 'card-dark' : 'card-light';

  if (!history?.length) return null;

  const handleClear = () => {
    clearHistory();
    onHistoryChange?.([]);
  };

  return (
    <div className={`rounded-2xl p-5 ${card}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-500/15 flex items-center justify-center">
            <History size={15} className="text-purple-400" />
          </div>
          <div>
            <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Recent Searches</h3>
            <p className={`text-[11px] ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Quick re-search</p>
          </div>
        </div>
        <button
          onClick={handleClear}
          className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 px-2.5 py-1.5 rounded-lg hover:bg-red-500/10 transition-colors cursor-pointer"
        >
          <Trash2 size={12} />
          Clear
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {history.map((item) => (
          <button
            key={item.registrationNumber}
            onClick={() => onSearch(item.registrationNumber)}
            className={`flex items-center gap-3 p-3 rounded-xl border text-left cursor-pointer transition-colors ${
              isDark
                ? 'bg-white/3 border-white/6 hover:bg-white/7 hover:border-indigo-500/30'
                : 'bg-gray-50 border-gray-100 hover:bg-indigo-50 hover:border-indigo-200'
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {item.name?.charAt(0) || '?'}
            </div>
            <div className="min-w-0 flex-1">
              <div className={`text-xs font-semibold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {item.name || 'Unknown'}
              </div>
              <div className={`text-[11px] ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                {item.registrationNumber}
              </div>
            </div>
            <div className="flex flex-col items-end flex-shrink-0">
              <span className="flex items-center gap-0.5 text-[11px] text-indigo-400 font-semibold">
                <TrendingUp size={9} />
                #{item.rank}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchHistory;
