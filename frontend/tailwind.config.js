/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        'dark-bg-1': '#212027',
        'dark-bg-2': '#26252C',
        'dark-font-primary': '#F0F0F1',
        'dark-font-secondary': '#878796'
      },
      borderWidth: {
        '1': '1px'
      }
    },
  },
  plugins: [],
};
