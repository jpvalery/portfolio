import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components';

import { withPrefix } from 'gatsby-link'

import * as palette from './../../utils/styles';


const Header = styled.div`
   height: ${palette.HERO_HEIGHT };
   position: relative;
   display: flex;
   justify-content: center;
   flex-direction: column;
   color: ${palette.SECONDARY_COLOR };
   background: ${palette.SECONDARY_COLOR };
   background-image: url(./hero_trees.jpg);
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
          <Avatar>
          <img src={withPrefix('./Logo_export.30pt.svg')} />
          </Avatar>
    </Header>
);

export default Hero;
