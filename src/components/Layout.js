import React from 'react'
import { ThemeProvider } from 'emotion-theming'
import Helmet from 'react-helmet'
import '../styles/global'
import theme from '../styles/theme'
import config from '../utils/siteConfig'
import Wrapper from '../components/Wrapper'
import Menu from '../components/Menu'
import Transition from '../components/transition'

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
