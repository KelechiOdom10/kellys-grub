const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["'Lato', sans-serif", defaultTheme.fontFamily.sans],
      heading: ["Red Hat Display', sans-serif", defaultTheme.fontFamily.sans],
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      red: colors.red,
      dark: "#383634",
      neutral: {
        100: "#fefefe",
        200: "#fdfcfc",
        300: "#fbfbfb",
        400: "#faf9f9",
        500: "#f9f8f8",
        550: "#F6F4F3",
        600: "#EDEAE7",
        700: "#EAE8E5",
        800: "#E8E5E3",
        900: "#E5E3E1",
        DEFAULT: "#f9f8f8",
      },
      brand: {
        100: "#dbe5e5",
        200: "#b7cbcb",
        300: "#94b0b1",
        400: "#709697",
        500: "#4c7c7d",
        600: "#3d6364",
        700: "#2e4a4b",
        800: "#1e3232",
        900: "#0f1919",
        DEFAULT: "#4c7c7d",
      },
      secondary: {
        100: "#fadede",
        200: "#f4bdbd",
        300: "#ef9b9b",
        400: "#e97a7a",
        500: "#e45959",
        600: "#b64747",
        700: "#893535",
        800: "#5b2424",
        900: "#2e1212",
        DEFAULT: "#e45959",
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [],
};
