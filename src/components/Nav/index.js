import React from 'react'
import Link from 'gatsby-link'
import Img from "gatsby-image"
import styled from 'styled-components'

import { withPrefix } from 'gatsby-link'

import * as palette from '../../utils/styles'

const Hero = ({avatar}) => {

const NavBar = styled.div`
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${palette.SECONDARY_COLOR };
`
const NavLeft = styled.div`
padding: 1rem;
position: relative;
opacity: 1;
align-self: self-start;
display: flex;
align-items: center;
justify-content: center;
a img {height:2rem;margin: 0;}
img{height: 100%;margin: 0;vertical-align:middle;}
h3 {margin:0 0 0 1rem;}
a h3 {color: ${palette.SECONDARY_COLOR };}
@media (max-width: 768px) {
  h3 {display: none;}
}
`
const NavRight = styled.div`
   padding: 1rem;
   position: relative;
   opacity: 1;
   align-self: self-end;
   display: flex;
   align-items: center;
   justify-content: center;
   img{height:1.618rem;margin:0 0 0 0;}
   h3 {margin:0 0 0 1rem;}
   a h3 {color: ${palette.SECONDARY_COLOR };}
`

const toggleMenu = () => {
  const wrapper = document.getElementById('nav');
  wrapper.classList.toggle('open--menu');
}

const closeMenu = () => {
  const wrapper = document.getElementById('nav');
  wrapper.classList.remove('open--menu');
}

return (
<nav>
  <NavBar>
    <NavLeft>
      <a href="/"><img src={withPrefix('./Logo_export.40pt.svg')} /></a><a href="/"><h3>I AM MATTHIAS</h3></a>
    </NavLeft>
    <NavRight>
      <a href="/about"><h3>ABOUT</h3></a>
    </NavRight>
  </NavBar>
</nav>
)
}

export default Hero;
