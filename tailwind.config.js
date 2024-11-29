/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        7: "repeat(7, minmax(0, 1fr))", // Define a 7-column grid for the calendar
      },
      borderWidth: {
        0.5: "0.5px", // Add a custom border width of 0.5px
      },
    },
  },
  plugins: [],
};