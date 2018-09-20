import React from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'

const Wrapper = styled.div`
  width: 100%;
  padding: 0;
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    padding: 0 2rem;
  }
`

const Hero = styled.div`
  position: relative;
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    grid-area: left;
    pointer-events: none;
    transition: opacity 0.3s, visibility 0.3s;
    width: 100%;
    height: 50vh;
    z-index: -99;
    div {
      height: 100% !important;
      object-fit: cover !important;
    }
  }
`

const ArticleHero = props => {
  return (
    <Wrapper>
      <Hero>
        <Img fluid={props.image.fluid} backgroundColor={'#eeeeee'} />
      </Hero>
    </Wrapper>
  )
}

export default ArticleHero
