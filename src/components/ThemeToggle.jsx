import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = theme === 'dark' || (!theme && prefersDark);
    setIsDarkMode(initialTheme);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const newIsDark = !prev;
      if (newIsDark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return newIsDark;
    });
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md hover:bg-light-background dark:hover:bg-dark-background transition-colors"
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      {isDarkMode ? (
        <Sun className="h-5 w-5 text-light-secondary dark:text-dark-secondary" />
      ) : (
        <Moon className="h-5 w-5 text-light-secondary dark:text-dark-secondary" />
      )}
    </button>
  );
};

export default ThemeToggle;
