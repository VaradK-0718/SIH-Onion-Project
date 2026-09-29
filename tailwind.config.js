/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        onion: {
          50: '#fdf4f8',
          100: '#fbe8f2',
          200: '#f7d0e5',
          300: '#f1a9cd',
          400: '#e574aa',
          500: '#d54789',
          600: '#be2b6d',
          700: '#9e1f54',
          800: '#831e47',
          900: '#6f1d3e',
          950: '#460b22',
        },
        agri: {
          green: '#10b981',
          emerald: '#059669',
          dark: '#064e3b',
          amber: '#f59e0b',
          red: '#ef4444',
          purple: '#7c3aed',
          navy: '#0f172a',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan': 'scan 2.5s ease-in-out infinite alternate',
      },
      keyframes: {
        scan: {
          '0%': { top: '0%' },
          '100%': { top: '100%' },
        }
      }
    },
  },
  plugins: [],
}
