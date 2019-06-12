import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import Headroom from 'react-headroom'

const Wrapper = styled.section`
  background: var(--color-secondary);
  opacity: 0.95;
  backdrop-filter: blur(50px);
  margin: 4rem 0 0;
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
  text-transform: uppercase;
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
const Title = styled.h1`
  color: var(--color-base);
  padding: 0 1rem 0.7rem;
  flex-grow: 1;
  width: 100%;
  text-transform: uppercase;
  text-align: center;
`
const Date = styled.h5`
  padding: 0.25rem;
  color: var(--color-base);
  text-align: center;
  text-transform: uppercase;
  position: relative;
`
const Time = styled.h5`
  padding: 0.25rem;
  color: var(--color-base);
  text-align: center;
  text-transform: uppercase;
  font-style: italic;
  position: relative;
`

const ArticleHead = props => {
  return (
    <Headroom
      style={{
        position: 'fixed',
        zIndex: '899',
        transition: 'all 1s ease-in-out',
      }}
    >
      <Wrapper>
        <BackButton to="/blog/">
          <h4>⬅ Back</h4>
        </BackButton>
        <Title>{props.title}</Title>
        <Date>
          {props.date}
        </Date>
        <Time>
           - Reading time: {props.time} min
        </Time>
      </Wrapper>
    </Headroom>
  )
}

export default ArticleHead
