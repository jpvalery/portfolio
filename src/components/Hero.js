import React from 'react'
import styled from '@emotion/styled'
import Img from 'gatsby-image'

const Wrapper = styled.div`
  display: none;
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    display: block;
    grid-area: Right;
    width: 100%;
  }
`

const Hero = styled.div`
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    grid-area: right;
    position: fixed !important;
    pointer-events: none;
    transition: opacity 0.3s, visibility 0.3s;
    width: calc(50% - 3rem);
    height: calc(100vh - 5.5rem);
    top: 4rem;
    right: 2rem;
    z-index: -99;
    div {
      height: 66.67% !important;
      object-fit: contain !important;
      margin-top:16.65%;
    }
  }
`

const HomeHero = props => {
  return (
    <Wrapper>
      <Hero>
        <Img fluid={props.image.fluid} />
      </Hero>
    </Wrapper>
  )
}

export default HomeHero
