/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        'theme-blue': '#128AEB',
        'theme-secondary': '#E5E5EA',
        'theme-dark-primary': '#090807',
        'theme-dark-secondary': '#262626',
        'theme-dark-tertiary': '#3D3D3D',
        'glass-white': '#FFFFFF80',
      }
    },
  },
  plugins: [],
  darkMode: 'class',
};
