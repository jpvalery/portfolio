import Typography from 'typography'
import { MOBILE_MEDIA_QUERY } from 'typography-breakpoint-constants'

const typography = new Typography({
  title: 'Wordpress Theme 2016',
  baseFontSize: '16px',
  baseLineHeight: 1.75,
  scaleRatio: 5 / 2,
  googleFonts: [
    {
      name: 'IBM Plex Sans',
      styles: ['700'],
    },
    {
      name: 'IBM Plex Serif',
      styles: ['400', '400i', '700', '700i'],
    },
    {
      name: 'IBM Plex Mono',
      styles: ['400'],
    },
  ],
  headerFontFamily: ['IBM Plex Sans', 'Helvetica', 'serif'],
  bodyFontFamily: ['IBM Plex Serif', 'Georgia', 'serif'],
  bodyColor: '#223843',
  headerWeight: 700,
  bodyWeight: 400,
  boldWeight: 700,
  overrideStyles: ({ adjustFontSizeTo, scale, rhythm }, options) => ({
    blockquote: {
      ...scale(1 / 5),
      fontStyle: 'italic',
      paddingLeft: rhythm(13 / 16),
      marginLeft: rhythm(-1),
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
    'pre[class*="language-"],code[class*="language-"]': {
      fontFamily: ['IBM Plex Mono', 'monospace'].join(','),
    },
    ul: {
      listStyle: 'disc',
    },
    'ul,ol': {
      marginLeft: 0,
    },
    [MOBILE_MEDIA_QUERY]: {
      'ul,ol': {
        marginLeft: rhythm(1),
      },
      blockquote: {
        marginLeft: rhythm(-3 / 4),
        marginRight: 0,
        paddingLeft: rhythm(9 / 16),
      },
    },
    'h1,h2,h3,h4,h5,h6': {
      color: '#100B00',
      fontFamily: ['IBM Plex Sans', 'sans-serif'].join(','),
      fontWeight: options.headerWeight,
    },
    h4: {
      letterSpacing: '0.140625em',
      textTransform: 'uppercase',
    },
    h6: {
      fontStyle: 'italic',
    },
    a: {
      color: '#100B00',
      textDecoration: 'none',
    },
    'a:hover,a:active': {
      boxShadow: 'none',
    },
    'mark,ins': {
      color: 'white',
      padding: `${rhythm(1 / 16)} ${rhythm(1 / 8)}`,
      textDecoration: 'none',
    },
  }),
})

const { rhythm, scale } = typography

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export { rhythm, scale, typography as default }
