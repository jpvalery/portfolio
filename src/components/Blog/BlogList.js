import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

const ProjectLink = styled(Link)`
  text-decoration: none;
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    transition: all 0.5s;
    display: inline-block;
    &:hover div {
      @supports (object-fit: cover) {
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
  position: relative;
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
    width: calc(50% - 3rem);
    height: calc(100vh - 5.5rem);
    top: 3.5rem;
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
  text-transform: uppercase;
  padding: 1rem 1rem 0;
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    padding: 0 2rem 0.25rem;
    z-index: 3;
  }
`
const Date = styled.h4`
  margin-bottom: 0;
  padding: 0.25rem 2rem;
  text-transform: none;
`
const Excerpt = styled.p`
  margin-bottom: 0;
  padding: 0.25rem 2rem 2rem;
  font-weight: normal;
  text-transform: none;
`
const BlogList = props => {
  return (
    <ProjectLink key={props.id} to={`/blog/${props.slug}/`}>
      <Cover>
        <Img fluid={props.image.fluid} backgroundColor={'#eeeeee'} />
      </Cover>
      <Title>{props.title}</Title>
      <Date>
        Published: {props.date} | Reading time: {props.time} min
      </Date>
      <Excerpt
        dangerouslySetInnerHTML={{
          __html: props.excerpt.childMarkdownRemark.excerpt,
        }}
      />
    </ProjectLink>
  )
}

export default BlogList
