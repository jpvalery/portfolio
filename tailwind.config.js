const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./pages/**/*.js", "./components/**/*.js", "./elements/**/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        eigengrau: '#16161D',
        accent: '#D8D8C7',
        titleg1: '#A56D5E',
        titleg2: '#E88B6A',
        cta: colors.blue,
      },
      margin: {
       '-menu': '-28rem',
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
