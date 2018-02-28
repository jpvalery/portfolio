import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'

import { withPrefix } from 'gatsby-link'

import * as palette from '../../utils/styles'

const Hero = ({avatar}) => {

const NavBar = styled.div`
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #000000;
`
const NavLeft = styled.div`
padding: 1rem;
position: relative;
opacity: 1;
align-self: self-start;
display: flex;
align-items: center;
justify-content: center;
img{height:2rem;margin:0 1rem 0 0;}
h4 {margin:0;}
@media (max-width: 768px) {
  h4 {display: none;}
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
`

return (
<nav>
  <NavBar>
    <NavLeft>
      <a href="/"><img src={withPrefix('./Logo_export.40pt.svg')} /></a><a href="/"><h4>I AM MATTHIAS</h4></a>
    </NavLeft>
    <NavRight>
      <img src={withPrefix('./menu.svg')} />
    </NavRight>
  </NavBar>
</nav>
)
}

export default Hero;
