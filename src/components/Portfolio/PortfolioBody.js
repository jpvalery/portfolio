import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.section`
  grid-area: HomeRight;
  margin: 2rem 0;
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
    grid-gap: 0;
    grid-template-areas: 'PortfolioBodyTop' 'PortfolioBodyBottom';
  }
`

const Container = props => {
  return <Wrapper>{props.children}</Wrapper>
}

export default Container
