import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative w-16 h-9 rounded-full p-1 transition-all duration-500 focus:outline-none focus:ring-4 focus:ring-brand-500/20 overflow-hidden"
      style={{
        background: theme === 'dark'
          ? 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)'
          : 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
      }}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {/* Stars for dark mode */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${theme === 'dark' ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute top-1.5 left-2 w-1 h-1 bg-white rounded-full animate-pulse" />
        <div className="absolute top-3 left-5 w-0.5 h-0.5 bg-white/70 rounded-full" />
        <div className="absolute bottom-2 left-3 w-0.5 h-0.5 bg-white/50 rounded-full" />
      </div>

      {/* Clouds for light mode */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${theme === 'dark' ? 'opacity-0' : 'opacity-100'}`}>
        <div className="absolute top-1 right-3 w-4 h-2 bg-white/60 rounded-full" />
        <div className="absolute bottom-1.5 right-5 w-3 h-1.5 bg-white/40 rounded-full" />
      </div>

      <motion.div
        className="relative w-7 h-7 rounded-full shadow-lg flex items-center justify-center"
        animate={{
          x: theme === 'dark' ? 28 : 0,
          rotate: theme === 'dark' ? 360 : 0,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        style={{
          background: theme === 'dark'
            ? 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)'
            : 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
          boxShadow: theme === 'dark'
            ? '0 0 20px rgba(199, 210, 254, 0.5)'
            : '0 0 20px rgba(251, 191, 36, 0.5)',
        }}
      >
        {theme === 'dark' ? (
          <svg className="w-4 h-4 text-indigo-900" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        ) : (
          <svg className="w-4 h-4 text-amber-900" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
          </svg>
        )}
      </motion.div>
    </motion.button>
  );
}
