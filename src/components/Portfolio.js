import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

const Content = styled.div`
  width: 100%;
  position: relative;
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    grid-gap: 2rem;
    grid-template-areas: '. right';
  }
`
const ProjectLink = styled(Link)`
  grid-area: right;
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    transition: all 0.5s;
    text-decoration: none;
    h1 {
      color: ${props => props.theme.colors.secondary};
    }
    &:hover div {
      @supports (object-fit: cover) {
        display: block;
        opacity: 1;
        visibility: visible;
      }
    }
    &:hover h1 {
      color: ${props => props.theme.colors.highlight};
    }
  }
`
const Cover = styled.div`
  div {
    height: 100% !important;
    width: 100%;
    object-fit: cover !important;
    display: block;
  }
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    position: fixed !important;
    pointer-events: none;
    transition: opacity 0.3s, visibility 0.3s;
    width: calc(50% - 4rem);
    height: calc(100vh - 2rem);
    top: 0;
    left: 2rem;
    z-index: 2;
    opacity: 0;
    visibility: hidden;
    div {
      height: 100% !important;
      object-fit: cover !important;
    }
  }
`
const Title = styled.h1`
  padding: 0 0 2rem;
  text-transform: uppercase;
  text-align: center;
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    padding: 2rem;
    z-index: 3;
    text-transform: uppercase;
    text-align: center;
  }
`
const Portfolio = props => {
  return (
    <Content key={props.id}>
      <ProjectLink to={`/${props.slug}/`}>
        <Cover>
          <Img fluid={props.image.fluid} />
        </Cover>
        <Title>{props.title}</Title>
      </ProjectLink>
    </Content>
  )
}

export default Portfolio
