import React from 'react'
import styled, { css } from 'react-emotion'

const Wrapper = styled.section`
  grid-area: Right;
  margin: 0;
  padding: 0;
  display: grid;
  height: 100%;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(auto);
  grid-gap: 0;
  grid-template-areas: 'PortfolioBodyTop' 'PortfolioBodyBottom';
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    display: grid;
    height: 100%;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(auto);
    grid-gap: 2.5rem;
    grid-template-areas: 'PortfolioBodyTop' 'PortfolioBodyBottom';
  }
`

const PortfolioBody = props => {
  return <Wrapper>{props.children}</Wrapper>
}

export default PortfolioBody
