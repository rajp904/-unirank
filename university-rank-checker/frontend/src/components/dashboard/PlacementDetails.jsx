import { Briefcase, Hash, Calendar, CheckCircle2, XCircle, FileText } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { safeVal } from '../../utils/helpers';

const InfoRow = ({ icon: Icon, label, value, iconColor, isDark }) => (
  <div className={`flex items-center gap-3 py-2.5 border-b last:border-0 ${
    isDark ? 'border-white/6' : 'border-gray-50'
  }`}>
    <Icon size={13} className={`${iconColor} flex-shrink-0`} />
    <span className={`text-sm flex-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{label}</span>
    <span className={`text-sm font-semibold text-right max-w-[140px] truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}</span>
  </div>
);

const PlacementDetails = ({ data }) => {
  const { isDark } = useTheme();
  const card = isDark ? 'card-dark' : 'card-light';
  const isPlaced = data.companySelectedIn && data.companySelectedIn !== 'Not Selected';

  return (
    <div className={`rounded-2xl p-5 ${card}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-500/15 flex items-center justify-center">
            <Briefcase size={15} className="text-indigo-400" />
          </div>
          <div>
            <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Placement</h3>
            <p className={`text-[11px] ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Campus placement info</p>
          </div>
        </div>
        <span className={`flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border ${
          isPlaced
            ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25'
            : 'text-amber-400 bg-amber-500/10 border-amber-500/25'
        }`}>
          {isPlaced ? <CheckCircle2 size={10} /> : <XCircle size={10} />}
          {isPlaced ? 'Placed' : 'Not Placed'}
        </span>
      </div>

      <InfoRow icon={Hash}         label="Placement ID"      value={safeVal(data.placementId)}            iconColor="text-indigo-400" isDark={isDark} />
      <InfoRow icon={Briefcase}    label="Company"           value={safeVal(data.companySelectedIn)}      iconColor="text-blue-400"   isDark={isDark} />
      <InfoRow icon={Calendar}     label="Opportunity Start" value={safeVal(data.opportunityStartDate)}   iconColor="text-purple-400" isDark={isDark} />
      <InfoRow icon={FileText}     label="Basic Details"     value={safeVal(data.basicDetails)}           iconColor="text-emerald-400" isDark={isDark} />
    </div>
  );
};

export default PlacementDetails;
