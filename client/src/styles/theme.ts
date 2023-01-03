import { MantineThemeOverride } from "@mantine/core";

export const theme: MantineThemeOverride = {
  colorScheme: "light",
  fontFamily: "'Lato', sans-serif",
  headings: {
    fontFamily: "Red Hat Display', sans-serif",
  },
  colors: {
    brand: [
      "#ADB7B7",
      "#9AA9A9",
      "#889D9E",
      "#779495",
      "#678C8D",
      "#598384",
      "#4C7C7D",
      "#496B6C",
      "#455E5E",
      "#405252",
    ],
    secondary: [
      "#FCFBFB",
      "#EEE4E4",
      "#E3CCCC",
      "#DCB3B3",
      "#D99999",
      "#DB7B7B",
      "#E45959",
      "#D15353",
      "#BE4E4E",
      "#A94E4E",
    ],
    neutral: [
      "#F9F8F8",
      "#F6F6F6",
      "#F4F4F3",
      "#F2F1F0",
      "#F0EFED",
      "#EEECEA",
      "#EDEAE7",
      "#EAE8E5",
      "#E8E5E3",
      "#E5E3E1",
    ],
    dark: [
      "#61605F",
      "#585756",
      "#504F4E",
      "#494847",
      "#434140",
      "#3D3B3A",
      "#383634",
      "#32312F",
      "#2D2C2B",
      "#282727",
    ],
  },
  primaryColor: "brand",
  primaryShade: 6,
  globalStyles: theme => ({
    "*, *::before, *::after": {
      boxSizing: "border-box",
    },
    body: {
      ...theme.fn.fontStyles(),
      backgroundColor: theme.colors.neutral[3],
      color: theme.colors.dark,
      lineHeight: theme.lineHeight,
    },
  }),
};
