/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          background: '#171717',
          surface: '#262626',
          'surface-glass': 'rgba(38, 38, 38, 0.8)',
          primary: '#E5E5E5',
          secondary: '#A3A3A3',
          border: '#404040',
          accent: '#8B5CF6', // Previous Purple
          'accent-hover': '#7C3AED',
        },
        light: {
          background: '#FFFFFF',
          surface: '#F7F7F8',
          'surface-glass': 'rgba(247, 247, 248, 0.8)',
          primary: '#262626',
          secondary: '#525252',
          border: '#E5E5E5',
          accent: '#8B5CF6', // Previous Purple
          'accent-hover': '#7C3AED',
        },
      },
      backdropBlur: {
        'xl': '20px',
      },
      ringOffsetColor: {
        'light-background': '#FFFFFF',
        'dark-background': '#171717',
      }
    },
  },
  plugins: [],
};
