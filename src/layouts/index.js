import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { injectGlobal } from 'styled-components';

import * as palette from '../utils/styles';

import Nav from '../components/Nav';
import Footer from '../components/Footer';

const TemplateWrapper = ({ children }) => {

/* eslint no-unused-expressions: off */
injectGlobal`
:root {
  font-size: 16px;

  background: ${palette.BG_COLOR };
  @supports(padding: max(0px)) {
      padding-left: env(safe-area-inset-left);
      padding-right:env(safe-area-inset-right);
}
  }
  body {
    background: ${palette.BG_COLOR };
    padding: 1rem;
    color: ${palette.COLOR };
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  a {
    color: ${palette.COLOR };
    text-decoration: none;
  }
  a:hover {
    color: ${palette.COLOR };
    text-decoration: none;
  }
  .gatsby-resp-image-wrapper {
    margin: 2.75rem 0;
  }
`
return (
  <div>
    <Helmet>
      <meta charSet="utf-8" />
      <title>I AM MATTHIAS</title>
      <meta name='viewport' content='initial-scale=1, viewport-fit=cover' />
      </Helmet>
      <Nav />
      {children()}
      <Footer />
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}
}

export default TemplateWrapper;
