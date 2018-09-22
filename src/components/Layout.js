import React from 'react'
import { ThemeProvider } from 'emotion-theming'
import Helmet from 'react-helmet'
import '../styles/global'
import theme, * as palette from '../styles/themeDark'
import config from '../utils/siteConfig'
import Wrapper from '../components/Wrapper'
import Menu from '../components/Menu'
import Transition from '../components/Transition'

import { injectGlobal } from 'emotion'

injectGlobal`
body {
  background: ${palette.BASE} !important;
  color: ${palette.SECONDARY} !important;
}
h1,h2,h3,h4,h5,h6,a {
  color: ${palette.TERTIARY};
}
a{
  &:hover {
    color: ${palette.HIGHLIGHT} !important;
  }
}
`

const Layout = ({ children, location }) => {
  return (
    <div className="siteRoot">
      <Helmet>
        <html lang="en" />
        <title>{config.siteTitle}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logos/logo-512.png" />
        <link rel="apple-touch-icon" href="/logos/logo-512.png" />
        <meta name="description" content={config.siteDescription} />
        <meta property="og:title" content={config.siteTitle} />
        <meta property="og:url" content={config.siteUrl} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={config.siteTitle} />
      </Helmet>

      <ThemeProvider theme={theme}>
        <Wrapper>
          <Menu />
          <Transition location={location}>
            <div className="siteContent">{children}</div>
          </Transition>
        </Wrapper>
      </ThemeProvider>
    </div>
  )
}

export default Layout
