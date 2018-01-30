
import React from 'react';
import format from 'date-fns/format';
import styled from 'styled-components';
import Img from 'gatsby-image';

import * as palette from '../../config/Style';

const Header = styled.div`
    height: ${palette.CONTENT_HEIGHT};
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: ${palette.COLOR};
    background-image: url("/assets/coverimage_aerial.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;

`;

const Content = styled.div`
    padding: 1rem;
    position: relative;
    opacity: 1;
    z-index: 10;
`;


const Avatar = styled.div`
    height: 125px;
    width: 125px;
    margin: 0 auto;
    image-rendering: -moz-crisp-edges;
    image-rendering: -o-crisp-edges;
    image-rendering: -webkit-optimize-contrast;
    -ms-interpolation-mode: nearest-neighbor;
`;

const Hero = ({
  avatar
}) => (
    <Header>
      <Content>
          <Avatar>
            <img src="/assets/Logo_export.30pt.svg" />
          </Avatar>
      </Content>
    </Header>
);

export default Hero;
