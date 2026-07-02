import { CreditCard, Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { safeVal } from '../../utils/helpers';

const PepFeeDetails = ({ data }) => {
  const { isDark } = useTheme();
  const card = isDark ? 'card-dark' : 'card-light';

  const raw = data.pepFeeDetails || '';
  const isPaid = raw.toLowerCase().includes('fully paid');
  const amount = raw.match(/[\d,]+\.\d+/)?.[0];

  return (
    <div className={`rounded-2xl p-5 ${card}`}>
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 rounded-xl bg-green-500/15 flex items-center justify-center">
          <CreditCard size={15} className="text-green-400" />
        </div>
        <div>
          <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>PEP Fee</h3>
          <p className={`text-[11px] ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Placement Enhancement Program</p>
        </div>
      </div>

      {/* Status banner */}
      <div className={`flex items-center gap-3 p-3.5 rounded-xl mb-4 ${
        isPaid
          ? 'bg-emerald-500/10 border border-emerald-500/20'
          : 'bg-red-500/10 border border-red-500/20'
      }`}>
        {isPaid
          ? <CheckCircle size={18} className="text-emerald-400 flex-shrink-0" />
          : <AlertCircle size={18} className="text-red-400 flex-shrink-0" />
        }
        <div>
          <div className={`text-sm font-bold ${isPaid ? 'text-emerald-400' : 'text-red-400'}`}>
            {isPaid ? 'Fully Paid' : 'Payment Pending'}
          </div>
          {amount && (
            <div className={`text-xs mt-0.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Amount: ₹{amount}
            </div>
          )}
        </div>
      </div>

      <div className={`flex items-center gap-3 py-2.5 border-b ${isDark ? 'border-white/6' : 'border-gray-50'}`}>
        <CreditCard size={13} className="text-green-400 flex-shrink-0" />
        <span className={`text-sm flex-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Fee Status</span>
        <span className={`text-sm font-semibold text-right max-w-[140px] truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {safeVal(data.pepFeeDetails)}
        </span>
      </div>
      <div className={`flex items-center gap-3 py-2.5`}>
        <Calendar size={13} className="text-blue-400 flex-shrink-0" />
        <span className={`text-sm flex-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Payment Date</span>
        <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {safeVal(data.pepFeePaymentDate)}
        </span>
      </div>
    </div>
  );
};

export default PepFeeDetails;
