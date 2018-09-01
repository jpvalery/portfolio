import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

const Wrapper = styled.div`
  width: 100%;
`

const Hero = styled.img`
  display: none;
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    display: block;
    visibility: visible;
    position: fixed !important;
    pointer-events: none;
    width: calc(50% - 4rem);
    height: calc(100vh - 5.5rem);
    top: 3.5rem;
    left: 2rem;
    z-index: 1;
    object-fit: cover !important;
  }
`

const PortfolioHero = props => {
  return (
    <Wrapper>
      <Hero
        src="https://images.ctfassets.net/34j7b1jydvza/9JniDzvzIkUE48MKowk6s/d506346e5d4088f9ee9e46d9c51fe682/aerial-001.jpg"
        alt=""
      />
    </Wrapper>
  )
}

export default PortfolioHero
