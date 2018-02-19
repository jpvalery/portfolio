import React from 'react';
import styled from 'styled-components';

import * as palette from '../../utils/styles';

const Wrapper = styled.div`
    height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    img{height:1.618rem;margin:0;}

`;

const Content = styled.p`
    color: ${palette.SECONDARY_COLOR };
    padding: 1rem;
    text-align: center;
    font-size: 10px;
    line-height: 12px;
    margin: 0;
`;

const Icon = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: relative;
    img{height:1.618rem;margin:1rem;}

`;

const Footer = () => (
<Wrapper>
  <Content>
        &copy; {(new Date().getFullYear())} Matthias Jordan Photographer. <br/>Made with ♡ in Santa Monica, California, USA.
  </Content>
  <Icon>
  <a href="https://www.gatsbyjs.org" rel="nofollow"><img src="https://camo.githubusercontent.com/ac31ac54c2013850b0fb8a3a4926f4718a398fb3/68747470733a2f2f7777772e6761747362796a732e6f72672f6d6f6e6f6772616d2e737667" /></a>
  <a href="https://www.contentful.com/" rel="nofollow"><img src="https://images.contentful.com/fo9twyrwpveg/44baP9Gtm8qE2Umm8CQwQk/c43325463d1cb5db2ef97fca0788ea55/PoweredByContentful_LightBackground.svg"/></a>
  <a href="https://www.netlify.com" rel="nofollow"><img src="https://cdn.netlify.com/1e66438712c70d3dfdcfe11f31e467864f94b803/b2c28/img/press/logos/full-logo-light.svg"/></a>

</Icon>
</Wrapper>
);

export default Footer;
