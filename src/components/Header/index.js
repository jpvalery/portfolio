import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components';

import * as palette from './../../utils/styles';

import heroImg from "./../../assets/20171222_bear-valley_008.jpg";
import Logo from "./../../assets/Logo_export.30pt.svg";

const Header = styled.div`
   height: 80vh;
   position: relative;
   display: flex;
   justify-content: center;
   flex-direction: column;
   color: ${palette.SECONDARY_COLOR };
   background: ${palette.SECONDARY_COLOR };
   background-image: url(./20171222_bear-valley_008.jpg);
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
          <img src={Logo} />
          </Avatar>
    </Header>
);

export default Hero;
