import React from 'react'
import styled, { css } from 'react-emotion'
import { Link } from 'gatsby'

const ProjectLink = styled(Link)`
  text-decoration: none;
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    width: 25%;
    transition: all 0.5s;
    h1 {
      color: ${props => props.theme.colors.secondary};
    }
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
const Title = styled.h1`
  padding: 0 0 2rem;
  text-transform: uppercase;
  text-align: center;
  position: relative;
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    padding: 2rem;
    z-index: 3;
    text-transform: uppercase;
    text-align: center;
  }
`
const Date = styled.p`
  text-align: center;
  text-transform: uppercase;
  position: relative;
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    text-transform: capitalize;
    padding: 0 1rem 1rem;
  }
`

const TagList = props => {
  return (
    <ProjectLink key={props.id} to={`${props.slug}/`}>
      <Title>{props.title}</Title>
      <Date>{props.date}</Date>
    </ProjectLink>
  )
}

export default TagList
