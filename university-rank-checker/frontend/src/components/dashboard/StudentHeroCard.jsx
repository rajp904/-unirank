import { GraduationCap, Hash, Calendar, MapPin, BadgeCheck } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { getInitials, getAvatarColor, getPerformanceTier, getRankAccentColor, safeVal } from '../../utils/helpers';

const StatChip = ({ label, value, accent, isDark }) => (
  <div className={`flex flex-col items-center justify-center rounded-xl px-3 py-3 ${
    isDark ? 'bg-white/5 border border-white/8' : 'bg-gray-50 border border-gray-100'
  }`}>
    <span className="text-xl font-black leading-none mb-1" style={{ color: accent }}>{value}</span>
    <span className={`text-[10px] font-medium uppercase tracking-wider ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{label}</span>
  </div>
);

const StudentHeroCard = ({ data }) => {
  const { isDark } = useTheme();
  const card = isDark ? 'card-dark' : 'card-light';

  const rank = data.Rank || data.overallRank;
  const total = data.TotalStudents;
  const percentile = parseFloat(data.Percentage || data.percentile) || 0;
  const cgpa = data.CGPA;
  const backlogs = parseInt(data.reappearBacklog) || 0;
  const isPlaced = data.companySelectedIn && data.companySelectedIn !== 'Not Selected';

  const tier = getPerformanceTier(percentile);
  const rankColor = getRankAccentColor(percentile);
  const avatarColor = getAvatarColor(data.Name);
  const initials = getInitials(data.Name);

  const cgpaNum = parseFloat(cgpa) || 0;
  const cgpaColor = cgpaNum >= 8.5 ? '#10b981' : cgpaNum >= 7 ? '#6366f1' : cgpaNum >= 6 ? '#f59e0b' : '#ef4444';

  return (
    <div className={`rounded-2xl p-5 sm:p-6 ${card}`}>
      {/* Profile row */}
      <div className="flex items-start sm:items-center gap-4 mb-6">
        {/* Avatar */}
        <div
          className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-white font-black text-lg flex-shrink-0 shadow-lg"
          style={{ background: `linear-gradient(135deg, ${avatarColor.from}, ${avatarColor.to})` }}
        >
          {initials}
          <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center border-2 border-current">
            <BadgeCheck size={10} className="text-white" />
          </span>
        </div>

        {/* Name + meta */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h2 className={`text-lg sm:text-xl font-extrabold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {data.Name}
            </h2>
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wide"
              style={{ color: tier.color, background: tier.bg, borderColor: tier.border }}
            >
              {tier.label}
            </span>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-0.5">
            <span className={`flex items-center gap-1.5 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              <Hash size={11} className="text-indigo-400" />
              {data.RegistrationNumber}
            </span>
            <span className={`flex items-center gap-1.5 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              <Calendar size={11} className="text-violet-400" />
              Batch {data.BatchYear}
            </span>
            {safeVal(data.Country) !== 'N/A' && (
              <span className={`flex items-center gap-1.5 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                <MapPin size={11} className="text-cyan-400" />
                {data.Country}
              </span>
            )}
          </div>

          <div className={`mt-1.5 flex items-center gap-1.5 text-xs ${isDark ? 'text-indigo-300' : 'text-indigo-600'}`}>
            <GraduationCap size={12} />
            <span className="truncate">{data.Course}</span>
          </div>
        </div>

        {/* Big rank badge — desktop only */}
        <div
          className="hidden sm:flex flex-col items-center justify-center w-20 h-20 rounded-2xl flex-shrink-0 shadow-xl"
          style={{
            background: `linear-gradient(135deg, ${rankColor}22, ${rankColor}11)`,
            border: `1.5px solid ${rankColor}40`,
          }}
        >
          <span className="text-2xl font-black leading-none" style={{ color: rankColor }}>#{rank}</span>
          <span className={`text-[10px] font-medium uppercase tracking-wider mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Rank</span>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        <StatChip label="Overall Rank" value={`#${rank}`}           accent={rankColor}   isDark={isDark} />
        <StatChip label="CGPA"         value={cgpa}                 accent={cgpaColor}   isDark={isDark} />
        <StatChip label="Percentile"   value={`${percentile}%`}     accent={rankColor}   isDark={isDark} />
        <StatChip label="Status"       value={data.status || 'Active'}
          accent={data.status === 'Active' ? '#10b981' : '#ef4444'} isDark={isDark} />
        <StatChip label="Backlogs"     value={backlogs}
          accent={backlogs === 0 ? '#10b981' : '#ef4444'}           isDark={isDark} />
      </div>
    </div>
  );
};

export default StudentHeroCard;
