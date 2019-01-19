import React from 'react'
import styled from 'react-emotion'
import Img from 'gatsby-image'

const Wrapper = styled.div`
  width: 100%;
  padding: 0;
`

const Hero = styled.div`
  position: relative;
  width: calc(100%);
  margin: 0 auto;
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    grid-area: left;
    pointer-events: none;
    transition: opacity 0.3s, visibility 0.3s;
    height: 55vh;
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
        <Img fluid={props.image.fluid} />
      </Hero>
    </Wrapper>
  )
}

export default ArticleHero
