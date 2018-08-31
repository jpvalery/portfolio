import Typography from 'typography'
import { MOBILE_MEDIA_QUERY } from 'typography-breakpoint-constants'
import verticalRhythm from 'compass-vertical-rhythm'

const typography = new Typography({
  title: 'Plex',
  baseFontSize: '18px',
  baseLineHeight: 1.45,
  blockMarginBottom: 0.8,
  googleFonts: [
    {
      name: 'Open Sans',
      styles: ['400', '700'],
    },
  ],
  headerFontFamily: ['Open Sans', 'sans-serif'],
  bodyFontFamily: ['Open Sans', 'sans-serif'],
  bodyColor: 'black',
  headerWeight: 700,
  bodyWeight: 400,
  boldWeight: 700,
  scaleRatio: 2,
  overrideStyles: ({ adjustFontSizeTo, scale, rhythm }, options) => ({
    'h1,h2,h3,h4,h5,h6': {
      lineHeight: 1.1,
    },
    a: {
      color: '#223843',
      textDecoration: 'none',
      fontWeight: options.boldWeight,
    },
    'a:hover,a:active': {
      color: options.bodyColor,
    },
    blockquote: {
      ...scale(1 / 5),
      color: '223843',
      fontStyle: 'italic',
      paddingLeft: rhythm(13 / 16),
      marginLeft: 0,
      borderLeft: `${rhythm(3 / 16)} solid '#223843'`,
    },
    'blockquote > :last-child': {
      marginBottom: 0,
    },
    'blockquote cite': {
      ...adjustFontSizeTo(options.baseFontSize),
      color: options.bodyColor,
      fontWeight: options.bodyWeight,
    },
    'blockquote cite:before': {
      content: '"— "',
    },
    [MOBILE_MEDIA_QUERY]: {
      html: {
        fontSize: `${(16 / 16) * 100}%`,
      },
      blockquote: {
        marginLeft: rhythm(-3 / 4),
        marginRight: 0,
        paddingLeft: rhythm(9 / 16),
      },
    },
  }),
})

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
