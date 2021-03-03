const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./pages/**/*.js', './components/**/*.js', './elements/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      'md': '720px',
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        eigengrau: '#16161D',
        accent: '#D8D8C7',
        titleg1: '#A56D5E',
        titleg2: '#E88B6A',
        overlayg1: '#00000088',
        overlayg2: '#FFFFFF44',
        cta: colors.blue,
      },
      margin: {
        '-menu': '-28rem',
      },
      typography: {
        DEFAULT: {
          css: {
            a: {
              color: '#FFFFFF',
              '&:hover': {
                color: '#D8D8C7',
              },
            },
          },
        },
      },
      scale: {
        '115': '1.15',
      },
      rotate: {
        '4': '4deg',
        '-4': '-4deg',
      },
      spacing: {
         'max2': '26rem',
         'max3': '40rem',

       },
    },
  },
  variants: {
    extend: { transform: ['hover', 'focus', 'group-hover'], rotate: ['odd', 'even', 'group-hover'], scale: ['hover', 'focus', 'group-hover'], },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/aspect-ratio')],
}
