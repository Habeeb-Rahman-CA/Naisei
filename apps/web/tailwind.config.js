/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        paper: {
          bg: '#F5F1E8',
          surface: '#FAF7F0',
          line: 'rgba(119, 115, 107, 0.18)',
          dotted: 'rgba(119, 115, 107, 0.25)',
          dark: {
            bg: '#1C1C1A',
            surface: '#252522',
            line: 'rgba(154, 151, 143, 0.14)',
            dotted: 'rgba(154, 151, 143, 0.20)',
          },
        },
        ink: {
          primary: '#292824',
          secondary: '#77736B',
          dark: {
            primary: '#E8E4DA',
            secondary: '#9A978F',
          },
        },
        lavender: {
          accent: '#6F6A9A',
          dark: '#8D88C7',
        },
      },
      fontFamily: {
        ui: ['Inter', 'Geist', 'sans-serif'],
        journal: ['Lora', 'Literata', 'Cormorant Garamond', 'serif'],
      },
      boxShadow: {
        page: '0 4px 20px -2px rgba(41, 40, 36, 0.06), 0 1px 3px rgba(41, 40, 36, 0.04)',
        'page-dark': '0 4px 24px -2px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [],
};
