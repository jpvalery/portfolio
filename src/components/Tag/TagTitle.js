import React from 'react'
import styled from 'react-emotion'

const Title = styled.h1`
  flex-grow: 1;
  align-self: flex-start;
  width: 100%;
  text-transform: capitalize;
  text-align: center;
  margin: 2rem 0 0 0;
  line-height: 1.2;
  a {
    transition: all 0.2s;
    color: var(--color-base);
    &:hover {
      color: var(--color-highlight);
    }
  }
`

const PageTitle = props => {
  return <Title small={props.small}>{props.children}</Title>
}

export default PageTitle
