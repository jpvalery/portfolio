import React from 'react'
import styled from 'react-emotion'
import { Link } from 'gatsby'
import Headroom from 'react-headroom'

const Wrapper = styled.section`
  background: var(--color-secondary);
  opacity: 0.95;
  backdrop-filter: blur(50px);
  top: 4rem;
  margin: 3.5rem auto 0;
  padding: 1rem;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`
const BackButton = styled(Link)`
  margin: 1rem 0 0.5rem;
  flex-grow: 1;
  width: 100%;
  align-self: center;
  justify-self: center;
  text-align: center;
  text-decoration: none;
  h4 {
    color: var(--color-base) !important;
  }
  @media screen and (min-width: ${props => props.theme.responsive.large}) {
    position: fixed;
    left: 2rem;
    align-self: flex-start;
    justify-self: flex-start;
    text-align: left;
  }
`
const Title = styled.h2`
  color: var(--color-base);
  padding: 0 1rem 1rem;
  flex-grow: 1;
  width: 100%;
  text-transform: uppercase;
  text-align: center;
  font-size: 3rem;
`
const List = styled.ul`
  text-transform: capitalize;
  font-weight: 600;
  width: 100%;
  padding: 0 1rem;
  margin: 0 auto;
  text-align: center;
  display: block;
  position: relative;
`

const Tag = styled.li`
  display: inline-block;
  margin: 0.5rem 0.25rem;
    transition: 0.2s;
    background: var(--color-base);
    padding: 0.25rem 1rem ;
    text-transform: uppercase;
    text-decoration: none;
    color: var(--color-secondary);
    &:last-child {
      margin: 0.5rem;
    }

`

const Desc = styled.p`
 display: inline;
 margin: 0 5rem;
 color: var(--color-base) !important;
 font-family: 'Montserrat';
 `

const GalleryHead = props => {
  return (
    <Headroom
      style={{
        position: 'fixed',
        zIndex: '899',
        transition: 'all .5s ease-in-out',
      }}
    >
      <Wrapper>
        <BackButton to="/">
          <h4>⬅ Back</h4>
        </BackButton>
        <Title>{props.title}</Title>
        <Desc
        dangerouslySetInnerHTML={{
          __html: props.desc.childMarkdownRemark.html,
        }}
        />
        <List>
          {props.tags.map(tag => (
            <Tag key={tag.id}>
              {tag.title}
            </Tag>
          ))}
        </List>
      </Wrapper>
    </Headroom>
  )
}

export default GalleryHead
