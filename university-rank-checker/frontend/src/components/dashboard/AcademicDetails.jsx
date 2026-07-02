import { BookOpen, CheckCircle, AlertTriangle } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { safeVal } from '../../utils/helpers';

const Row = ({ label, value, isDark }) => (
  <div className={`flex justify-between items-center py-2.5 border-b last:border-0 ${
    isDark ? 'border-white/6' : 'border-gray-50'
  }`}>
    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{label}</span>
    <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}</span>
  </div>
);

const AcademicDetails = ({ data }) => {
  const { isDark } = useTheme();
  const card = isDark ? 'card-dark' : 'card-light';
  const backlogs = parseInt(data.reappearBacklog) || 0;

  return (
    <div className={`rounded-2xl p-5 ${card}`}>
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 rounded-xl bg-blue-500/15 flex items-center justify-center">
          <BookOpen size={15} className="text-blue-400" />
        </div>
        <div>
          <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Academic Details</h3>
          <p className={`text-[11px] ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Marks & history</p>
        </div>
      </div>

      <Row label="10th Marks"   value={safeVal(data.xMarks)}         isDark={isDark} />
      <Row label="12th Marks"   value={safeVal(data.xiiMarks)}       isDark={isDark} />
      <Row label="Graduation"   value={safeVal(data.graduationMarks)} isDark={isDark} />
      <Row label="Diploma"      value={safeVal(data.diplomaMarks)}   isDark={isDark} />

      <div className={`mt-3 flex items-center gap-2.5 p-3 rounded-xl ${
        backlogs > 0
          ? 'bg-red-500/10 border border-red-500/20'
          : 'bg-emerald-500/10 border border-emerald-500/20'
      }`}>
        {backlogs > 0
          ? <AlertTriangle size={15} className="text-red-400 flex-shrink-0" />
          : <CheckCircle    size={15} className="text-emerald-400 flex-shrink-0" />
        }
        <span className={`text-xs font-semibold ${backlogs > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
          {backlogs > 0 ? `${backlogs} Active Backlog(s)` : 'No Active Backlogs'}
        </span>
      </div>
    </div>
  );
};

export default AcademicDetails;
