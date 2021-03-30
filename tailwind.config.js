const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./pages/**/*.js', './components/**/*.js', './elements/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      md: '720px',
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
      width: {
        '9/10': '92%',
      },
      height: {
        '9/10': '92%',
      },
      zIndex: {
        100: '100',
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
            strong: {
              color: '#D8D8C7',
            },
          },
        },
      },
      scale: {
        115: '1.15',
      },
      rotate: {
        4: '4deg',
        '-4': '-4deg',
      },
      spacing: {
        max2: '26rem',
        max3: '40rem',
      },
      animation: {
        'pulse-slow': 'pulse 3s infinite',
      },
    },
  },
  variants: {
    extend: {
      transform: ['hover', 'focus', 'group-hover'],
      rotate: ['odd', 'even', 'group-hover', '3n'],
      translate: ['odd', 'even', 'group-hover', '3n'],
      scale: ['hover', 'focus', 'group-hover'],
      inset: ['first', 'even', 'odd', '3n'],
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    plugin(function ({ addVariant, e }) {
      addVariant('3n', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`3n${separator}${className}`)}:nth-child(3n+0)`
        })
      })
    }),
  ],
}
