import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

const List = styled.ul`
  margin: 2rem auto;
  text-align: center;
  max-width: ${props => props.theme.sizes.maxWidthCentered};
`

const Tag = styled.li`
  text-align: center;
  margin: 0 auto;
  display: inline-block;
  a {
    margin: 0 0.5rem;
    font-size: 14px;
    font-weight: normal;
    transition: 0.2s;
    background: ${props => props.theme.colors.tertiary};
    padding: 0.5em;
    border-radius: 2px;
    text-transform: capitalize;
    text-decoration: none;
    color: ${props => props.theme.colors.base};
    &:hover {
      background: ${props => props.theme.colors.highlight};
    }
  }
`

const TagList = props => {
  return (
    <List>
      {props.tags.map(tag => (
        <Tag key={tag.id}>
          <Link to={`/tag/${tag.slug}/`}>{tag.title}</Link>
        </Tag>
      ))}
    </List>
  )
}

export default TagList
