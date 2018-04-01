import React from "react";
import { withPrefix } from "gatsby-link";
import Img from "gatsby-image";
import styled from "styled-components";

import * as palette from "../../utils/styles";

const Footer = () => {
  const Wrapper = styled.footer`
    height: ${palette.FOOTER_HEIGHT};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    img {
      height: 1.618rem;
      margin: 0;
    }
  `;

  const Grid = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
    @media (max-width: 991px) {
      grid-template-columns: 1fr;
      grid-gap: 0.5rem;
    }
  `;
  const Social = styled.div`
    width: 100%;
    display: grid;
    grid-template-rows: 1fr;
    grid-gap: 0rem;
    @media (max-width: 991px) {
      grid-gap: 0.5rem;
    }
  `;
  const Content = styled.p`
    color: ${palette.SECONDARY_COLOR};
    padding: 1rem;
    text-align: left;
    font-size: 10px;
    margin: 0;

    @media (max-width: 991px) {
      text-align: center;
    }
  `;
  const Icon = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    position: relative;
    img {
      height: 1.618rem;
      margin: .618rem 1rem;
    }
    @media (max-width: 991px) {
      justify-content: center;
      img {
        margin: 0.25rem 1rem;
      }
    }
  `;
  const SocialIcon = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    position: relative;
    img {
      height: 1.382rem;
      margin: .618rem 1rem;
    }
    @media (max-width: 991px) {
      justify-content: center;
      img {
        margin: 0.25rem 1rem;
      }
    }
  `;

  return (
    <Wrapper>
      <Grid>
        <Content>
          &copy; {new Date().getFullYear()} Matthias Kronfeld Jordan
          <br />Photographer & Content Creator
          <br />Product & Marketing Coordinator @ Surf Air
          <br />Made with ♡ in Santa Monica, California, USA.
        </Content>
        <Social>
          <SocialIcon>
            <a href="https://instagram.com/iammatthias/">
              <img src={withPrefix("./instagram.svg")} />
            </a>
            <a href="https://twitter.com/iamMatthias">
              <img src={withPrefix("./twitter.svg")} />
            </a>
            <a href="https://www.linkedin.com/in/iammatthias/">
              <img src={withPrefix("./linkedin.svg")} />
            </a>
            <a href="https://www.facebook.com/iammatthias">
              <img src={withPrefix("./facebook.svg")} />
            </a>
            <a href="/resume">
              <img src={withPrefix("./file-text.svg")} />
            </a>
          </SocialIcon>
          <Icon>
            <a href="https://www.contentful.com/" rel="nofollow">
              <img src="https://images.contentful.com/fo9twyrwpveg/44baP9Gtm8qE2Umm8CQwQk/c43325463d1cb5db2ef97fca0788ea55/PoweredByContentful_LightBackground.svg" />
            </a>
            <a href="https://www.gatsbyjs.org" rel="nofollow">
              <img src="https://camo.githubusercontent.com/ac31ac54c2013850b0fb8a3a4926f4718a398fb3/68747470733a2f2f7777772e6761747362796a732e6f72672f6d6f6e6f6772616d2e737667" />
            </a>
            <a href="https://www.netlify.com" rel="nofollow">
              <img src="https://cdn.netlify.com/1e66438712c70d3dfdcfe11f31e467864f94b803/b2c28/img/press/logos/full-logo-light.svg" />
            </a>
          </Icon>
        </Social>
      </Grid>
    </Wrapper>
  );
};

export default Footer;
