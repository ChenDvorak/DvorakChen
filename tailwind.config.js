const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,jsx,js}"],
  theme: {
    colors: {
      primary: "var(--color-primary)",
      secondary: "var(--color-secondary)",
      text: "var(--color-text)",
      bg: "var(--color-bg)",
      red: colors.red,
      yellow: colors.yellow,
      gray: colors.gray,
      white: colors.white,
      orange: colors.orange
    },
    extend: {
      backgroundImage: {
        'snow-640-487': "url('/assets/snow-640-487.jpg')",
        'snow-1920-1463': "url('/assets/snow-1920-1463.jpg')",
        "x-img": "url('/x-img.svg')",
      },
    },
  },
  plugins: [],
};
