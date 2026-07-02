import { useTheme } from '../../context/ThemeContext';

const Sk = ({ className = '' }) => {
  const { isDark } = useTheme();
  return (
    <div className={`rounded-lg animate-pulse ${isDark ? 'bg-white/8' : 'bg-gray-200'} ${className}`} />
  );
};

export const DashboardSkeleton = () => {
  const { isDark } = useTheme();
  const card = isDark ? 'card-dark' : 'card-light';

  return (
    <div className="space-y-5 animate-pulse">
      {/* Hero rank card */}
      <div className={`rounded-2xl p-6 ${card}`}>
        <div className="flex items-center gap-4 mb-5">
          <Sk className="w-14 h-14 rounded-2xl" />
          <div className="flex-1 space-y-2">
            <Sk className="h-5 w-40" />
            <Sk className="h-3.5 w-28" />
            <Sk className="h-3.5 w-56" />
          </div>
          <Sk className="w-20 h-20 rounded-2xl flex-shrink-0" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[...Array(5)].map((_, i) => <Sk key={i} className="h-16 rounded-xl" />)}
        </div>
      </div>

      {/* Progress */}
      <div className={`rounded-2xl p-6 ${card}`}>
        <Sk className="h-4 w-32 mb-4" />
        <Sk className="h-3 w-full rounded-full mb-3" />
        <Sk className="h-3 w-3/4 rounded-full" />
      </div>

      {/* Detail cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className={`rounded-2xl p-5 ${card}`}>
            <Sk className="h-4 w-28 mb-4" />
            <div className="space-y-2.5">
              {[...Array(4)].map((_, j) => <Sk key={j} className="h-10 rounded-xl" />)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sk;
