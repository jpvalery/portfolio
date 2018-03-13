import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { injectGlobal } from "styled-components";

import * as palette from "../utils/styles";

import Nav from "../components/Nav";
import Footer from "../components/Footer";

const TemplateWrapper = ({ children }) => {
  /* eslint no-unused-expressions: off */
  injectGlobal`
:root {
  font-size: 16px;
  background: ${palette.BG_COLOR};
  @supports(padding: max(0px)) {
    padding-left: max(12px, env(safe-area-inset-left));
      padding-right: max(12px, env(safe-area-inset-right));
    }
  }
  body {
    background: ${palette.BG_COLOR};
    padding: 1rem;
    color: ${palette.COLOR};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  a {
    color: ${palette.SECONDARY_COLOR};
    transition: color 0.618s;
  }
  a:hover, a:focus {
   color: ${palette.HOVER_COLOR};
   transition:color 0.618s;
  }
  .hidden {
    display: none;
  }

`;
  return (
    <div>
      <Helmet>
        // COMMON TAGS
        <meta charset="utf-8" />
        <title>I Am Matthias</title>
        <meta name="viewport" content="initial-scale=1, viewport-fit=cover" />
        // Search Engine
        <meta
          name="description"
          content="Portfolio of content creator Matthias Kronfeld Jordan, based in Santa Monica, California "
        />
        <meta
          name="image"
          content="https://staging.iammatthias.com/Logo_export.40pt.svg"
        />
        // Schema.org for Google
        <meta itemprop="name" content="I Am Matthias" />
        <meta
          itemprop="description"
          content="Portfolio of content creator Matthias Kronfeld Jordan, based in Santa Monica, California "
        />
        <meta
          itemprop="image"
          content="https://images.ctfassets.net/34j7b1jydvza/2RuegZGLxeciwmwAU6uWUQ/0dbaea1d7676c2504359711433977366/aerial-018.jpg?w=600&h=450&q=50"
        />
        // Twitter
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="I Am Matthias" />
        <meta
          name="twitter:description"
          content="Portfolio of content creator Matthias Kronfeld Jordan, based in Santa Monica, California "
        />
        <meta name="twitter:site" content="@iammatthias" />
        <meta name="twitter:creator" content="@iammatthias" />
        <meta
          name="twitter:image"
          content="https://images.ctfassets.net/34j7b1jydvza/2RuegZGLxeciwmwAU6uWUQ/0dbaea1d7676c2504359711433977366/aerial-018.jpg?w=600&h=450&q=50"
        />
        // Open Graph general (Facebook, Pinterest & Google+)
        <meta name="og:title" content="I Am Matthias" />
        <meta
          name="og:description"
          content="Portfolio of content creator Matthias Kronfeld Jordan, based in Santa Monica, California "
        />
        <meta
          name="og:image"
          content="https://images.ctfassets.net/34j7b1jydvza/2RuegZGLxeciwmwAU6uWUQ/0dbaea1d7676c2504359711433977366/aerial-018.jpg?w=600&h=450&q=50"
        />
        <meta name="og:url" content="https://staging.iammatthias.com" />
        <meta name="og:site_name" content="I Am Matthias" />
        <meta name="og:type" content="website" />
      </Helmet>

      <Nav />
      {children()}
      <Footer />
    </div>
  );

  TemplateWrapper.propTypes = {
    children: PropTypes.func
  };
};

export default TemplateWrapper;
