import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

const Wrapper = styled.section`
  position: sticky;
  z-index: 99;
  background: ${props => props.theme.colors.base};
  top: 3.5rem;
  margin: 0 auto;
  padding: 0 2rem 2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
`
const BackButton = styled(Link)`
  position: fixed;
  top: 3.5rem;
  left: 2rem;
  text-decoration: none;
`
const Title = styled.h1`
  text-transform: uppercase;
  text-align: center;
  margin: 0 0 2rem;
  line-height: 1.2;
  color: ${props => props.theme.colors.tertiary};
  a {
    transition: all 0.2s;

    &:hover {
      color: ${props => props.theme.colors.highlight};
    }
  }
`
const List = styled.ul`
  text-transform: capitalize;
  font-weight: 600;
  width: 100%;
  padding: 0 1rem;
  text-align: center;
  display: block;
  position: relative;
`

const Tag = styled.li`
  display: inline-block;
  a {
    transition: 0.2s;
    background: ${props => props.theme.colors.tertiary};
    padding: 0.5rem 1rem;
    text-transform: capitalize;
    margin: 0 0.5em 0 0;
    text-decoration: none;
    color: ${props => props.theme.colors.base};
    &:hover {
      background: ${props => props.theme.colors.secondary};
    }
  }
`

const GalleryHead = props => {
  return (
    <Wrapper>
      <BackButton to="/">⬅ Back</BackButton>
      <Title>{props.title}</Title>
      <List>
        {props.tags.map(tag => (
          <Tag key={tag.id}>
            <Link to={`/tag/${tag.slug}/`}>{tag.title}</Link>
          </Tag>
        ))}
      </List>
    </Wrapper>
  )
}

export default GalleryHead
