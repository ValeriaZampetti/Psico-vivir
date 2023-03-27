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
          normal: "#9ED1CD",
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
