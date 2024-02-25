import { nextui } from "@nextui-org/react";
import { blue } from "tailwindcss/colors";
import { colorList } from "./src/shared/utils/constant.utils";

/** @type {import('tailwindcss').Config} */

const colorSafeList = colorList.reduce((prev, colorName) => {
  const shades = [500, 600];
  shades.map((shade) => {
    prev.push(`text-${colorName}-${shade}`);
    prev.push(`bg-${colorName}-${shade}`);
    prev.push(`outline-${colorName}-${shade}`);
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
          500: "#BC6D38",
          600: "#BC6D38",
          700: "#703400",
          800: "#4D2400",
          900: "#241100",
          950: "#140A00",
        },
        // red: { 500: "#CF5966" },
        yellow: { 500: "#e7c208" },
        // green: { 500: "#22915F" },
        purple: { 500: "#a368d9" },
        orange: { 500: "#f47e2a" },
        // cyan: { 500: "#99f7ff" },
        // blue: { 500: "#118ab2" },
      },
    },
  },
  darkMode: "class",
  plugins: [
    require("@tailwindcss/typography"),
    nextui({
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
            secondary: { blue, DEFAULT: blue[500] },
            focus: "#000000",
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
