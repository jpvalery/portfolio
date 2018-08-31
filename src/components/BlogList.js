import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

const Content = styled.div`
  width: 100%;
`
const ProjectLink = styled(Link)`
  text-decoration: none;
  display: grid;
  height: 100%;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-gap: 2rem;
  grid-template-areas: 'left right';
  align-items: center;
  transition: all 0.5s;
  h1 {
    color: ${props => props.theme.colors.secondary};
  }
  &:hover div {
    @media screen and (min-width: ${props => props.theme.responsive.medium}) {
      @supports (object-fit: cover) {
        display: block;
        opacity: 1;
        visibility: visible;
      }
    }
  }
  &:hover h1 {
    color: ${props => props.theme.colors.highlight};
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
    width: calc(50% - 4rem);
    height: calc(100vh - 2rem);
    top: 0;
    left: 2rem;
    z-index: -99;
    opacity: 0;
    visibility: hidden;
    div {
      height: 100% !important;
      object-fit: cover !important;
    }
  }
`
const Hero = styled.img`
  display: none;
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    display: block;
    visibility: visible;
    position: fixed !important;
    pointer-events: none;
    width: calc(50% - 4rem);
    height: calc(100vh - 2rem);
    top: 0;
    left: 2rem;
    z-index: -100;
    object-fit: cover !important;
  }
`
const Right = styled.div`
  grid-area: right;
`
const Title = styled.h1`
  grid-area: right;
  padding: 1rem;
  z-index: 3;
  text-transform: uppercase;
  text-align: center;
`
const Date = styled.p`
  text-align: center;
  text-transform: capitalize;
  padding: 0 1rem 1rem;
  span {
    font-weight: 600;
  }
`

const BlogList = props => {
  return (
    <Content key={props.id}>
      <ProjectLink to={`/blog/${props.slug}/`}>
        <Cover>
          <Img fluid={props.image.fluid} backgroundColor={'#eeeeee'} />
        </Cover>
        <Right>
          <Title>{props.title}</Title>
          <Date>{props.date}</Date>
        </Right>
      </ProjectLink>
      <Hero
        src="https://images.ctfassets.net/34j7b1jydvza/9JniDzvzIkUE48MKowk6s/d506346e5d4088f9ee9e46d9c51fe682/aerial-001.jpg"
        alt=""
      />
    </Content>
  )
}

export default BlogList
