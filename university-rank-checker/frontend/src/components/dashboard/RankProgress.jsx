import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { getRankAccentColor, getPerformanceTier } from '../../utils/helpers';

const AnimatedBar = ({ pct, color, isDark }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setWidth(pct), 80);
    return () => clearTimeout(t);
  }, [pct]);

  return (
    <div className={`h-2.5 rounded-full overflow-hidden ${isDark ? 'bg-white/10' : 'bg-gray-100'}`}>
      <div
        className="h-full rounded-full progress-bar"
        style={{ width: `${width}%`, background: `linear-gradient(90deg, ${color}, ${color}bb)` }}
      />
    </div>
  );
};

const RankProgress = ({ rank, total, percentile }) => {
  const { isDark } = useTheme();
  const card = isDark ? 'card-dark' : 'card-light';

  const p = parseFloat(percentile) || 0;
  const r = parseInt(rank) || 0;
  const t = parseInt(total) || 1;
  const rankPct = Math.max(0, 100 - (r / t) * 100);
  const color = getRankAccentColor(p);
  const tier = getPerformanceTier(p);
  const beaten = t - r;

  return (
    <div className={`rounded-2xl p-5 sm:p-6 ${card}`}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>Rank Position</h3>
          <p className={`text-xs mt-0.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            #{r.toLocaleString()} out of {t.toLocaleString()} students
          </p>
        </div>
        <span
          className="text-xs font-bold px-3 py-1.5 rounded-full border"
          style={{ color: tier.color, background: tier.bg, borderColor: tier.border }}
        >
          {tier.label}
        </span>
      </div>

      <div className="space-y-4">
        {/* Percentile bar */}
        <div>
          <div className={`flex justify-between text-xs mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            <span>Percentile Score</span>
            <span className="font-semibold" style={{ color }}>{p}%</span>
          </div>
          <AnimatedBar pct={p} color={color} isDark={isDark} />
        </div>

        {/* Rank percentile bar */}
        <div>
          <div className={`flex justify-between text-xs mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            <span>Rank Standing</span>
            <span className="font-semibold text-indigo-400">{rankPct.toFixed(1)}% from top</span>
          </div>
          <AnimatedBar pct={rankPct} color="#6366f1" isDark={isDark} />
        </div>
      </div>

      {/* Summary pill */}
      <div className={`mt-5 flex flex-wrap gap-4 pt-4 border-t ${isDark ? 'border-white/8' : 'border-gray-100'}`}>
        <div className="text-center">
          <div className="text-lg font-black" style={{ color }}>{beaten.toLocaleString()}</div>
          <div className={`text-[11px] ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Students below you</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-black" style={{ color }}>{(r - 1).toLocaleString()}</div>
          <div className={`text-[11px] ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Students above you</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-black text-indigo-400">{t.toLocaleString()}</div>
          <div className={`text-[11px] ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Total students</div>
        </div>
      </div>
    </div>
  );
};

export default RankProgress;
