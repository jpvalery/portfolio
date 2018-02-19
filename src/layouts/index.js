import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { injectGlobal } from 'styled-components';

import * as palette from '../utils/styles';

import Nav from '../components/Nav';
import Footer from '../components/Footer';

/* eslint no-unused-expressions: off */
injectGlobal`
  :root {
    font-size: 16px;
    padding: .5rem;
    background: ${palette.HTML_COLOR };
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
`;

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet
      title="I AM MATTHIAS"
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    />
      <Nav />
      {children()}
      <Footer />
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
