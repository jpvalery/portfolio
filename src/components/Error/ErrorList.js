import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

const ProjectLink = styled(Link)`
  text-decoration: none;
  padding: 0 0 2rem 0;
  max-width: 21rem;
  &:hover h1 {
      color: var(--color-highlight) !important;
    }
`
const Cover = styled.div`
  div {
    height: 14rem !important;
    width: 21rem;
    object-fit: contain !important;
    display: block;
  }
`
const Title = styled.h2`
  text-transform: uppercase;
  margin: 0;
  padding: 1rem 1rem 0;
  &:hover{
    color: var(--color-highlight) !important;
  }

  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    padding: 0;
    z-index: 3;
  }
`

const Year = styled.h3`
  text-transform: uppercase;
  font-size: 1rem;
  z-index: 3;
  color: #d8d8c7;
`

const List = styled.ul`
  display: contents;
  position: relative;
    animation: fadeup 3.5s;
    animation-timing-function: cubic-bezier(.25,.1,.25,1) ;
`

const Tag = styled.li`
  display: inline-block;
  margin: 0 0.25rem;
    text-transform: uppercase;
    text-decoration: none;
    color: #d8d8c7;
`

const ErrorContent = props => {
  return (
    <ProjectLink key={props.id} to={`/${props.slug}/`}>
      <Cover>
        <Img fluid={props.image.fluid} />
      </Cover>
      <Title>{props.title}</Title>
      <Year>{props.year} &nbsp;- <List>{props.tags.map(tag => (
          <Tag key={tag.id}>
            {tag.title}
          </Tag>
        ))}
      </List></Year>
    </ProjectLink>
  )
}

export default ErrorContent
