/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      "smax1": {"max": "1080px"},
      "smax2": {"max": "900px"},
    },
    extend: {
      colors: {
        primary: {
          light: "#FFEAEC",
          normal: "#FFD1D5",
          strong: "#FFB7Be",
        },
        secondary: {
          light: "#e4ffe3",
          normal: "#CBFFC9",
          strong: "#b2ffb0",
        },
      },
    },
  },
  plugins: [],
};
