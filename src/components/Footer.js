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

`;

const Content = styled.p`
    color: ${palette.SECONDARY_COLOR};
    padding: 1rem;
    text-align: center;
    font-size: 10px;
`;

const Footer = () => (
<Wrapper>
  <Content>
        &copy; {(new Date().getFullYear())} Matthias Jordan Photographer. <br/>Made with ♡ in Santa Monica, California, USA.
  </Content>
  <Content>
        Thank you for stopping by.
  </Content>
</Wrapper>
);

export default Footer;
