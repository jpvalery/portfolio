import React from 'react';
import styled from 'styled-components';

import * as palette from '../../config/Style';

const Wrapper = styled.div`
    height: ${palette.CONTENT_HEIGHT};;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    img{height:1.618rem;margin:0;}

`;

const Content = styled.p`
    color: ${palette.SECONDARY_COLOR};
    padding: 1rem;
    text-align: center;
    font-size: 10px;
    line-height: 12px;
`;

const Footer = () => (
<Wrapper>
  <Content>
        &copy; {(new Date().getFullYear())} Matthias Jordan Photographer. <br/>Made with ♡ in Santa Monica, California, USA.
  </Content>
  <Content>
  Built with
  </Content>
  <a href="https://www.gatsbyjs.org"><img src="https://camo.githubusercontent.com/ac31ac54c2013850b0fb8a3a4926f4718a398fb3/68747470733a2f2f7777772e6761747362796a732e6f72672f6d6f6e6f6772616d2e737667" /></a>
</Wrapper>
);

export default Footer;
