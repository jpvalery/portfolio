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



const Hero = ({
  avatar
}) => (
    <Header/>
);

export default Hero;
