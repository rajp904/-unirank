import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = () => {
  const { isDark, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      className={`p-2 rounded-xl border cursor-pointer transition-colors ${
        isDark
          ? 'border-white/10 hover:bg-white/8 text-gray-400 hover:text-white'
          : 'border-gray-200 hover:bg-gray-100 text-gray-500 hover:text-gray-900'
      }`}
      aria-label="Toggle theme"
    >
      {isDark ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
};

export default ThemeToggle;
