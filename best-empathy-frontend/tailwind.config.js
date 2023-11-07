/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        denim: {
          50: "#f2f7fd",
          100: "#e3eefb",
          200: "#c1ddf6",
          300: "#8bc0ee",
          400: "#4da0e3",
          500: "#2785d0",
          600: "#196cb8",
          700: "#15538f",
          800: "#154777",
          900: "#173d63",
          950: "#0f2742",
        },
        "mint-tulip": {
          50: "#f1fcfb",
          100: "#c6f4f1",
          200: "#a3ece9",
          300: "#6ddbda",
          400: "#3ec0c3",
          500: "#25a2a7",
          600: "#1b8086",
          700: "#1a656b",
          800: "#195156",
          900: "#194448",
          950: "#08272b",
        },
        // ...
      },
    },
  },
  // plugins: [require("@tailwindcss/forms")],
  plugins: [],
});
