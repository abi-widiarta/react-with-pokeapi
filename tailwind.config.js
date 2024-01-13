/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        darkBlue: "#0093C9",
        darkBlue2: "#7BCFFF",
        lighBlue: "#B6E4FF",
        lightBlue2: "#E3F5FF",
        veryLightBlue: "#EAF7FF",
        softRed: "#FF8888",
        lightSoftRed: "#FFD3D3",
        softGreen: "#03E434",
        lightSoftGreen: "#C0FFCE",
        textDarkBlue: "#020051",
      },
      fontFamily: {
        manrope: ["Manrope", "sans-serif"],
      },
    },
  },
  plugins: [],
};
