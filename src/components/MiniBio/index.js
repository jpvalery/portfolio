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
`;

const MiniBio = () => (
<Wrapper>
  <Content>
  Matthias Jordan
  <br/>Photographer & Content Creator
  <br/>Product & Marketing Coordinator @ Surf Air
  </Content>
</Wrapper>
);

export default MiniBio;
