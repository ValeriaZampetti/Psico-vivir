/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      "smax1": {"max": "1080px"},
      "smax2": {"max": "900px"},
    },
    extend: {
      colors: {
        primary: "#FFEAEC",
        secondary: "#CBFFC9",
      }
    },
  },
  plugins: [],
} 