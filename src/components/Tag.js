import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

const Content = styled.div`
  width: 100%;
`
const ProjectLink = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-gap: 2rem;
  grid-template-areas: 'left right';
  align-items: center;
  &:hover div {
    @media screen and (min-width: ${props => props.theme.responsive.medium}) {
      @supports (object-fit: cover) {
        display: block;
        opacity: 1;
        visibility: visible;
      }
    }
  }
`
const Cover = styled.div`
  grid-area: left;
  position: relative;
  transition: none;
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    position: fixed !important;
    pointer-events: none;
    transition: opacity 0.3s, visibility 0.3s;
    width: calc(50% - 2rem);
    height: 100vh;
    top: 0;
    left: 0;
    z-index: -99;
    opacity: 0;
    visibility: hidden;
    div {
      height: 100% !important;
      object-fit: cover !important;
    }
  }
`
const Title = styled(Link)`
  grid-area: right;
  font-size: 1.5em;
  font-weight: 600;
  text-transform: uppercase;
  padding: 2rem 0;
  text-decoration: none;
`
const Hero = styled.img`
  display: none;
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    display: block;
    visibility: visible;
    position: fixed !important;
    pointer-events: none;
    width: calc(50% - 2rem);
    height: 100vh;
    top: 0;
    left: 0;
    z-index: -100;
    object-fit: cover !important;
  }
`

const Home = props => {
  return (
    <Content key={props.id}>
      <ProjectLink>
        <Cover>
          <Img fluid={props.image.fluid} backgroundColor={'#eeeeee'} />
        </Cover>
        <Title to={`/${props.slug}/`}>{props.title}</Title>
      </ProjectLink>
      <Hero
        src="https://images.ctfassets.net/34j7b1jydvza/9JniDzvzIkUE48MKowk6s/d506346e5d4088f9ee9e46d9c51fe682/aerial-001.jpg"
        alt=""
      />
    </Content>
  )
}

export default Home
