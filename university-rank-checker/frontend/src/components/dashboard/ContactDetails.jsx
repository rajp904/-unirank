import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { safeVal } from '../../utils/helpers';

const ContactRow = ({ icon: Icon, label, value, iconColor, isDark }) => (
  <div className={`flex items-center gap-3 py-2.5 border-b last:border-0 ${
    isDark ? 'border-white/6' : 'border-gray-50'
  }`}>
    <Icon size={13} className={`${iconColor} flex-shrink-0`} />
    <span className={`text-sm flex-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{label}</span>
    <span className={`text-sm font-medium text-right max-w-[180px] truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}</span>
  </div>
);

const ContactDetails = ({ data }) => {
  const { isDark } = useTheme();
  const card = isDark ? 'card-dark' : 'card-light';

  return (
    <div className={`rounded-2xl p-5 ${card}`}>
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 rounded-xl bg-cyan-500/15 flex items-center justify-center">
          <Mail size={15} className="text-cyan-400" />
        </div>
        <div>
          <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Contact Details</h3>
          <p className={`text-[11px] ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Student contact info</p>
        </div>
      </div>

      <ContactRow icon={Mail}   label="Email"   value={safeVal(data.email)}     iconColor="text-indigo-400"  isDark={isDark} />
      <ContactRow icon={Phone}  label="Phone"   value={safeVal(data.contactNo)} iconColor="text-emerald-400" isDark={isDark} />
      <ContactRow icon={MapPin} label="State"   value={safeVal(data.State)}     iconColor="text-amber-400"  isDark={isDark} />
      <ContactRow icon={Globe}  label="Country" value={safeVal(data.Country)}   iconColor="text-cyan-400"   isDark={isDark} />
    </div>
  );
};

export default ContactDetails;
