import { nextui } from "@nextui-org/react";
import { colorList } from "./src/shared/utils/constant.utils";

/** @type {import('tailwindcss').Config} */

const colorSafeList = colorList.reduce((prev, colorName) => {
  const shades = [500, 600];
  shades.map((shade) => {
    prev.push(`text-${colorName}-${shade}`);
    prev.push(`bg-${colorName}-${shade}`);
    prev.push(`hover:bg-${colorName}-400/10`);
  });
  return prev;
}, []);

export default {
  safelist: colorSafeList,
  content: [
    "./index.html",
    "./src/**/*.{tsx, ts, jsx, js}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      screens: {
        xl: "100%",
        lg: "1380px",
      },
    },
    extend: {
      colors: {
        brown: {
          50: "#FFEFE0",
          100: "#FFDCBD",
          200: "#FFBB80",
          300: "#FF983D",
          400: "#FF7700",
          500: "#BE5900",
          600: "#994700",
          700: "#703400",
          800: "#4D2400",
          900: "#241100",
          950: "#140A00",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [
    require("@tailwindcss/typography"),
    nextui({
      addCommonColors: true,
      layout: {
        radius: {
          small: 4, // rounded-small
          medium: 6, // rounded-medium
          large: 8, // rounded-large
        },
      },
      themes: {
        light: {
          colors: {
            primary: {
              50: "#eaeaea",
              500: "#000",
              600: "#000",
              foreground: "#fff",
              DEFAULT: "#000",
            },
          },
        },
        dark: {
          colors: {
            primary: {
              500: "#fff",
              600: "#fff",
              foreground: "#000",
              DEFAULT: "#fff",
            },
          },
        },
      },
    }),
  ],
};
