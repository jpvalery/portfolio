import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

const Wrapper = styled.section`
  position: fixed;
  top: 3.5rem;
  z-index: 100;
  background: ${props => props.theme.colors.base};
  margin: 0;
  padding: 0 0 2rem;
  width: calc(100%);
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
const Date = styled.p`
  margin-bottom: 1rem;
  padding: 0.25rem 1rem;
  text-align: left;
  text-transform: uppercase;
  text-transform: capitalize;
  position: relative;
  background: ${props => props.theme.colors.base};
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

const Container = props => {
  return (
    <Wrapper>
      <BackButton to="/blog/">⬅ Back</BackButton>
      <Title>{props.title}</Title>
      <Date>
        {props.date} | Reading time: {props.time} min
      </Date>
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

export default Container
