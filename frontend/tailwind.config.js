/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        alterbridge: "#faa32a",
      },
      borderWidth: {
        '1': '1px'
      }
    },
  },
  plugins: [],
};
