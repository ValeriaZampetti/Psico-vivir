/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#49a3a2",
          normal: "#1C8C8B",
          strong: "#197e7d",
        },
        secondary: {
          light: "#b1dad7",
          normal: "#9ED1CD",
          strong: "#8ebcb8",
        },
        tertiary: {
          normal: "#9AC1BA",
        },
        quaternary: {
          normal: "#c7edfa",
        },
      },
    },
  },
  plugins: [],
};
