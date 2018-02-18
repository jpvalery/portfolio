import Typography from 'typography';

const config = require('../../config/SiteConfig');

const typography = new Typography({
  title: 'I AM MATTHIAS',
  baseFontSize: config.baseFontSize,
  baseLineHeight: 1,
  headerFontFamily: ['Cardo', 'Georgia', 'serif'],
  bodyFontFamily: ['Raleway', 'Helvetica', 'Arial', 'sans-serif'], 
  headerWeight: 700,
  googleFonts: [
    {
      name: config.headerFontFamily,
      styles: ['700'],
    },
    {
      name: config.bodyFontFamily,
      styles: ['400'],
    },
  ],
});

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles();
}

export default typography;
