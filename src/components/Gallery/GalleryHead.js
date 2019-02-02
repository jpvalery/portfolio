import React from 'react'
import styled from 'react-emotion'
import { Link } from 'gatsby'

const Wrapper = styled.section`
  background: var(--color-secondary);
  opacity: 0.95;
  backdrop-filter: blur(50px);
  top: 4rem;
  margin: 3.5rem auto 0;
  padding: 1rem;
  padding-bottom: 0.25rem !important;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`

const Title = styled.h2`
  color: var(--color-base);
  padding: 0 1rem 0.5rem 1rem;
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
  padding: 0;
  margin: 0 auto;
  text-align: center;
  display: block;
  position: relative;
`

const Tag = styled.li`
  display: inline-block;
  margin: 0.25rem;
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

const Desc = styled.label`
 display: inline;
 margin: 0.5rem 5rem ;
 color: var(--color-base) !important;
 p {
color: var(--color-base) !important;
 }
 strong {
color: var(--color-base) !important;
 }
 a {
color: var(--color-base) !important;
  &:hover {
      color: var(--color-highlight)!important;
}
 }
 `

const GalleryHead = props => {
  return (
      <Wrapper>
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
  )
}

export default GalleryHead
