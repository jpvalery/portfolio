import React from 'react'
import styled, { css } from 'react-emotion'

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-template-areas: 'Left' 'Right';
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    grid-gap: 2rem;
    grid-template-areas: 'Left Right';
    padding: 0 2rem;
    align-items: center;
  }
`

const WrapperPortfolio = props => {
  return <Wrapper>{props.children}</Wrapper>
}

export default WrapperPortfolio
