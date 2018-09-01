import React from 'react'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { Link } from 'gatsby'

const Wrapper = styled.section`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    position: relative;
    width: 50%;
    display: flex;
    flex-direction: column;
  }
`
const Hero = styled.div`
  position: relative;
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    grid-area: left;
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
  text-transform: capitalize;
  font-weight: 600;
  background: ${props => props.theme.colors.tertiary};
  padding: 1rem;
  text-align: center;
  color: ${props => props.theme.colors.base};
  position: relative;
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    max-width: ${props => props.theme.sizes.maxWidthCentered};
    position: fixed;
    transform: translate(-50%, -50%);
    top: 30%;
    left: 25%;
  }
`
const TitleCopy = styled.p`
  text-transform: uppercase;
  font-weight: 600;
  background: ${props => props.theme.colors.tertiary};
  padding: 0.5rem 1rem;
  text-align: center;
  color: ${props => props.theme.colors.base};
  display: inline-block;
  position: relative;
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    max-width: ${props => props.theme.sizes.maxWidthCentered};
    position: fixed;
    transform: translate(-50%, -50%);
    top: 40%;
    left: 25%;
  }
  span {
    font-weight: 600;
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
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    max-width: ${props => props.theme.sizes.maxWidthCentered};
    position: fixed;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 25%;
  }
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

const ArticleHero = props => (
  <Wrapper>
    <Hero>
      <Img fluid={props.image.fluid} backgroundColor={'#eeeeee'} />
    </Hero>
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

export default ArticleHero
