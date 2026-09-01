/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        card: '#111111',
        surface: '#161616',
        subsurface: '#1c1c1c',
      },
    },
  },
  plugins: [],
};
