/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        chocolate: {
          50: '#f7f3f0',
          100: '#ece0d8',
          200: '#d9c2b3',
          300: '#c1a089',
          400: '#a87d60',
          500: '#8b5e42',
          600: '#6f4a36',
          700: '#553828',
          800: '#3d2820',
          900: '#2a1b15',
          950: '#1c1210',
        },
        ivory: {
          50: '#fdfbf8',
          100: '#f9f4ed',
          200: '#f0e6d9',
          300: '#e4d3bf',
          400: '#d3bfa3',
          500: '#c2ab87',
        },
        tan: {
          DEFAULT: '#c2ab87',
          light: '#d3bfa3',
          dark: '#a87d60',
        },
        gold: {
          DEFAULT: '#b89968',
          light: '#d4b888',
          muted: '#9a8050',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'ultra-wide': '0.3em',
        'wider-2': '0.15em',
      },
      animation: {
        'fade-in': 'fadeIn 1.2s ease-out forwards',
        'fade-up': 'fadeUp 1s ease-out forwards',
        'slow-zoom': 'slowZoom 20s ease-out forwards',
        'slide-in-right': 'slideInRight 0.4s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.4s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slowZoom: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.12)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};
