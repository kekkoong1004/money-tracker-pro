/** @type {import('tailwindcss').Config} */

export default {
  content: ['./components/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        custom: ['Inter', 'sans-serif'],
      },
      animation: {
        wiggle: 'move 12s linear infinite',
        spinner: 'spin 3s linear infinite',
      },
      keyframes: {
        move: {
          '0%': { transform: 'translate(-10vw, -10vh)' },
          '50%': { transform: 'translate(60vw, 60vh)' },
          '100%': { transform: 'translate(-10vw, -10vh)' },
        },
        spinner: {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '100%': {
            transform: 'rotate(360deg)',
          },
        },
      },
    },
    plugins: [],
  },
};
