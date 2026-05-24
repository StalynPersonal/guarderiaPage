/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.html", "./js/**/*.js"],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  "#e8f4fd",
          100: "#c5e3f9",
          200: "#9fd0f5",
          300: "#6eb5ef",
          400: "#4aa0ea",
          500: "#2389e4",
          600: "#1976d2",  // color principal (igual que la app Blazor)
          700: "#1565c0",
          800: "#1154a8",
          900: "#0d3f80",
        },
        accent: {
          400: "#ffca28",
          500: "#ffb300",
          600: "#ff8f00",
        }
      },
      fontFamily: {
        sans: ["'Nunito'", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
