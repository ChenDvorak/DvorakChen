const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{ts,tsx,jsx,js}"],
  theme: {
    colors: {
      primary: "var(--color-primary)",
      secondary: "var(--color-secondary)",
      text: "var(--color-text)",
      bg: "var(--color-bg)",
      red: colors.red,
      gray: colors.gray,
      white: colors.white,
    },
    extend: {
      backgroundImage: {
        snow: "url('/assets/snow.jpg')",
        'x-img': "url('/x-img.svg')",
      },
    },
  },
  plugins: [],
};
