import { AlertCircle, WifiOff, SearchX, RefreshCw } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const getConfig = (msg = '') => {
  const m = msg.toLowerCase();
  if (m.includes('network') || m.includes('connect') || m.includes('server'))
    return { Icon: WifiOff,  title: 'Connection Failed',   accent: '#ef4444' };
  if (m.includes('not found') || m.includes('invalid') || m.includes('student'))
    return { Icon: SearchX,  title: 'Student Not Found',   accent: '#f59e0b' };
  return   { Icon: AlertCircle, title: 'Something Went Wrong', accent: '#6366f1' };
};

const ErrorState = ({ message, onRetry }) => {
  const { isDark } = useTheme();
  const { Icon, title, accent } = getConfig(message);

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center max-w-sm mx-auto">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
        style={{ background: `${accent}18`, border: `1px solid ${accent}30` }}
      >
        <Icon size={28} style={{ color: accent }} />
      </div>
      <h3 className={`text-base font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
      <p className="text-sm text-gray-400 mb-6 leading-relaxed">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors cursor-pointer"
        >
          <RefreshCw size={14} />
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorState;
