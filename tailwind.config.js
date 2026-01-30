/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        manor: {
          bg: '#F9F8F4', // Warm Alabaster
          text: '#1A1A1A', // Soft Charcoal
          green: '#2C3E2C', // Deep Hunter Green
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      transitionTimingFunction: {
        'editorial': 'cubic-bezier(0.22, 1, 0.36, 1)',
      }
    },
  },
  plugins: [],
}