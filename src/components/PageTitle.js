import React from 'react'
import styled from 'styled-components'

const Title = styled.h1`
  text-transform: capitalize;
  text-align: center;
  margin: 2rem 0 0 0;
  line-height: 1.2;
  a {
    transition: all 0.2s;
    color: ${props => props.theme.colors.base};
    &:hover {
      color: ${props => props.theme.colors.highlight};
    }
  }
`

const PageTitle = props => {
  return <Title small={props.small}>{props.children}</Title>
}

export default PageTitle
