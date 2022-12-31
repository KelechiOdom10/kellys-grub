import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  fonts: {
    heading: "'Poppins', sans-serif",
    body: "'Poppins', sans-serif;",
    mono: "Menlo, monospace",
  },
  colors: {
    primary: {
      50: "#ffe3e3",
      100: "#ffc7c7",
      200: "#ffabab",
      300: "#ff8e8e",
      400: "#ff7272",
      500: "#ff5656",
      600: "#FF4F4F",
      700: "#aa3939",
      800: "#802b2b",
      900: "#551d1d",
    },
    secondary: {
      50: "#fffaf0",
      100: "#fee9bf",
      200: "#fddea0",
      300: "#fcd280",
      400: "#fcc760",
      500: "#fbbc40",
      600: "#d19d35",
      700: "#a77d2b",
      800: "#7e5e20",
      900: "#32260d",
    },
    gray: {
      50: "#f3f3f3",
      100: "#edf2f7",
      200: "#e2e8f0",
      300: "#cbd5e0",
      400: "#a0aec0",
      500: "#595959",
      600: "#4a5568",
      700: "#353535",
      800: "#1a202c",
      900: "#171923",
    },
  },
});
