import React from 'react'
import styled from 'react-emotion'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

const ProjectLink = styled(Link)`
  text-decoration: none;
  padding: 0;
  margin: 0;
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
      color: ${props => props.theme.colors.highlight} !important;
    }
  }
`
const Cover = styled.div`
  div {
    background: ${props => props.theme.colors.base};
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
  margin: 0;
  padding: 1rem 2rem 0;
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    padding: 0;
  }
`
const Date = styled.h4`
  margin: 0;
  text-transform: none;
  padding: 0.25rem 2rem;
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    padding: 0.25rem 0;
  }
`
const Excerpt = styled.p`
  margin: 0;
  font-weight: normal;
  text-transform: none;
  padding: 0.25rem 2rem 2rem;
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    padding: 0.25rem 0 0;
  }
`
const BlogList = props => {
  return (
    <ProjectLink key={props.id} to={`/blog/${props.slug}/`}>
      <Cover>
        <Img fluid={props.image.fluid} />
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
