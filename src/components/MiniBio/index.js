import React from 'react';
import styled from 'styled-components';

import * as palette from '../../utils/styles';

const Wrapper = styled.div`
    height: 50vh;
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
    line-height: 12px;
`;

const MiniBio = () => (
<Wrapper>
  <Content>
        Hello, and welcome to the site.
  </Content>
</Wrapper>
);

export default MiniBio;
