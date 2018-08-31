import React from 'react'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { Link } from 'gatsby'

const Wrapper = styled.section`
  position: relative;
  width: 50%;
  display: flex;
  flex-direction: column;
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
    div {
      height: 100% !important;
      object-fit: cover !important;
    }
  }
`
const Title = styled.h1`
  font-size: 3em;
  text-transform: capitalize;
  font-weight: 600;
  position: fixed;
  background: ${props => props.theme.colors.tertiary};
  padding: 1rem;
  max-width: ${props => props.theme.sizes.maxWidthCentered};
  transform: translate(-50%, -50%);
  top: 30%;
  left: 25%;
  text-align: center;
  color: ${props => props.theme.colors.base};
`
const TitleCopy = styled.p`
  font-size: 1em;
  text-transform: uppercase;
  font-weight: 600;
  position: fixed;
  max-width: ${props => props.theme.sizes.maxWidthCentered};
  background: ${props => props.theme.colors.tertiary};
  padding: 0.5rem 1rem;
  top: 40%;
  left: 25%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: ${props => props.theme.colors.base};
  display: inline-block;
  span {
    font-weight: 600;
  }
`
const List = styled.ul`
  font-size: 1em;
  text-transform: capitalize;
  font-weight: 600;
  position: fixed;
  width: 100%;
  max-width: ${props => props.theme.sizes.maxWidthCentered};
  padding: 0 1rem;
  top: 47.5%;
  left: 25%;
  transform: translate(-50%, -50%);
  text-align: center;
  display: inline-block;
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

const BlogHero = props => (
  <Wrapper>
    <Cover>
      <Img fluid={props.image.fluid} backgroundColor={'#eeeeee'} />
    </Cover>
    <Title>{props.title}</Title>
    <TitleCopy>
      Published: {props.date} || Reading time: {props.time} min
    </TitleCopy>
    <List>
      {props.tags.map(tag => (
        <Tag key={tag.id}>
          <Link to={`/tag/${tag.slug}/`}>{tag.title}</Link>
        </Tag>
      ))}
    </List>
  </Wrapper>
)

export default BlogHero
