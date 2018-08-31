import React from 'react'
import styled from 'styled-components'

const Title = styled.h1`
  text-transform: uppercase;
  text-align: center;
  margin: 2rem 0 0 0;
  line-height: 1.2;
  color: ${props => props.theme.colors.tertiary};

  a {
    transition: all 0.2s;

    &:hover {
      color: ${props => props.theme.colors.highlight};
    }
  }
`

const PageTitle = props => {
  return <Title small={props.small}>{props.children}</Title>
}

export default PageTitle
