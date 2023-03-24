/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          normal: "#1C8C8B",
        },
        secondary: {
          normal: "#9ED1CD",
        },
        tertiary: {
          normal: "#628693",
        },
        quaternary: {
          normal: "#9AC1BA",
        },
      },
      screens: {
        "ml": "970px",
      },
    },
  },
  plugins: [],
};
