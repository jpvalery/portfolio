import Typography from "typography";

const typography = new Typography({
  title: 'I AM MATTHIAS',
  baseFontSize: '16px',
  baseLineHeight: 1.618,
  headerFontFamily: ['Cardo', 'Georgia', 'serif'],
  bodyFontFamily: ['Raleway', 'Helvetica', 'Arial', 'sans-serif'],
  headerWeight: 700,
  googleFonts: [
    {
      name: 'Cardo',
      styles: ['700'],
    },
    {
      name: 'Raleway',
      styles: ['400'],
    },
  ],
});

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles();
}

export default typography;
